"use client";

import OrderDetailView from "@/app/components/supporting_components/orderDetails/orderDetailsView";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { fetchOrderDetail } from "@/app/actions/fetchOrderDetails";
import Loading from "../loading";

const ClientOrderDetailPage = ({ params }: { params: { orderId: string } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const validateOrder = async () => {
      setIsLoading(true);
      try {
        if (!email) {
          setIsValid(false);
          setIsLoading(false);
          return;
        }

        const { order } = await fetchOrderDetail(params.orderId, email);

        if (order?.email?.toLowerCase() === email.toLowerCase()) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch {
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateOrder();
  }, [params.orderId, email]);

  if (isValid === null || isLoading) {
    return (
      <div className="p-6 text-lg text-center text-slate-600">
        <Loading message="Validating Order" />
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="p-6 max-w-md mx-auto text-center bg-white rounded shadow mt-20">
        <h2 className="text-xl font-bold text-red-600 mb-4">Order not found</h2>
        <p className="text-gray-700 mb-4">
          The confirmation number and email provided do not match our records.
        </p>
        <button
          onClick={() => router.push("/orders")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Suspense fallback={<div className="text-lg text-center">Loading order details...</div>}>
        <OrderDetailView orderId={params.orderId} />
      </Suspense>
    </div>
  );
};

export default ClientOrderDetailPage;
