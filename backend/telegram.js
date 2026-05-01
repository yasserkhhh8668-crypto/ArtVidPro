const axios = require('axios');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramMessage(chatId, message) {
    if (!BOT_TOKEN) return { success: false, error: 'No bot token' };
    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function sendOrderToTelegram(orderData) {
    const message = `
<b>📦 طلب جديد في ArtVidPro</b>
👤 الاسم: ${orderData.name}
📞 الهاتف: ${orderData.phone}
🎬 الخدمة: ${orderData.serviceType}
💰 الميزانية: ${orderData.budget || 'غير محددة'}
    `;
    return await sendTelegramMessage(CHAT_ID, message);
}

async function sendContactToTelegram(contactData) {
    const message = `
<b>💬 رسالة جديدة</b>
👤 الاسم: ${contactData.name}
📧 البريد: ${contactData.email}
💬 الرسالة: ${contactData.message}
    `;
    return await sendTelegramMessage(CHAT_ID, message);
}

module.exports = { sendTelegramMessage, sendOrderToTelegram, sendContactToTelegram };
