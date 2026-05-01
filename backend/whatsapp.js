const axios = require('axios');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

async function sendWhatsAppCallMeBot(phoneNumber, message) {
    try {
        const apiKey = process.env.WHATSAPP_API_KEY;
        if (!apiKey) return { success: false, error: 'No API key' };
        const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
        const response = await axios.get(url);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function getWhatsAppLink(phoneNumber, message) {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

async function notifyAdminNewOrder(orderData) {
    const adminPhone = process.env.ADMIN_PHONE?.replace('+', '');
    if (!adminPhone) return { success: false, error: 'No admin phone' };
    
    const message = `
📦 طلب جديد في ArtVidPro 📦
👤 الاسم: ${orderData.name}
📞 الهاتف: ${orderData.phone}
🎬 الخدمة: ${orderData.serviceType}
💰 الميزانية: ${orderData.budget || 'غير محددة'}
💬 الرسالة: ${orderData.message || 'لا توجد'}
    `;
    return await sendWhatsAppCallMeBot(adminPhone, message);
}

async function sendClientConfirmation(clientPhone, clientName, orderId) {
    const phone = clientPhone.replace('+', '');
    const message = `
🎬 مرحباً ${clientName} 🎬
✅ تم استلام طلبك رقم: #${orderId}
📞 سنتواصل معك خلال 24 ساعة
    `;
    return await sendWhatsAppCallMeBot(phone, message);
}

module.exports = { sendWhatsAppCallMeBot, getWhatsAppLink, notifyAdminNewOrder, sendClientConfirmation }; 
