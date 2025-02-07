import { item, itemSizeVariation } from "../typesAndInterfaces/orderTypes"

export const chinChin750: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-750',
    name: '750g',
    price: 21.99,
    description: '750g pack.',
    type: 'chinChin',
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'

}

export const chinChin1200: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-1200',
    name: '1.2kg',
    price: 31.99,
    description: '1.2KG pack.',
    type: 'chinChin',
    maximumQuantity: 30
}

export const chinChin2500: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-2500',
    name: '2.5kg',
    price: 51.99,
    description: '2.5KG pack.',
    type: 'chinChin',
    maximumQuantity: 30,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin2500g.png'
}

export const chin_chin_standard: item = {
    id: 'ch-1',
    type: 'chinChin',
    name: 'Chin-Chin',
    description: 'Our best selling, World Famous Chin-Chin! Regular nutmeg flavor.',
    size_variants: [chinChin750, chinChin1200, chinChin2500],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'
}

export const chinChinByKg: itemSizeVariation = {
    parentId: 'ch-w',
    id: 'ch-by-kg',
    name: 'Chin-Chin (per KG)',
    price: 20,
    description: 'By Kg',
    type: 'chinChin',
    minimumQuantity: 3,
    maximumQuantity: 40,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png'
}

export const chin_chin_wholesale: item = {
    id: 'ch-w',
    type: 'chinChin',
    name: 'Chin-Chin Wholesale',
    description: 'Buy CHin Chin by KG (minimum 3kg)',
    size_variants: [chinChinByKg],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png'
}

export const chinChinEvent130: itemSizeVariation = {
    parentId: 'ch-sp',
    id: 'ch-sp-130',
    name: '130g',
    price: 4.99,
    description: '130g Pack with Custom Label',
    type: 'chinChin',
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png',
    maximumQuantity: 1000
}

export const chin_chin_event_order: item = {
    id: 'ch-sp',
    type: 'chinChin',
    name: 'Event Order',
    description: 'Special Event Order',
    size_variants: [chinChinEvent130],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png'
}

export const chinChinBundle10x750: itemSizeVariation = {
    parentId: 'ch-b',
    id: 'ch-b-10x750',
    name: '750g - Pack of 10',
    price: 179.99,
    description: '10x750g pack.',
    type: 'chinChin',
    savings: 40,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png',
    bundleSize: 10,
    maximumQuantity: 5
}
export const chinChinBundle20x140: itemSizeVariation = {
    parentId: 'ch-b',
    id: 'ch-b-20x140',
    name: '130g - Pack of 20',
    price: 84.99,
    description: '20x130g pack.',
    type: 'chinChin',
    savings: 15,
    url: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-20x140g.png',
    bundleSize: 20,
    maximumQuantity: 5
}
export const chin_chin_bundle: item = {
    id: 'ch-b',
    type: 'chinChin',
    name: 'Chin-Chin Bundle',
    description: 'Save with these bundle deals!',
    size_variants: [chinChinBundle10x750, chinChinBundle20x140],
    heroImage: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png'
}


export const defaultChinChinImage = 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'

export const chin_chin_skus = [chinChin750, chinChin1200, chinChin2500]
export const featuredItems = [chinChin750, chinChin2500]