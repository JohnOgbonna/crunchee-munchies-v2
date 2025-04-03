import { item, itemId, itemSizeVariation, itemType, itemTypes } from "../typesAndInterfaces/orderTypes"

export const chinChin750: itemSizeVariation = {
    parentId: itemId.chin_chin_standard,
    id: 'ch-1-750',
    name: '750g',
    price: 21.99,
    description: '750g Pack. Our most popular size. Great for all occasions!',
    type: itemTypes.chinChin,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'
}

export const chinChin1200: itemSizeVariation = {
    parentId: itemId.chin_chin_standard,
    id: 'ch-1-1200',
    name: '1.2kg',
    price: 31.99,
    description: '1.2kg Pack. For those who need just a little bit more!',
    type: itemTypes.chinChin,
    maximumQuantity: 30,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin1200g.png'
}

export const chinChin2500: itemSizeVariation = {
    parentId: itemId.chin_chin_standard,
    id: 'ch-1-2500',
    name: '2.5kg',
    price: 54.99,
    description: '2.5kg Pack. For when you simply just need to stock up!',
    type: itemTypes.chinChin,
    maximumQuantity: 30,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin2500g.png'
}

export const chin_chin_standard: item = {
    id: itemId.chin_chin_standard,
    type: itemTypes.chinChin,
    name: 'Chin-Chin',
    description: 'Our best selling, World Famous Chin-Chin! Regular nutmeg flavor, with more flavors in the works!',
    size_variants: [chinChin750, chinChin1200, chinChin2500],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png',
    listOrder: 1,
    typeId: 1
}

export const chinChinByKg: itemSizeVariation = {
    parentId: itemId.chin_chin_wholesale,
    id: 'ch-by-kg',
    name: 'Chin-Chin (per kg)',
    price: 20,
    description: 'Buy Chin Chin per kg',
    type: itemTypes.chinChin,
    minimumQuantity: 10,
    maximumQuantity: 100,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png'
}

export const chin_chin_wholesale: item = {
    id: itemId.chin_chin_wholesale,
    type: itemTypes.chinChin,
    name: 'Chin-Chin Wholesale',
    description: 'Order Chin Chin by kg! Great for large events and resale (minimum 10kg)',
    size_variants: [chinChinByKg],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png',
    typeId: 1,
    listOrder: 3
}

export const chinChinEvent130: itemSizeVariation = {
    parentId: itemId.chin_chin_event_order,
    id: 'ch-sp-130',
    name: '130g',
    price: 4.99,
    description: '130g Pack with Custom Label',
    type: itemTypes.chinChin,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png',
    maximumQuantity: 1000,
    minimumQuantity: 20
}

export const chin_chin_event_order: item = {
    id: itemId.chin_chin_event_order,
    type: itemTypes.chinChin,
    name: 'Event Order',
    description: 'Chin-Chin packaged for special events! Custom label prints included! Send us an image and we will add it to your custom label! Perfect for weddings, parties, really, any special event!',
    size_variants: [chinChinEvent130],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png',
    typeId: 1
}

export const chinChinBundle10x750: itemSizeVariation = {
    parentId: itemId.chin_chin_bundle,
    id: 'ch-b-10x750',
    name: '750g - Pack of 10',
    price: 184.99,
    description: 'A 10 pack of our most popular size. Save $35!',
    type: itemTypes.chinChin,
    savings: 35,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png',
    bundleSize: 10,
    maximumQuantity: 5,
}
export const chinChinBundle20x140: itemSizeVariation = {
    parentId: itemId.chin_chin_bundle,
    id: 'ch-b-20x140',
    name: '130g - Pack of 20',
    price: 89.99,
    description: 'Stock up your snack closet with 20 packs of our snack size. Save $10!',
    type: itemTypes.chinChin,
    savings: 10,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-20x140g.png',
    bundleSize: 20,
    maximumQuantity: 5
}
export const chin_chin_bundle: item = {
    id: itemId.chin_chin_bundle,
    type: itemTypes.chinChin,
    name: 'Bundle Deals',
    description: 'Save with these special bundle package deals!',
    size_variants: [chinChinBundle10x750, chinChinBundle20x140],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png',
    typeId: 1,
}
export const meatPie: itemSizeVariation = {
    parentId: itemId.meat_pie_fish_roll,
    id: 'mp-1',
    name: 'Meat Pie, 12 Pieces',
    price: 47.99,
    description: 'A delicious meat pie with a soft crust and savory filling.',
    type: itemTypes.meat_pie_fish_roll,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/busy-bee/meat-pie-pack.png',
    pickupOnly: true
}
export const fishRoll: itemSizeVariation = {
    parentId: itemId.meat_pie_fish_roll,
    id: 'mp-2',
    name: 'Fish Roll, 12 Pieces',
    price: 29.99,
    description: 'A tasty roll with a flaky crust and delicious fish filling.',
    type: itemTypes.meat_pie_fish_roll,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/busy-bee/fish-roll-pack.png',
    pickupOnly: true
}
export const meatPieFishRoll: item = {
    id: itemId.meat_pie_fish_roll,
    type: itemTypes.meat_pie_fish_roll,
    name: 'Meat Pies and Fish Rolls',
    description: 'Delicious, Savory Meat Pies & Fish Rolls',
    size_variants: [meatPie, fishRoll],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/busy-bee/meat-pie-fish-roll-hero.jpg',
    typeId: 2,
    listOrder: 2
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

export const items: Record<string, item> = {
    chin_chin_standard: chin_chin_standard,
    chin_chin_wholesale: chin_chin_wholesale,
    chin_chin_event_order: chin_chin_event_order,
    chin_chin_bundle: chin_chin_bundle,
    meat_pie_fish_roll: meatPieFishRoll,
}
export const defaultChinChinImage = 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'

export const chin_chin_skus = [chinChin750, chinChin1200, chinChin2500]
export const featuredItems = [chinChin750, chinChin2500]