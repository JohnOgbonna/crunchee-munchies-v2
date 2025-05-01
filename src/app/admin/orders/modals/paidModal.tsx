"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { paymentMethods } from "@/app/data/orderContent";

interface PaidUpdateModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (note: string, emailCustomer: boolean, paymentMethod: keyof typeof paymentMethods) => void;
  paid: boolean;
  customerName: string;
  orderNumber: string;
  setPaidChecked: Dispatch<SetStateAction<boolean | null>>;
}

const PaidUpdateModal = ({
  visible,
  onClose,
  onConfirm,
  paid,
  customerName,
  orderNumber,
  setPaidChecked,
}: PaidUpdateModalProps) => {
  const [note, setNote] = useState("");
  const [emailCustomer, setEmailCustomer] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<keyof typeof paymentMethods>("cash");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 bg-yellow-100 shadow-md border-b border-yellow-300 p-4"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
        >
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="text-lg font-bold text-yellow-700">Update Paid Status</h2>
            <p>
              <span className="font-semibold">Order:</span> #{orderNumber} – {customerName}
            </p>
            <p>
              <span className="font-semibold">New Paid Status:</span>{" "}
              <span className="text-yellow-800">{paid ? "Paid" : "Unpaid"}</span>
            </p>

            <div className="flex flex-col">
              <label htmlFor="payment-method" className="font-semibold mb-1">
                Payment Method
              </label>
              <select
                id="payment-method"
                className="border border-yellow-300 rounded p-2"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value as keyof typeof paymentMethods)}
              >
                {Object.entries(paymentMethods).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              className="border border-yellow-300 rounded p-2 w-full"
              placeholder="Enter special notes (optional)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailCustomer}
                onChange={(e) => setEmailCustomer(e.target.checked)}
              />
              Email customer about this update
            </label>

            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setPaidChecked(!paid);
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                onClick={() => {
                  onConfirm(note, emailCustomer, selectedMethod);
                  onClose();
                }}
              >
                Send & Update
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaidUpdateModal;
