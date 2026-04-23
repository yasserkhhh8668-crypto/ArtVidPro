/* ===========================
   PixelCraft Studio - Core App
   =========================== */

// ─── Language System ───────────────────────────────────────────────────────
const translations = {
  ar: {
    // Nav
    nav_home: 'الرئيسية', nav_services: 'الخدمات', nav_portfolio: 'أعمالنا',
    nav_contact: 'تواصل معنا', nav_order: 'اطلب الآن', nav_login: 'تسجيل الدخول',
    nav_register: 'حساب جديد', nav_dashboard: 'لوحة التحكم', nav_logout: 'تسجيل الخروج',
    nav_admin: 'لوحة الإدارة',
    // Hero
    hero_badge: '✨ وكالة تصميم رقمية',
    hero_title: 'نصنع <span>هويتك البصرية</span> بإبداع لا حدود له',
    hero_desc: 'نقدم خدمات تصميم جرافيك احترافية، تصميم واجهات المستخدم، والهوية البصرية المتكاملة لتميّز علامتك التجارية.',
    hero_cta: 'ابدأ مشروعك', hero_portfolio: 'شاهد أعمالنا',
    hero_stat1: '+200', hero_stat1_label: 'عميل سعيد',
    hero_stat2: '+500', hero_stat2_label: 'مشروع منجز',
    hero_stat3: '5+', hero_stat3_label: 'سنوات خبرة',
    // Services
    services_badge: 'خدماتنا', services_title: 'ماذا نقدم لك؟',
    services_desc: 'نقدم مجموعة متكاملة من خدمات التصميم الرقمي لمساعدتك في بناء حضور قوي ومميز.',
    // Lead
    lead_title: 'هل أنت مهتم بخدماتنا؟', lead_desc: 'اشترك الآن واحصل على استشارة مجانية وعروض حصرية.',
    lead_name: 'اسمك الكريم', lead_email: 'بريدك الإلكتروني', lead_cta: 'احصل على استشارة مجانية',
    // Footer
    footer_desc: 'وكالة تصميم رقمية متخصصة في تقديم حلول إبداعية لعلامتك التجارية.',
    footer_links: 'روابط سريعة', footer_services: 'الخدمات', footer_contact: 'تواصل معنا',
    footer_copy: '© 2025 PixelCraft Studio. جميع الحقوق محفوظة.',
    // Auth
    login_title: 'مرحباً بعودتك', login_subtitle: 'سجّل دخولك للوصول إلى حسابك',
    register_title: 'إنشاء حساب جديد', register_subtitle: 'انضم إلينا وابدأ رحلتك الإبداعية',
    // Misc
    loading: 'جارٍ التحميل...', no_data: 'لا توجد بيانات حالياً',
    order_now: 'اطلب الآن', learn_more: 'اعرف أكثر',
    from: 'يبدأ من', currency: '$',
  },
  en: {
    nav_home: 'Home', nav_services: 'Services', nav_portfolio: 'Portfolio',
    nav_contact: 'Contact', nav_order: 'Order Now', nav_login: 'Login',
    nav_register: 'Register', nav_dashboard: 'Dashboard', nav_logout: 'Logout',
    nav_admin: 'Admin Panel',
    hero_badge: '✨ Digital Design Agency',
    hero_title: 'We craft your <span>visual identity</span> with limitless creativity',
    hero_desc: 'Professional graphic design, UI/UX design, and complete brand identity services to make your brand stand out.',
    hero_cta: 'Start Your Project', hero_portfolio: 'View Our Work',
    hero_stat1: '200+', hero_stat1_label: 'Happy Clients',
    hero_stat2: '500+', hero_stat2_label: 'Projects Done',
    hero_stat3: '5+', hero_stat3_label: 'Years Experience',
    services_badge: 'Our Services', services_title: 'What We Offer',
    services_desc: 'A complete suite of digital design services to help you build a strong and distinctive presence.',
    lead_title: 'Interested in our services?', lead_desc: 'Subscribe now and get a free consultation and exclusive offers.',
    lead_name: 'Your Name', lead_email: 'Your Email', lead_cta: 'Get Free Consultation',
    footer_desc: 'A digital design agency specialized in creative solutions for your brand.',
    footer_links: 'Quick Links', footer_services: 'Services', footer_contact: 'Contact',
    footer_copy: '© 2025 PixelCraft Studio. All rights reserved.',
    login_title: 'Welcome Back', login_subtitle: 'Sign in to access your account',
    register_title: 'Create Account', register_subtitle: 'Join us and start your creative journey',
    loading: 'Loading...', no_data: 'No data available',
    order_now: 'Order Now', learn_more: 'Learn More',
    from: 'Starting from', currency: '$',
  }
};

let currentLang = localStorage.getItem('lang') || 'ar';

function t(key) {
  return translations[currentLang][key] || translations['ar'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.body.classList.toggle('lang-en', lang === 'en');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.innerHTML = t(key);
    }
  });
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.textContent = lang === 'ar' ? 'EN' : 'AR';
  });
}

function toggleLang() {
  setLang(currentLang === 'ar' ? 'en' : 'ar');
}

// ─── Auth System ────────────────────────────────────────────────────────────
const AUTH_KEY = 'pixelcraft_user';
const ADMIN_EMAIL = 'admin@pixelcraft.studio';
const ADMIN_PASS  = 'Admin@2025';

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
}

function setCurrentUser(user) {
  if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  else       localStorage.removeItem(AUTH_KEY);
}

function isLoggedIn() { return !!getCurrentUser(); }
function isAdmin()    { const u = getCurrentUser(); return u && u.role === 'admin'; }

async function loginUser(email, password) {
  // Check hardcoded admin
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const admin = { id: 'admin-001', name: 'Admin', email: ADMIN_EMAIL, role: 'admin' };
    setCurrentUser(admin);
    return { success: true, user: admin };
  }
  // Check registered users in DB
  try {
    const res  = await fetch(`tables/users?search=${encodeURIComponent(email)}&limit=100`);
    const data = await res.json();
    const user = (data.data || []).find(u => u.email === email);
    if (!user) return { success: false, message: currentLang === 'ar' ? 'البريد الإلكتروني غير مسجّل' : 'Email not found' };
    if (user.password_hash !== btoa(password)) return { success: false, message: currentLang === 'ar' ? 'كلمة المرور غير صحيحة' : 'Incorrect password' };
    const session = { id: user.id, name: user.name, email: user.email, role: user.role || 'user', phone: user.phone };
    setCurrentUser(session);
    return { success: true, user: session };
  } catch (e) {
    return { success: false, message: currentLang === 'ar' ? 'خطأ في الاتصال' : 'Connection error' };
  }
}

async function registerUser(name, email, password, phone) {
  try {
    // Check existing
    const res  = await fetch(`tables/users?limit=500`);
    const data = await res.json();
    const exists = (data.data || []).find(u => u.email === email);
    if (exists) return { success: false, message: currentLang === 'ar' ? 'البريد الإلكتروني مسجّل مسبقًا' : 'Email already registered' };
    // Create user
    const newUser = { name, email, password_hash: btoa(password), phone, role: 'user', is_active: true };
    const createRes = await fetch('tables/users', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    const created = await createRes.json();
    const session = { id: created.id, name, email, role: 'user', phone };
    setCurrentUser(session);
    return { success: true, user: session };
  } catch (e) {
    return { success: false, message: currentLang === 'ar' ? 'خطأ في الاتصال' : 'Connection error' };
  }
}

function logoutUser() {
  setCurrentUser(null);
  window.location.href = 'index.html';
}

// ─── Toast Notifications ───────────────────────────────────────────────────
function showToast(message, type = 'info', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const icons = { success: 'fa-check-circle', danger: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOutDown 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
  toast.onclick = () => toast.remove();
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function buildNavbar() {
  const user = getCurrentUser();
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (p) => page === p ? 'active' : '';

  const userMenu = user ? `
    <div class="user-menu">
      <div class="user-avatar" onclick="this.closest('.user-menu').querySelector('.user-dropdown').classList.toggle('show')">
        ${user.name.charAt(0).toUpperCase()}
      </div>
      <div class="user-dropdown">
        <div class="dropdown-item" style="background:var(--gray-50);cursor:default;">
          <i class="fas fa-user"></i>
          <div><strong>${user.name}</strong><br><small style="color:var(--gray-400)">${user.email}</small></div>
        </div>
        <a href="dashboard.html" class="dropdown-item"><i class="fas fa-th-large"></i> ${t('nav_dashboard')}</a>
        ${user.role === 'admin' ? `<a href="admin.html" class="dropdown-item"><i class="fas fa-shield-alt"></i> ${t('nav_admin')}</a>` : ''}
        <a href="#" onclick="logoutUser()" class="dropdown-item danger"><i class="fas fa-sign-out-alt"></i> ${t('nav_logout')}</a>
      </div>
    </div>
  ` : `
    <a href="auth.html?mode=login" class="btn btn-secondary btn-sm">${t('nav_login')}</a>
    <a href="auth.html?mode=register" class="btn btn-primary btn-sm">${t('nav_register')}</a>
  `;

  navbar.innerHTML = `
    <div class="container">
      <a href="index.html" class="navbar-brand">
        <div class="logo-icon"><i class="fas fa-pen-nib"></i></div>
        PixelCraft
      </a>
      <nav class="navbar-nav" id="navMenu">
        <a href="index.html"     class="nav-link ${isActive('index.html')}"    >${t('nav_home')}</a>
        <a href="services.html"  class="nav-link ${isActive('services.html')}" >${t('nav_services')}</a>
        <a href="portfolio.html" class="nav-link ${isActive('portfolio.html')}">${t('nav_portfolio')}</a>
        <a href="contact.html"   class="nav-link ${isActive('contact.html')}  ">${t('nav_contact')}</a>
        <a href="order.html"     class="nav-link ${isActive('order.html')}  "  >${t('nav_order')}</a>
      </nav>
      <div class="navbar-actions">
        <button class="lang-toggle" onclick="toggleLang()">${currentLang === 'ar' ? 'EN' : 'AR'}</button>
        ${userMenu}
        <div class="navbar-toggle" onclick="document.getElementById('navMenu').classList.toggle('open')">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  `;

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      document.querySelectorAll('.user-dropdown').forEach(d => d.classList.remove('show'));
    }
  });
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function buildFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="navbar-brand logo" style="color:white;margin-bottom:16px">
            <div class="logo-icon"><i class="fas fa-pen-nib"></i></div>
            PixelCraft Studio
          </div>
          <p>${t('footer_desc')}</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-link"><i class="fab fa-behance"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>${t('footer_links')}</h4>
          <ul>
            <li><a href="index.html">${t('nav_home')}</a></li>
            <li><a href="services.html">${t('nav_services')}</a></li>
            <li><a href="portfolio.html">${t('nav_portfolio')}</a></li>
            <li><a href="contact.html">${t('nav_contact')}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>${t('footer_services')}</h4>
          <ul>
            <li><a href="services.html">تصميم الجرافيك</a></li>
            <li><a href="services.html">تصميم UI/UX</a></li>
            <li><a href="services.html">الهوية البصرية</a></li>
            <li><a href="services.html">تصميم الشعار</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>${t('footer_contact')}</h4>
          <ul>
            <li><a href="mailto:hello@pixelcraft.studio"><i class="fas fa-envelope" style="margin-left:6px;color:var(--accent)"></i> hello@pixelcraft.studio</a></li>
            <li><a href="tel:+966501234567"><i class="fas fa-phone" style="margin-left:6px;color:var(--accent)"></i> +966 50 123 4567</a></li>
            <li><a href="#"><i class="fas fa-map-marker-alt" style="margin-left:6px;color:var(--accent)"></i> الرياض، المملكة العربية السعودية</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">${t('footer_copy')}</div>
    </div>
  `;
}

// ─── API Helpers ─────────────────────────────────────────────────────────────
const API = {
  async get(table, params = {}) {
    const query = new URLSearchParams({ limit: 100, ...params });
    const res = await fetch(`tables/${table}?${query}`);
    return res.json();
  },
  async post(table, data) {
    const res = await fetch(`tables/${table}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async put(table, id, data) {
    const res = await fetch(`tables/${table}/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async patch(table, id, data) {
    const res = await fetch(`tables/${table}/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async delete(table, id) {
    await fetch(`tables/${table}/${id}`, { method: 'DELETE' });
  }
};

// ─── Integration Helpers ─────────────────────────────────────────────────────

// Webhook / Zapier / Make
async function triggerWebhook(webhookUrl, payload) {
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString(), source: 'PixelCraft Studio' })
    });
  } catch (e) { console.warn('Webhook failed:', e); }
}

// Google Sheets export via Apps Script
async function exportToGoogleSheets(sheetUrl, data) {
  if (!sheetUrl) return;
  try {
    await fetch(sheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (e) { console.warn('Sheets export failed:', e); }
}

// PayPal payment (Sandbox demo)
function initiatePayPal(amount, currency, orderId, returnUrl) {
  const baseUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
  const params = new URLSearchParams({
    cmd: '_xclick',
    business: 'sb-business@pixelcraft.studio',
    item_name: `PixelCraft Order #${orderId}`,
    amount: amount.toFixed(2),
    currency_code: currency || 'USD',
    return: returnUrl || window.location.href + '?payment=success',
    cancel_return: window.location.href + '?payment=cancelled'
  });
  window.open(`${baseUrl}?${params}`, '_blank');
}

// Stripe Checkout (requires Publishable Key)
function initiateStripe(amount, currency, description) {
  // Stripe integration placeholder - needs backend for session creation
  showToast(
    currentLang === 'ar'
      ? 'يتطلب Stripe تفعيل مفتاح API - اتصل بنا للدفع المباشر'
      : 'Stripe requires API key activation - contact us for direct payment',
    'info', 5000
  );
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function formatDate(ts) {
  if (!ts) return '-';
  return new Date(Number(ts)).toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function formatCurrency(amount) {
  return `$${Number(amount || 0).toFixed(0)}`;
}

function getStatusBadge(status) {
  const map = {
    pending:     { class: 'badge-warning', ar: 'قيد الانتظار', en: 'Pending' },
    in_progress: { class: 'badge-info',    ar: 'جارٍ التنفيذ', en: 'In Progress' },
    completed:   { class: 'badge-success', ar: 'مكتمل',        en: 'Completed' },
    cancelled:   { class: 'badge-danger',  ar: 'ملغي',          en: 'Cancelled' },
    paid:        { class: 'badge-success', ar: 'مدفوع',         en: 'Paid' },
    unpaid:      { class: 'badge-danger',  ar: 'غير مدفوع',     en: 'Unpaid' },
    refunded:    { class: 'badge-gray',    ar: 'مسترد',         en: 'Refunded' },
  };
  const s = map[status] || { class: 'badge-gray', ar: status, en: status };
  return `<span class="badge ${s.class}">${s[currentLang] || s.ar}</span>`;
}

function requireAuth(redirectIfAdmin = false) {
  if (!isLoggedIn()) {
    window.location.href = 'auth.html?mode=login&redirect=' + encodeURIComponent(window.location.href);
    return false;
  }
  if (redirectIfAdmin && !isAdmin()) {
    window.location.href = 'dashboard.html';
    return false;
  }
  return true;
}

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
  buildNavbar();
  buildFooter();
});
