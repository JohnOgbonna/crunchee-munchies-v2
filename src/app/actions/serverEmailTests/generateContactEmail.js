const fs = require("fs");

function generateEmailHTML({ firstName, lastName, email, phone, message, preferedResponseType }) {
    const contactMethodMessage =
        preferedResponseType === "email"
            ? `We will contact you via email at <strong>${email}</strong>.`
            : `We will reach out to you by phone at <strong>${phone}</strong>.`;

    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Confirmation - Crunchee Munchies</title>
    </head>
    <body style="font-family: Montserrat, monospace; background-color: #fff8e1; color: #333; margin: 0; padding: 16px;">
        
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            
            <a href="https://crunchee-munchies.com/" style="display: block; margin: 8px 0; font-weight: bold; text-align: center; background-color: #f7c843; padding: 8px; border-radius: 8px 8px 0 0; font-size: 24px; font-weight: bold; color: #333; text-decoration: none;">
                Crunchee Munchies
            </a>
            
            <div style="padding: 8px;">
                <p style="font-size: 16px;">Hi <strong>${firstName} ${lastName || ""}</strong>,</p>
                <p style="font-size: 16px;">Thank you for reaching out to Crunchee Munchies! We have received your message.</p>
                <p style="font-size: 16px;">${contactMethodMessage}</p>
                
                <div style="background: #eab308; padding: 8px; border-radius: 8px; margin-top: 15px; font-weight: bold; color: white;">
                    <p>Your Message:</p>
                    <p>"${message}"</p>
                </div>
                
                <p style="font-size: 16px;">We will get back to you as soon as possible!</p>
                <p style="font-size: 16px; font-weight: bold;">Best,<br>Crunchee Munchies Team</p>
            </div>
            
            <div style="text-align: center; padding: 8px; font-size: 12px; color: #777;">
                <p>&copy; ${new Date().getFullYear()} Crunchee Munchies. All rights reserved.</p>
                <p>Follow us on <a href="https://www.instagram.com/crunchee_munchies/" style="color: #f7c843; text-decoration: none;">Instagram</a></p>
            </div>
        </div>
        
    </body>
    </html>
    `;

    fs.writeFileSync("contact_email_test.html", emailHTML, "utf8");
    console.log("✅ Email saved to contact_email_test.html");
}

const testData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    message: "I love your Chin-Chin! How can I order in bulk?",
    preferedResponseType: "email",
};

generateEmailHTML(testData);