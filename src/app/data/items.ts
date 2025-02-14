import { item, itemId, itemSizeVariation, itemType } from "../typesAndInterfaces/orderTypes"

export const chinChin750: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-750',
    name: '750g',
    price: 21.99,
    description: '750g Pack. Our most popular size. Great for all occasions!',
    type: itemType.chinChin,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'

}

export const chinChin1200: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-1200',
    name: '1.2kg',
    price: 31.99,
    description: '1.2kg Pack. For those who need just a little bit more!',
    type: itemType.chinChin,
    maximumQuantity: 30
}

export const chinChin2500: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-2500',
    name: '2.5kg',
    price: 51.99,
    description: '2.5kg Pack. For when you simply just need to stock up!',
    type: itemType.chinChin,
    maximumQuantity: 30,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin2500g.png'
}

export const chin_chin_standard: item = {
    id: itemId.chin_chin_standard,
    type: itemType.chinChin,
    name: 'Chin-Chin',
    description: 'Our best selling, World Famous Chin-Chin! Regular nutmeg flavor, with more flavors in the works!',
    size_variants: [chinChin750, chinChin1200, chinChin2500],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'
}

export const chinChinByKg: itemSizeVariation = {
    parentId: 'ch-w',
    id: 'ch-by-kg',
    name: 'Chin-Chin (per kg)',
    price: 20,
    description: 'Buy Chin Chin per kg',
    type: itemType.chinChin,
    minimumQuantity: 3,
    maximumQuantity: 40,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png'
}

export const chin_chin_wholesale: item = {
    id: itemId.chin_chin_wholesale,
    type: itemType.chinChin,
    name: 'Chin-Chin Wholesale',
    description: 'Order Chin Chin by kg! Great for large events and resale (minimum 3kg)',
    size_variants: [chinChinByKg],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png'
}

export const chinChinEvent130: itemSizeVariation = {
    parentId: 'ch-sp',
    id: 'ch-sp-130',
    name: '130g',
    price: 4.99,
    description: '130g Pack with Custom Label',
    type: itemType.chinChin,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png',
    maximumQuantity: 1000
}

export const chin_chin_event_order: item = {
    id: itemId.chin_chin_event_order,
    type: itemType.chinChin,
    name: 'Event Order',
    description: 'Chin-Chin packaged for special events! Custom label prints included! Send us an image and we will add it to your custom label! Perfect for weddings, parties, really, any special event!',
    size_variants: [chinChinEvent130],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png'
}

export const chinChinBundle10x750: itemSizeVariation = {
    parentId: 'ch-b',
    id: 'ch-b-10x750',
    name: '750g - Pack of 10',
    price: 184.99,
    description: 'A 10 pack of our most popular size. Save $35!',
    type: itemType.chinChin,
    savings: 35,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png',
    bundleSize: 10,
    maximumQuantity: 5
}
export const chinChinBundle20x140: itemSizeVariation = {
    parentId: 'ch-b',
    id: 'ch-b-20x140',
    name: '130g - Pack of 20',
    price: 89.99,
    description: 'Stock up your snack closet with 20 packs of our snack size. Save $10!',
    type: itemType.chinChin,
    savings: 10,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-20x140g.png',
    bundleSize: 20,
    maximumQuantity: 5
}
export const chin_chin_bundle: item = {
    id: itemId.chin_chin_bundle,
    type: itemType.chinChin,
    name: 'Bundle Deals',
    description: 'Save with these special bundle package deals!',
    size_variants: [chinChinBundle10x750, chinChinBundle20x140],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png'
}
export const shopLinks = {
    'ch-1': 'chin_chin_standard',
    'ch-w': 'chin_chin_wholesale',
    'ch-sp': 'chin_chin_event_order',
    'ch-b': 'chin_chin_bundle',
}

export const itemDataMap = {
    chin_chin_standard: chin_chin_standard,
    chin_chin_wholesale: chin_chin_wholesale,
    chin_chin_event_order: chin_chin_event_order,
    chin_chin_bundle: chin_chin_bundle,
};

export const defaultChinChinImage = 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'

export const chin_chin_skus = [chinChin750, chinChin1200, chinChin2500]
export const featuredItems = [chinChin750, chinChin2500]