import { link } from "fs"
import { itemId } from "../typesAndInterfaces/orderTypes"
import { chin_chin_standard, itemDataMap} from "./items"


export interface NavSubsections {
    [key: string]: {
        [key: string]: {
            link: string;
        };
    };
};

export const navSections = {
    shop: 'Shop',
    about: 'About',
    whereToFindUs: 'Where to find us',
    connect: 'Connect',
}

export const navSubsections : NavSubsections = {
    shop: {
        [itemDataMap.chin_chin_standard.name]: {
            link: 'shop/chin_chin_standard',
        },
       [ itemDataMap.chin_chin_wholesale.name]: {
            link: 'shop/chin_chin_wholesale',
        },
        [itemDataMap.chin_chin_event_order.name]: {
            link: 'shop/chin_chin_event_order',
        },
        [itemDataMap.chin_chin_bundle.name]: {
            link: 'shop/chin_chin_bundles',
        },
    },
}