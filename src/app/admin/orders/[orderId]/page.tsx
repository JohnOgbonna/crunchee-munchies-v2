"use client";

import OrderDetailView from "@/app/components/supporting_components/orderDetails/orderDetailsView";

interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
}

const OrderDetailPage = ({ params }: OrderDetailPageProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      <OrderDetailView orderId={params.orderId} />
    </div>
  );
};

export default OrderDetailPage;
