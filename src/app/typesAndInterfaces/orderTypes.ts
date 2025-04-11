import { TableInstance, UsePaginationInstanceProps, UsePaginationState } from "react-table";

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
export interface OrderType {
    id: string;  // Order ID
    customer_name: string;  // Customer's full name
    email: string;  // Customer's email
    needs_delivery: boolean;  // Whether the order requires delivery
    paid: boolean | null;  // Payment status, null if unknown
    created_at: string | null;  // Timestamp of when the order was created
    last_modified: string | null;  // Timestamp of when the order was last modified
    last_modified_by: string | null;  // User who last modified the order
    phone_number: string | null;  // Customer's phone number
    address: string | null;  // Delivery address
    postal_code: string | null;  // Postal code
    province_state: string | null;  // Province or state
    notes: string | null;  // Additional notes from the customer
    city: string | null;  // City of the customer
    status: string | null;  // Status of the order (e.g., "pending", "completed")
}

// Represents an individual item in an order
export interface OrderItemType {
    id: string;  // Order item ID
    // Reference to the associated order
    variant: itemSizeVariation, // Variant ID for the product in the order
    quantity: number;  // Quantity of the item ordered
    notes: string | null;  // Notes for the order item (if any)
    parent : item,
}

// Represents the entire order along with the items
export interface OrderWithItemsType {
    order: OrderType;  // Main order details
    items: OrderItemType[];  // List of items within the order
}

export type TableInstanceWithPagination<T extends object> = TableInstance<T> &
    UsePaginationInstanceProps<T> & {
        state: UsePaginationState<T>;
    };

export interface OrderTableProps {
    orders: OrderType[];
    loading: boolean;
    totalOrders: number;
    pageIndex: number;
    pageSize: number;
    setPageIndex: (pageIndex: number) => void;
    setPageSize: (pageSize: number) => void;
    searchTerm?: string; // optional, in case you want to show "Results for ..."
    isAdmin?: boolean
}

export interface fetchedOrder {
    id: string;                // Order ID
    customer_name: string;     // Name of the customer
    email: string;             // Customer email
    needs_delivery: boolean;   // Whether the order needs delivery
    paid: boolean | null;      // Payment status
    created_at: string;        // Order creation timestamp
    last_modified: string | null; // Last modified timestamp
    last_modified_by: string | null; // Last user who modified the order
    phone_number: string | null; // Customer's phone number
    address: string | null;    // Delivery address
    postal_code: string | null; // Postal code for delivery
    province_state: string | null; // Province or state for delivery
    notes: string | null;      // Optional order notes
    city: string | null;       // City for delivery
    status: string | null;     // Order status (e.g., 'pending', 'completed')
    order_items: OrderItemType[]; // Associated order items
}