'use client';

import OrderDetailView from "@/app/components/supporting_components/orderDetails/orderDetailsView";
import { validateCognitoToken } from "@/app/lib/auth/validateCognitoToken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
}

const OrderDetailPage = ({ params }: OrderDetailPageProps) => {
  const [validationFailed, setValidationFailed] = useState(false);
  const [validating, setValidating] = useState(true);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('cognitoToken');
  
    if (!token || !validateCognitoToken(token)) {
      localStorage.removeItem('cognitoToken');
      setValidationFailed(true);
      router.push('/admin');
    } else {
      setIsAdmin(true);
      setValidating(false);
    }
  }, [router]);
  
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
