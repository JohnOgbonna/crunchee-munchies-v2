export enum itemTypes {
    chinChin = 'chin-chhin',
    buns = 'buns',
    puffPuff = 'puff-puff',
    meat_pie_fish_roll = 'meat-pies-and-fish-rolls',
}
export type itemType = {
    id: number;
    type: string;        // Example: 'chin-chhin', 'buns'
    name: string;        // Example: 'Chin Chin', 'Buns'
    description: string;
    listOrder: number; // Example: 'Crunchy, delicious Chin Chin snacks'
};
export enum itemId {
    chin_chin_standard = 'ch_chin_standard',
    chin_chin_wholesale = 'ch_chin_wholesale',
    chin_chin_event_order = 'ch_chin_event_order',
    chin_chin_bundle = 'ch_chin_bundle',
    meat_pie_fish_roll = 'meat_pie_fish_roll',
}

export const itemValues = {
    [itemId.chin_chin_standard]: 'ch-1',
    [itemId.chin_chin_wholesale]: 'ch-w',
    [itemId.chin_chin_event_order]: 'ch-sp',
    [itemId.chin_chin_bundle]: 'ch-b',
};

export type item = {
    id: itemId;
    typeId: number;  // Foreign key referencing `item_types.id`
    name: string;
    description: string;
    size_variants?: itemSizeVariation[];
    flavor_variant?: string;
    mostPopular?: boolean;
    heroImage: string;
    listOrder?: number;
    type: itemTypes
};

export type itemSizeVariation = {
    parentId: itemId
    id: string,
    name: string,
    price: number,
    description: string,
    type: itemTypes,
    minimumQuantity?: number,
    maximumQuantity?: number,
    url?: string,
    savings?: number,
    bundleSize?: number,
    listOrder?: number,
    pickupOnly?: boolean,
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
    type: itemTypes,
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
        type: itemTypes,
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
    customerData: { name: string; email: string, submittedOrderId: string };
    setCustomerData: React.Dispatch<React.SetStateAction<{ name: string; email: string, submittedOrderId: string }>>;
}