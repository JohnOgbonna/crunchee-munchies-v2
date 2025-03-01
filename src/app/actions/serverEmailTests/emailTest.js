const generateOrderEmail = require('./generateOrderHTML');
const fs = require('fs');
const customer = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    needsDelivery: false,
    streetAddress: "123 Crunchy Lane",
    city: "Snack City",
    province: "SC",
    postalZipCode: "12345"
};

const order = {
    item: "ch-1",
    variations: {
        "ch-1-750": { quantity: 2 },
        "ch-1-2500": { quantity: 1 }
    }
};


const emailHtml = generateOrderEmail(customer, order);

fs.writeFileSync("./order_confirmation.html", emailHtml, "utf8");
