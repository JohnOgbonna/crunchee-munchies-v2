const items = require('./items');
const fs = require('fs');

const { shopLinks, itemDataMap } = items;

function generateAdminOrderEmail(customer, order) {
    const orderItem = itemDataMap[shopLinks[order.item]];
    const orderItemVariants = orderItem.size_variants;
    const orderTime = new Date().toLocaleString();

    let orderTotal = Object.entries(order.variations).reduce((total, [variantId, { quantity }]) => {
        const variation = orderItemVariants[variantId];
        return variation ? total + variation.price * quantity : total;
    }, 0);

    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Notification - Crunchee Munchies</title>
    </head>
    <body style="font-family: 'Inconsolata', monospace; background-color: #fff8e1; color: #333; margin: 0; padding: 8px;">
        
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 16px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            
            <a href="https://crunchee-munchies.com/" style="font-weight: bold; color: inherit; text-decoration: none; display: block; text-align: center; background-color: #f7c843; padding: 15px; border-radius: 8px 8px 0 0; font-size: 24px; font-weight: bold;">
                Crunchee Munchies - New Order
            </a>
            <h1 style="font-size: 24px; font-weight: bold; margin: 15px 0 0 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Order Placed on crunchee-munchies.com</h1>
            <div>
                <div style="padding-bottom: 8px; border-bottom: 1px solid #eee;">
                    <p style="font-size: 16px;"><strong>Customer Name:</strong> ${customer.firstName} ${customer.lastName || ''}</p>
                    <p style="font-size: 16px;"><strong>Email:</strong> ${customer.email}</p>
                    <p style="font-size: 16px;"><strong>Phone:</strong> ${customer.phone}</p>
                    <p style="font-size: 16px;"><strong>Order Time:</strong> ${orderTime}</p>
                </div>
                
                <p style="font-size: 16px; font-weight: bold; text-decoration: underline;">Order Details:</p>
                
                ${Object.entries(order.variations)
            .map(([variantId, { quantity }]) => {
                const variation = orderItemVariants[variantId];
                if (!variation) return '';
                return `
                        <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; flex-wrap: wrap; justify-content: center;">
                            ${variation.url ? `<img src="${variation.url}" alt="${variation.name}" style="width: 80px; height: auto; border-radius: 5px; margin-right: 15px;">` : ''}
                            <div style="flex: 1; min-width: 150px;">
                                <p style="margin: 5px 0;"><strong>Size:</strong> ${variation.name}</p>
                                <p style="margin: 5px 0;"><strong>Quantity:</strong> ${quantity}</p>
                                <p style="margin: 5px 0;"><strong>Price:</strong> $${variation.price.toFixed(2)} each</p>
                                <p style="margin: 5px 0;"><strong>Total:</strong> $${(variation.price * quantity).toFixed(2)}</p>
                            </div>
                            <a href="https://crunchee-munchies.com/shop/${variation.parentId}?variant=${variantId}" target="_blank" style="display: inline; height: 40px; padding: 10px 10px; background-color: inherit; color: #333; text-decoration: none; border-radius: 5px; font-weight: bold;">View Item</a>
                        </div>
                        `;
            })
            .join('')}
                
                <p style="font-size: 16px;"><strong>Delivery Method${customer.needsDelivery ? ': Shipping to' : ': Pickup requested (Northwest Calgary)'}</strong></p>
                ${customer.needsDelivery ? `
                    <p style="font-size: 16px;"><strong>Address: ${customer.streetAddress}, ${customer.city}, ${customer.province}, ${customer.postalZipCode}</strong></p>
                ` : ``}
                
                <p style="font-size: 16px;"><strong>Order Total:</strong> $${orderTotal.toFixed(2)}</p>
                
                ${customer.notes ? `<p style="font-size: 16px;"><strong>Special Notes:</strong></p><p style="font-size: 16px;">${customer.notes}</p>` : ''}
            </div>
            
            <div style="text-align: center; padding: 15px; font-size: 12px; color: #777;">
                <p>&copy; 2025 Crunchee Munchies. All rights reserved.</p>
            </div>
        </div>
        
    </body>
    </html>
    `;

    fs.writeFileSync('admin_order_email.html', emailHTML);
}

const customer = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    needsDelivery: true,
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

try {
    generateAdminOrderEmail(customer, order);
    console.log("Admin order email generated successfully.");
} catch (error) {
    console.error("Error generating admin order email:", error);
}
