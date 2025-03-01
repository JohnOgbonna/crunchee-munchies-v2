const { shopLinks, itemDataMap } = require('./items');


function generateOrderEmail(customer, order) {
    const orderItem = itemDataMap[shopLinks[order.item]];
    const orderItemVariants = orderItem.size_variants;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Crunchee Munchies</title>
    </head>
    <body style="font-family: 'Inconsolata', monospace; background-color: #fff8e1; color: #333; margin: 0; padding: 20px;">
        
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <a href="https://crunchee-munchies.com/" style=" font-weight: bold; color: inherit; text-decoration: none; display: block; text-align: center; background-color: #f7c843; padding: 15px; border-radius: 8px 8px 0 0; font-size: 24px; font-weight: bold text-decoration: none;">
                Crunchee Munchies
            </a >
            
            <!-- Order Details -->
            <div style="padding: 8px;">
                <p style="font-size: 16px;">Hi <strong>${customer.firstName} ${customer.lastName || ''}</strong>,</p>
                <p style="font-size: 16px;">Thank you for your order! Here are the details:</p>
                
                ${Object.entries(order.variations)
            .map(([variantId, { quantity }]) => {
                const variation = orderItemVariants[variantId];
                if (!variation) return ''; // Skip invalid variations
                return `
                        <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; flex-wrap: wrap; justify-content: center;">
                            ${variation.url ? `<img src="${variation.url}" alt="${variation.name}" style="width: 80px; height: auto; border-radius: 5px; margin-right: 15px;">` : ''}
                            <div style="flex: 1; min-width: 150px;">
                                <p style="margin: 5px 0;"><strong>Item:</strong> ${variation.name}</p>
                                <p style="margin: 5px 0;"><strong>Quantity:</strong> ${quantity}</p>
                                <p style="margin: 5px 0;"><strong>Price:</strong> $${variation.price.toFixed(2)} each</p>
                                <p style="margin: 5px 0;"><strong>Total:</strong> $${(variation.price * quantity).toFixed(2)}</p>
                            </div>
                             <a href="https://crunchee-munchies.com/shop/${variation.parentId}?variant=${variantId}" target="_blank" style="display: inline-block; padding: 10px 15px; background-color: #f7c843; color: #333; text-decoration: none; border-radius: 5px; font-weight: bold;">View Item</a>
                        </div>
                        `;
            })
            .join('')}
                
                <p style="font-size: 16px;"><strong>Delivery Method${customer.needsDelivery ? ': Shipping to' : ': Pickup requested (Northwest Calgary)'}</strong></p>
                ${customer.needsDelivery ? `
                    <p style="font-size: 16px;"><strong>Address: ${customer.streetAddress}, ${customer.city}, ${customer.province}, ${customer.postalZipCode}</strong></p>
                ` : ``}
                
                <p style="font-size: 16px;">We are processing your order. Once approved, you will receive a confirmation email. We will contact you about pickup or shipping, and payment details.</p>
                
                <p style="font-size: 16px; font-weight:bold">If you have any questions, feel free to reply at <a href="mailto:cruncheemunchies@gmail.com" style="color: #f7c843; text-decoration: none;">crunchee-munchies@gmail.com</a></p>
                
                <p style="font-size: 16px; font-weight: bold;">Happy Snacking!</p>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 15px; font-size: 12px; color: #777;">
                <p>&copy; 2025 Crunchee Munchies. All rights reserved.</p>
                <p>Follow us on <a href="https://www.instagram.com/crunchee_munchies/" style="color: #f7c843; text-decoration: none;">Instagram</a></p>
            </div>
        </div>
        
    </body>
    </html>
    `;
}
module.exports = generateOrderEmail;