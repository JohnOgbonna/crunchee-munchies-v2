'use client';

import OrderDetailView from "@/app/components/supporting_components/orderDetails/orderDetailsView";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useValidateAdmin } from "@/app/lib/hooks/useValidateAdmin";

interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
}

const OrderDetailPage = ({ params }: OrderDetailPageProps) => {
  const router = useRouter();
  const { isAdmin, validationFailed, validating } = useValidateAdmin();

  if (validating || validationFailed) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-slate-800">
      <h1 className="text-2xl font-bold mb-4">
        {validationFailed ? 'Invalid Token' : 'Validating...'}
      </h1>
      {validationFailed && <p>Please sign in again.</p>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      {isAdmin && <h2 className="font-bold text-[1.5rem] text-slate-700">Admin</h2>}
      <OrderDetailView orderId={params.orderId} isAdmin={isAdmin} />
    </div>
  );
};

export default OrderDetailPage;
