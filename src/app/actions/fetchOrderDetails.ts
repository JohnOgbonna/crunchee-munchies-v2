"use server";

import { secureSupabase } from "@/utils/supabase";
import { item, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";

export async function fetchOrderDetail(orderId: string, email?: string) {
  try {
    // 1. Fetch the main order data
    const { data: order, error: orderError } = await secureSupabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) throw orderError;
    if (!order) throw new Error("Order not found");

    // If email is provided (client view), ensure it matches
    if (email && order.email !== email) {
      throw new Error("Unauthorized access to this order.");
    }

    // 2. Fetch the order_items with deep joins
    const { data: orderItems, error: itemsError } = await secureSupabase
      .from("order_items")
      .select(`
        *,
        item_variations (
          *,
          items (
            id,
            name,
            description,
            hero_image,
            type,
            type_id,
            list_order,
            item_variations (*)
          )
        )
      `)
      .eq("order_id", orderId);

    if (itemsError) throw itemsError;

    // 3. Format each order item
    const formattedOrderItems = orderItems.map((orderItem: any) => {
      const variant = orderItem.item_variations;
      const parent = variant?.items;

      const variation: itemSizeVariation = {
        id: variant.id,
        parentId: variant.parent_id,
        name: variant.name,
        price: variant.price,
        description: variant.description,
        type: variant.type,
        url: variant.url,
        maximumQuantity: variant.maximum_quantity || undefined,
        minimumQuantity: variant.minimum_quantity || undefined,
        savings: variant.savings || undefined,
        bundleSize: variant.bundle_size || undefined,
        listOrder: variant.list_order || undefined,
        pickupOnly: variant.pickup_only
      };

      const sizeVariants: itemSizeVariation[] = (parent?.item_variations || []).map((v: any) => ({
        id: v.id,
        parentId: v.parent_id,
        name: v.name,
        price: v.price,
        description: v.description,
        type: v.type,
        url: v.url,
        maximumQuantity: v.maximum_quantity || undefined,
        minimumQuantity: v.minimum_quantity || undefined,
        savings: v.savings || undefined,
        bundleSize: v.bundle_size || undefined,
        listOrder: v.list_order || undefined,
        pickupOnly: v.pickup_only
      }));

      const parentItem: item = {
        id: parent.id,
        name: parent.name,
        description: parent.description,
        heroImage: parent.hero_image,
        type: parent.type,
        typeId: parent.type_id || undefined,
        listOrder: parent.list_order || undefined,
        size_variants: sizeVariants
      };

      return {
        id: orderItem.id,
        quantity: orderItem.quantity,
        notes: orderItem.notes,
        variant: variation,
        parent: parentItem
      };
    });

    return {
      order,
      orderItems: formattedOrderItems
    };
  } catch (err) {
    console.error("Error fetching order details:", err);
    throw new Error("Failed to fetch order details.");
  }
}
