import React, { Suspense } from "react";
import Loading from "../loading";
import ShopItems from "./ShopItems";
import { getCachedItems } from "@/app/lib/fetchItems";
import { Orders } from "@/app/typesAndInterfaces/orderTypes";


const ShopItemPage = async ({ params: { item } }: { params: { item: string } }) => {
  const items = await getCachedItems(); // Fetch items on the server

  return (
    <Suspense fallback={<Loading message="Loading Item" />}>
      <ShopItems item={item as keyof Orders} items={items} />
    </Suspense>
  );
};

export default ShopItemPage;
