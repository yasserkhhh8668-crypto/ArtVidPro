# PixelCraft Studio - وكالة التصميم الرقمي

موقع ويب متكامل لوكالة تصميم رقمية باللغة العربية مع دعم ثنائي اللغة (عربي/إنجليزي).

---

## 🚀 الصفحات والمسارات

| الصفحة | المسار | الوصف |
|--------|--------|-------|
| الرئيسية | `/index.html` | عرض الخدمات، الإحصائيات، الشهادات، التقاط Leads |
| الخدمات | `/services.html` | عرض الخدمات مع التصفية، مقارنة الباقات، FAQ |
| أعمالنا | `/portfolio.html` | معرض الأعمال مع Lightbox والتصفية |
| تواصل معنا | `/contact.html` | نموذج التواصل مع جمع Leads |
| طلب خدمة | `/order.html` | نموذج الطلب ثلاثي الخطوات مع الدفع |
| تسجيل الدخول | `/auth.html?mode=login` | تسجيل الدخول |
| إنشاء حساب | `/auth.html?mode=register` | إنشاء حساب جديد |
| لوحة المستخدم | `/dashboard.html` | طلبات المستخدم، الملف الشخصي، الإشعارات |
| لوحة الإدارة | `/admin.html` | إدارة كاملة للطلبات، المستخدمين، Leads، الخدمات |

---

## ✅ الميزات المنجزة

### 🎨 التصميم والواجهة
- [x] تصميم عصري متجاوب (Responsive) - أزرق داكن + رمادي فاتح
- [x] دعم ثنائي اللغة عربي/إنجليزي مع RTL/LTR
- [x] شريط تنقل ثابت مع قائمة المستخدم
- [x] تذييل متكامل مع روابط التواصل الاجتماعي
- [x] نظام Toast Notifications
- [x] Modal/Popup components
- [x] تأثيرات حركية وانتقالات سلسة

### 🔐 نظام المصادقة
- [x] تسجيل الدخول بالبريد وكلمة المرور
- [x] إنشاء حساب جديد مع التحقق
- [x] مقياس قوة كلمة المرور
- [x] حساب Admin مدمج (admin@pixelcraft.studio / Admin@2025)
- [x] حماية الصفحات (Auth Guard)
- [x] تذكّر المستخدم عبر localStorage

### 📦 إدارة الخدمات
- [x] 5 خدمات افتراضية في قاعدة البيانات
- [x] 3 باقات لكل خدمة (أساسية / قياسية / متقدمة)
- [x] تصفية الخدمات حسب التصنيف
- [x] مقارنة الباقات في جدول

### 🛒 نظام الطلبات
- [x] نموذج طلب ثلاثي الخطوات
- [x] ملخص الطلب التفاعلي
- [x] دعم طلبات الزوار والمستخدمين المسجلين
- [x] تغيير حالة الطلبات من Admin

### 💳 الدفع الإلكتروني
- [x] تكامل PayPal Sandbox (جاهز للتفعيل الحقيقي)
- [x] واجهة Stripe (يتطلب Backend للتفعيل الكامل)
- [x] دعم التحويل البنكي
- [x] خيار الدفع اللاحق

### 📊 قواعد البيانات (RESTful Table API)
- [x] جدول `users` - بيانات المستخدمين
- [x] جدول `orders` - الطلبات
- [x] جدول `leads` - العملاء المحتملون
- [x] جدول `services` - الخدمات

### 🔗 التكاملات
- [x] Webhook لـ Zapier / Make (إعداد عبر لوحة Admin)
- [x] Google Sheets عبر Apps Script (إعداد عبر لوحة Admin)
- [x] PayPal Sandbox متكامل
- [x] Stripe (واجهة جاهزة - يحتاج Backend)

### 👤 لوحة تحكم المستخدم
- [x] عرض الطلبات مع التصفية
- [x] تعديل الملف الشخصي
- [x] تغيير كلمة المرور
- [x] إشعارات النظام

### 👑 لوحة تحكم Admin
- [x] إحصائيات مرئية مع Chart.js
- [x] إدارة كاملة للطلبات (CRUD + تغيير الحالة)
- [x] إدارة المستخدمين
- [x] إدارة Leads مع تمييز "تم التواصل"
- [x] إدارة الخدمات (إضافة/تعديل/حذف)
- [x] تصدير البيانات CSV
- [x] إعدادات التكاملات (Webhook، Sheets، PayPal، Stripe)

### 🧲 التقاط Leads
- [x] بانر الاشتراك في الصفحة الرئيسية
- [x] نموذج التواصل الكامل
- [x] تصنيف المصدر (homepage / contact / services)
- [x] تصدير Leads إلى CSV

---

## 🔑 بيانات الدخول التجريبية

```
Admin:
  البريد:    admin@pixelcraft.studio
  كلمة المرور: Admin@2025
```

---

## 📁 هيكل المشروع

```
pixelcraft-studio/
├── index.html          # الصفحة الرئيسية
├── services.html       # صفحة الخدمات
├── portfolio.html      # معرض الأعمال
├── contact.html        # التواصل وجمع Leads
├── order.html          # طلب خدمة مع الدفع
├── auth.html           # تسجيل الدخول / إنشاء حساب
├── dashboard.html      # لوحة تحكم المستخدم
├── admin.html          # لوحة تحكم الإدارة
├── css/
│   └── style.css       # التصميم الرئيسي
├── js/
│   └── app.js          # منطق التطبيق والتكاملات
└── README.md
```

---

## 🗄️ نماذج البيانات

### users
| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | text | معرف فريد |
| name | text | الاسم |
| email | text | البريد الإلكتروني |
| password_hash | text | كلمة المرور (Base64) |
| role | text | user / admin |
| phone | text | رقم الهاتف |
| is_active | bool | حالة الحساب |

### orders
| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | text | معرف الطلب |
| user_id | text | معرف المستخدم |
| service | text | رمز الخدمة |
| package | text | basic / standard / premium |
| price | number | السعر |
| status | text | pending / in_progress / completed / cancelled |
| payment_status | text | unpaid / paid / refunded |
| description | rich_text | وصف الطلب |

### leads
| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | text | معرف Lead |
| name | text | الاسم |
| email | text | البريد |
| phone | text | الهاتف |
| message | rich_text | الرسالة |
| source | text | مصدر الاهتمام |
| is_contacted | bool | هل تم التواصل |

### services
| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | text | معرف الخدمة |
| title_ar | text | الاسم بالعربية |
| title_en | text | الاسم بالإنجليزية |
| price_basic | number | سعر الباقة الأساسية |
| price_standard | number | سعر الباقة القياسية |
| price_premium | number | سعر الباقة المتقدمة |
| is_active | bool | هل الخدمة متاحة |

---

## 🔧 إعداد التكاملات

### Zapier / Make Webhook
1. افتح لوحة Admin ← التكاملات
2. الصق رابط Webhook من Zapier أو Make
3. اضغط "حفظ" ثم "اختبار"

### Google Sheets
1. أنشئ Apps Script على [script.google.com](https://script.google.com)
2. الصق كود يستقبل POST requests ويضيف الصفوف
3. انشر كـ Web App واحصل على الرابط
4. الصق الرابط في لوحة Admin ← التكاملات

### PayPal (تفعيل حقيقي)
1. أنشئ حساب PayPal Business
2. احصل على Business Email
3. أدخله في لوحة Admin ← التكاملات ← PayPal
4. غيّر الوضع من Sandbox إلى Live

### Stripe (تفعيل كامل)
> ⚠️ Stripe يتطلب خادم Backend لإنشاء Payment Session
> الإعداد الحالي هو واجهة جاهزة - تحتاج Backend Node.js/Python

---

## 🔮 ميزات مقترحة للمستقبل

- [ ] نظام الدردشة الحية مع العملاء
- [ ] إشعارات Push عبر Browser Notifications API
- [ ] نظام التقييمات والمراجعات
- [ ] صفحة المدونة ومحتوى SEO
- [ ] تكامل مع Airtable مباشرة
- [ ] نظام الكوبونات والخصومات
- [ ] ربط WhatsApp Business API
- [ ] تطبيق موبايل (PWA)
- [ ] نظام الفواتير PDF
- [ ] تتبع حالة المشروع في الوقت الفعلي
- [ ] نظام المصادقة بـ Google OAuth
- [ ] لوحة تحليلات متقدمة (Analytics)
