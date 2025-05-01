// lib/orderStatusHelpers.ts
"use client";

import { toast } from "sonner";
import { updateOrderStatus } from "@/app/actions/updateOrder/updateOrderStatus";
import { sendStatusEmail } from "@/app/actions/updateOrder/sendStatusEmail";
import { updateOrderPaid } from "@/app/actions/updateOrder/updateOrderPaid";
import { sendPaidEmail } from "@/app/actions/updateOrder/sendPaidEmail";
import { fetchedOrder, OrderItemType } from "@/app/typesAndInterfaces/orderTypes";
import { em, p } from "framer-motion/client";
import { paymentMethods } from "@/app/data/orderContent";

// --- STATUS LOGIC ---

interface CommitStatusChangeOptions {
  orderId: string;
  newStatus: string;
  oldStatus: string;
  orderData: any;
  setOrderData: (update: any) => void;
  note?: string;
  emailCustomer?: boolean;
}

export async function commitStatusChange({
  orderId,
  newStatus,
  oldStatus,
  orderData,
  setOrderData,
  note,
  emailCustomer,
}: CommitStatusChangeOptions) {
  try {
    const updated = await updateOrderStatus(orderId, newStatus);
    if (updated.success) {
      setOrderData((prev: any) => ({
        ...prev,
        order: { ...prev.order, status: newStatus },
      }));
      toast.success(`Order status updated to ${newStatus}`);
    }

    if (emailCustomer) {
      await sendStatusEmail({
        type: "orderStatus",
        orderId,
        orderNumber: orderData.order.id,
        customerName: orderData.order.customer_name,
        email: orderData.order.email,
        newStatus,
        oldStatus,
        note,
      });
      toast.success("Email sent to customer.");
    }
  } catch (err) {
    toast.error(`Error updating status from ${oldStatus} to ${newStatus}`);
    console.error("Error committing status change:", err);
  }
}

interface HandleStatusChangeOptions {
  newStatus: string;
  currentStatus: string;
  onImportantStatusChange: (status: string) => void;
  onSimpleStatusChange: (status: string) => void;
}

export function handleStatusChange({
  newStatus,
  currentStatus,
  onImportantStatusChange,
  onSimpleStatusChange,
}: HandleStatusChangeOptions) {
  if (newStatus === currentStatus) return;

  const importantChange =
    (currentStatus === "pending" && newStatus !== "pending") ||
    (currentStatus === "approved" &&
      (newStatus === "ready for pickup" ||
        newStatus === "shipped" ||
        newStatus === "canceled")) ||
    newStatus === "shipped" ||
    newStatus === "canceled" || newStatus === "completed";

  if (importantChange) {
    onImportantStatusChange(newStatus);
  } else {
    onSimpleStatusChange(newStatus);
  }
}

// --- PAID LOGIC ---

interface CommitPaidChangeOptions {
  orderId: string;
  newPaid: boolean;
  oldPaid: boolean;
  note: string;
  emailCustomer: boolean;
  orderData: any;
  status: string;
  amount: number;
  paymentMethod: keyof typeof paymentMethods | null;
}

export async function commitPaidChange({
  orderId,
  newPaid,
  oldPaid,
  note,
  emailCustomer,
  orderData,
  status,
  amount,
  paymentMethod
}: CommitPaidChangeOptions) {
  try {
    if (oldPaid === newPaid) return;

    const updated = await updateOrderPaid(orderId, newPaid, amount, orderData.order.email, orderData.order.customer_name, paymentMethod, note);

    if (!updated.success) throw new Error("Update failed");

    if (emailCustomer) {
      await sendPaidEmail({
        status,
        orderId,
        orderNumber: orderData.order.id,
        customerName: orderData.order.customer_name,
        email: orderData.order.email,
        note,
        paid: newPaid,
      });
      toast.success("Email sent to customer.");
    }
    let message = ""
    if (!emailCustomer) {
      message = newPaid ? "Order marked as paid, no email sent to customer" : "Order marked as unpaid";
    }
    else {
      message = newPaid ? "Order marked as paid, email sent to customer" : "Order marked as unpaid";
    }
    toast.success(message);
  } catch (err) {
    console.error("Error committing paid change:", err);
    toast.error("Error updating paid status.");
  }
}

interface HandlePaidChangeOptions {
  newPaid: boolean;
  oldPaid: boolean;
  onImportantPaidChange: (paidValue: boolean) => void;
  onSimplePaidChange: (paidValue: boolean) => void;
}

export function handlePaidChange({
  newPaid,
  oldPaid,
  onImportantPaidChange,
  onSimplePaidChange,
}: HandlePaidChangeOptions) {

  if (newPaid === oldPaid) {
    return;
  }
  // Only treat marking as paid as "important"
  if (newPaid === true) {
    onImportantPaidChange(newPaid);
  } else {
    onSimplePaidChange(newPaid);
  }
}
