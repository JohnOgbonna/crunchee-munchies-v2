const { url } = require("inspector");

const chinChin750 = {
    parentId: "chin_chin_standard",
    id: "ch-1-750",
    name: "750g",
    price: 21.99,
    description: "750g Pack. Our most popular size. Great for all occasions!",
    type: "chinChin",
    url: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png"
};

const chinChin1200 = {
    parentId: "chin_chin_standard",
    id: "ch-1-1200",
    name: "1.2kg",
    price: 31.99,
    description: "1.2kg Pack. For those who need just a little bit more!",
    type: "chinChin",
    maximumQuantity: 30,
    url: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin1200g.png"
};

const chinChin2500 = {
    parentId: "chin_chin_standard",
    id: "ch-1-2500",
    name: "2.5kg",
    price: 54.99,
    description: "2.5kg Pack. For when you simply just need to stock up!",
    type: "chinChin",
    maximumQuantity: 30,
    url: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin2500g.png"
};

const chin_chin_standard = {
    id: "chin_chin_standard",
    type: "chinChin",
    name: "Chin-Chin",
    description: "Our best selling, World Famous Chin-Chin! Regular nutmeg flavor, with more flavors in the works!",
    size_variants: {"ch-1-750": chinChin750, "ch-1-1200": chinChin1200, "ch-1-2500": chinChin2500}, //"chinChin750, chinChin1200, chinChin2500},
    heroImage: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png"
};

const chinChinByKg = {
    parentId: "chin_chin_wholesale",
    id: "ch-by-kg",
    name: "Chin-Chin (per kg)",
    price: 20,
    description: "Buy Chin Chin per kg",
    type: "chinChin",
    minimumQuantity: 10,
    maximumQuantity: 100,
    url: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png"
};

const chin_chin_wholesale = {
    id: "chin_chin_wholesale",
    type: "chinChin",
    name: "Chin-Chin Wholesale",
    description: "Order Chin Chin by kg! Great for large events and resale (minimum 10kg)",
    size_variants: {"ch-by-kg": chinChinByKg},
    heroImage: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-bulk-order.png"
};

const chinChinEvent130 = {
    parentId: "chin_chin_event_order",
    id: "ch-sp-130",
    name: "130g",
    price: 4.99,
    description: "130g Pack with Custom Label",
    type: "chinChin",
    url: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png",
    maximumQuantity: 1000,
    minimumQuantity: 20
};

const chin_chin_event_order = {
    id: "chin_chin_event_order",
    type: "chinChin",
    name: "Event Order",
    description: "Chin-Chin packaged for special events! Custom label prints included! Send us an image and we will add it to your custom label! Perfect for weddings, parties, really, any special event!",
    size_variants: {"ch-sp-130": chinChinEvent130},
    heroImage: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-special-130g.png"
};

const chinChinBundle10x750 = {
    parentId: "chin_chin_bundle",
    id: "ch-b-10x750",
    name: "750g - Pack of 10",
    price: 184.99,
    description: "A 10 pack of our most popular size. Save $35!",
    type: "chinChin",
    savings: 35,
    url: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png",
    bundleSize: 10,
    maximumQuantity: 5
};

const chinChinBundle20x140 = {
    parentId: "chin_chin_bundle",
    id: "ch-b-20x140",
    name: "130g - Pack of 20",
    price: 89.99,
    description: "Stock up your snack closet with 20 packs of our snack size. Save $10!",
    type: "chinChin",
    savings: 10,
    url: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-20x140g.png",
    bundleSize: 20,
    maximumQuantity: 5
};

const chin_chin_bundle = {
    id: "chin_chin_bundle",
    type: "chinChin",
    name: "Bundle Deals",
    description: "Save with these special bundle package deals!",
    size_variants: {"ch-b-10x750": chinChinBundle10x750, "ch-b-20x140": chinChinBundle10x750, chinChinBundle20x140},
    heroImage: "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin-10x750g.png"
};

const shopLinks = {
    "ch-1": "chin_chin_standard",
    "ch-w": "chin_chin_wholesale",
    "ch-sp": "chin_chin_event_order",
    "ch-b": "chin_chin_bundle"
};

const itemDataMap = {
    chin_chin_standard,
    chin_chin_wholesale,
    chin_chin_event_order,
    chin_chin_bundle
};

const defaultChinChinImage = "https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/chin-chin750g.png";

const chin_chin_skus = [chinChin750, chinChin1200, chinChin2500];

const featuredItems = [chinChin750, chinChin2500];

module.exports = {
    chinChin750,
    chinChin1200,
    chinChin2500,
    chin_chin_standard,
    chinChinByKg,
    chin_chin_wholesale,
    chinChinEvent130,
    chin_chin_event_order,
    chinChinBundle10x750,
    chinChinBundle20x140,
    chin_chin_bundle,
    shopLinks,
    itemDataMap,
    defaultChinChinImage,
    chin_chin_skus,
    featuredItems
};
