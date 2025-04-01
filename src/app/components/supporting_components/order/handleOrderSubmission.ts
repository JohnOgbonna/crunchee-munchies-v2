import { submitOrder } from "@/app/actions/submitOrder";
import { item, itemId, Orders, sendOrder, sendOrderVariations } from "@/app/typesAndInterfaces/orderTypes";
import { FormDataType } from "@/app/data/customerFields";


export const handleOrderSubmission = async (
    data: FormDataType,
    item: itemId,
    items: Record<string, item> | undefined,
    orders: Orders,
    removeOrder: (id: itemId) => void,
    handleOrderSuccess: (name: string, email: string) => void,
    reset: () => void,
    setLoading: (loading: boolean) => void,
    toast: any
) => {
    setLoading(true);
    const selectedOrder = orders[item];

    if (!selectedOrder) {
        toast("No order found for this item.", { error: true });
        setLoading(false);
        return;
    }

    const selectedItem = items?.[item] || null;
    if (!selectedItem) {
        toast("No item found for this order.", { error: true });
        setLoading(false);
        return;
    }

    // Deconstruct selected item
    const { id, type, name, description, flavor_variant, heroImage, listOrder } = selectedItem;
    const variations: sendOrderVariations = {};

    if (!selectedItem.size_variants) {
        toast("No variants found for this item.", { error: true });
        setLoading(false);
        return;
    }

    // Create variations of size variants
    selectedItem.size_variants.forEach((variant: any) => {
        if (selectedOrder.variations[variant.id]) {
            variations[variant.id] = {
                quantity: selectedOrder.variations[variant.id].quantity,
                name: variant.name,
                id: variant.id,
                price: variant.price,
                description: variant.description,
                type: variant.type,
                minimumQuantity: variant.minimumQuantity,
                maximumQuantity: variant.maximumQuantity,
                url: variant.url,
                savings: variant.savings,
                bundleSize: variant.bundleSize,
                listOrder: variant.listOrder
            };
        }
    });

    const order: sendOrder = {
        id,
        type,
        name,
        description,
        flavor_variant,
        heroImage,
        listOrder,
        variations
    };

    try {
        const response = await submitOrder(data, order);

        if (response?.error) {
            toast(`Order failed: ${response.error}`, { error: true });
        } else if (response) {
            handleOrderSuccess(data.firstName, data.email);

            setTimeout(() => {
                reset(); // ✅ Clear form safely after updates
                removeOrder(item);
            }, 150);
        } else {
            toast("An unknown error occurred.", { error: true });
        }
    } catch (error) {
        toast(`Order failed: ${error}`, { error: true });
    } finally {
        setLoading(false);
    }
};
