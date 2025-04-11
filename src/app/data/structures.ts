import { sign } from "crypto";
import { itemDataMap } from "./items"
import { signOut } from "../lib/cognitoAuth";


export interface NavSubsections {
    [key: string]: {
        [key: string]: {
            link: string;
            name?: string;
        };
    };
};
export interface NavSubsection {
    [key: string]: {
        link: string;
        name: string;
    };
}


export const navSections = {
    shop: 'Shop',
    about: 'About',
    whereToFindUs: 'Where to Find Us',
    connect: 'Connect',
}

export const adminNavSections = {
    orders: 'Orders',
    items: 'Items',
    account: 'Account',
    signOut: 'Sign Out',
}

export const navSubsections: NavSubsections = {
    shop: {
        [itemDataMap.chin_chin_standard.name]: {
            link: 'shop/chin_chin_standard',
        },
        [itemDataMap.chin_chin_wholesale.name]: {
            link: 'shop/chin_chin_wholesale',
        },
        [itemDataMap.chin_chin_event_order.name]: {
            link: 'shop/chin_chin_event_order',
        },
        [itemDataMap.chin_chin_bundle.name]: {
            link: 'shop/chin_chin_bundle',
        },
    },
}