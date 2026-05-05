import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-teenage-key';

// Initialize admin user if none exists
const initAdmin = () => {
    const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
    if (!admin) {
        const hash = bcrypt.hashSync('psycho123', 10);
        db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hash);
    }
}
initAdmin();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
        
        res.json({ token, message: 'Logged in successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ user: decoded });
    } catch {
        res.status(401).json({ message: 'Unauthenticated' });
    }
});

export default router;
