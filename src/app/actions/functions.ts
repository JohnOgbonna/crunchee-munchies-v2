export function generateOrderId(): string {
    const prefix = "CM"; // Short for Crunchee Munchies
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // YYMMDD
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4-char random string

    return `${prefix}-${date}${randomPart}`;
}