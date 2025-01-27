export type itemTypes = {
    chinChin: 'Chin-Chin',
    buns: 'Buns'
    puffPuff: 'Puff-Puff'
}

export type item = {
    id: string,
    type: keyof itemTypes
    name: string,
    description: string
    size_variants?: itemSizeVariation[],
    flavor_variant?: string,
    mostPopular?: boolean
}

export type itemSizeVariation = {
    parentId: string
    id: string,
    name: string,
    price: number,
    description: string,
    type: keyof itemTypes,
    minimumQuantity?: number,
    maximumQuantity?: number,
    url?: string
}

export interface featuredItem {
    name: string,
    description: string,
    link: string,
    image?: string
}
