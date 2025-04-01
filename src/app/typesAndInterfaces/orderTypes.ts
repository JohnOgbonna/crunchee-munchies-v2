export enum itemType {
    chinChin = 'chinChin',
    buns = 'buns',
    puffPuff = 'puff-puff'
}

export enum itemId {
    chin_chin_standard = 'ch_chin_standard',
    chin_chin_wholesale = 'ch_chin_wholesale',
    chin_chin_event_order = 'ch_chin_event_order',
    chin_chin_bundle = 'ch_chin_bundle',
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
    heroImage: string,
    listOrder?: number,
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
    bundleSize?: number,
    listOrder?: number,
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
    id: itemId
    type: itemType,
    name: string,
    description: string
    flavor_variant?: string,
    mostPopular?: boolean,
    heroImage: string,
    listOrder?: number,
    variations: sendOrderVariations
}

export interface sendOrderVariations {
    [variantId: string]: {
        quantity: number;
        name: string;
        id: string;
        price: number;
        description: string,
        type: itemType,
        minimumQuantity?: number,
        maximumQuantity?: number,
        url?: string,
        savings?: number,
        bundleSize?: number,
        listOrder?: number,
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