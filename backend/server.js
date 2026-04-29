const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'artvidpro_secret_key_2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Database file path
const DB_PATH = path.join(__dirname, 'db.json');

// Initialize database if not exists
function initDB() {
    if (!fs.existsSync(DB_PATH)) {
        const initialDB = {
            users: [
                {
                    id: 1,
                    username: 'admin',
                    password: bcrypt.hashSync('admin123', 10),
                    role: 'admin',
                    email: 'admin@artvidpro.com'
                }
            ],
            orders: [],
            contacts: [],
            portfolio: [
                {
                    id: 1,
                    title: 'فيديو ترويجي لمطعم',
                    description: 'تصوير ومونتاج احترافي لمطعم في المدية',
                    thumbnail: 'https://via.placeholder.com/300x200',
                    videoUrl: '#'
                },
                {
                    id: 2,
                    title: 'إعلان لمنتج محلي',
                    description: 'فيديو قصير لمنتج جزائري',
                    thumbnail: 'https://via.placeholder.com/300x200',
                    videoUrl: '#'
                }
            ]
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2));
    }
}

function readDB() {
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

// ============= API ROUTES =============

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.username === username);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

// Orders Routes
app.post('/api/orders', (req, res) => {
    const db = readDB();
    const newOrder = {
        id: db.orders.length + 1,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    db.orders.push(newOrder);
    writeDB(db);
    res.status(201).json(newOrder);
});

app.get('/api/orders', verifyToken, (req, res) => {
    const db = readDB();
    res.json(db.orders);
});

app.put('/api/orders/:id', verifyToken, (req, res) => {
    const db = readDB();
    const orderId = parseInt(req.params.id);
    const orderIndex = db.orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    db.orders[orderIndex] = { ...db.orders[orderIndex], ...req.body };
    writeDB(db);
    res.json(db.orders[orderIndex]);
});

// Contact Routes
app.post('/api/contact', (req, res) => {
    const db = readDB();
    const newContact = {
        id: db.contacts.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
    };
    db.contacts.push(newContact);
    writeDB(db);
    res.status(201).json(newContact);
});

app.get('/api/contacts', verifyToken, (req, res) => {
    const db = readDB();
    res.json(db.contacts);
});

// Portfolio Routes
app.get('/api/portfolio', (req, res) => {
    const db = readDB();
    res.json(db.portfolio);
});

app.post('/api/portfolio', verifyToken, (req, res) => {
    const db = readDB();
    const newItem = {
        id: db.portfolio.length + 1,
        ...req.body
    };
    db.portfolio.push(newItem);
    writeDB(db);
    res.status(201).json(newItem);
});

// Stats for dashboard
app.get('/api/stats', verifyToken, (req, res) => {
    const db = readDB();
    res.json({
        totalOrders: db.orders.length,
        pendingOrders: db.orders.filter(o => o.status === 'pending').length,
        totalContacts: db.contacts.length,
        totalPortfolio: db.portfolio.length
    });
});

// Initialize and start server
initDB();
app.listen(PORT, () => {
    console.log(`🚀 ArtVidPro backend running on http://localhost:${PORT}`);
    console.log(`📁 Admin login: admin / admin123`);
});
