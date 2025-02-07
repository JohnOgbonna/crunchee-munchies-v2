export enum itemType {
    chinChin = 'chinChin',
    buns = 'buns',
    puffPuff = 'puff-puff'
}

export type item = {
    id: string,
    type: keyof itemType,
    name: string,
    description: string
    size_variants?: itemSizeVariation[],
    flavor_variant?: string,
    mostPopular?: boolean,
    heroImage: string
}

export type itemSizeVariation = {
    parentId: string
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
