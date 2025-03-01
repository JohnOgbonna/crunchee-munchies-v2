export enum itemType {
    chinChin = 'chinChin',
    buns = 'buns',
    puffPuff = 'puff-puff'
}

export enum itemId {
    chin_chin_standard = 'ch-1',
    chin_chin_wholesale = 'ch-w',
    chin_chin_event_order = 'ch-sp',
    chin_chin_bundle = 'ch-b',
}
export const itemValues = {
    [itemId.chin_chin_standard]: 'ch-1',
    [itemId.chin_chin_wholesale]: 'ch-w',
    [itemId.chin_chin_event_order]: 'ch-sp',
    [itemId.chin_chin_bundle]: 'ch-b',
};

export type item = {
    id: itemId
    type: itemType,
    name: string,
    description: string
    size_variants?: itemSizeVariation[],
    flavor_variant?: string,
    mostPopular?: boolean,
    heroImage: string
}

export type itemSizeVariation = {
    parentId: itemId
    id: string,
    name: string,
    price: number,
    description: string,
    type: itemType,
    minimumQuantity?: number,
    maximumQuantity?: number,
    url?: string,
    savings?: number,
    bundleSize?: number
}

export interface featuredItem {
    name: string,
    description: string,
    link: string,
    image?: string
}

export interface orderVariantion {
    variantId: string;
    quantity: number;
    notes?: string;
}

export interface orderItemGroup {
    id: itemId;
    items: orderVariantion[];
}

export interface Orders extends Record<itemId, {
    variations: {
        [variantId: string]: {
            quantity: number;
        };
    };
}> {
}

export interface sendOrder {
    item: itemId,
    variations: {
        [variantId: string]: {
            quantity: number;
        };
    };
}

export interface OrderContextType {
    orders: Orders
    addOrder: (id: itemId, variant: orderVariantion) => void;
    removeOrder: (id: itemId) => void;
    clearOrders: () => void;
    increaseQuantity: (id: itemId, variantId: string) => void;
    decreaseQuantity: (id: itemId, variantId: string) => void;
    clearItemVariation: (id: itemId, variantId: string) => void;
}
export interface OrderSubmitContextType {
    formSubmitted: boolean;
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    customerData: { name: string; email: string };
    setCustomerData: React.Dispatch<React.SetStateAction<{ name: string; email: string }>>;
}