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
    price: 30.99,
    description: '1.2KG pack.',
    type: 'chinChin',
    maximumQuantity: 30
}

export const chinChin2500: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-2500',
    name: '2.5kg',
    price: 49.99,
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
}

export const chin_chin_by_kg: itemSizeVariation = {
    parentId: 'ch-1',
    id: 'ch-1-by-kg',
    name: 'Chin-Chin per Kg',
    price: 20,
    description: 'By Kg',
    type: 'chinChin',
    minimumQuantity: 3
}

export const defaultChinChinImage = 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png'

export const chin_chin_skus = [chinChin750, chinChin1200, chinChin2500]
export const featuredItems = [chinChin750, chinChin2500]