import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-teenage-key';

// Middleware to verify JWT
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// Get all posts
router.get('/', (req, res) => {
    try {
        const posts = db.prepare('SELECT * FROM posts ORDER BY createdAt DESC').all();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single post and increment view count
router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(id);
        const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create post
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    const { title, content, category } = req.body;
    let image = null;
    if (req.file) {
        image = '/uploads/' + req.file.filename;
    }
    
    try {
        const result = db.prepare('INSERT INTO posts (title, content, image, category) VALUES (?, ?, ?, ?)').run(title, content, image, category || 'Uncategorized');
        const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json(post);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update post
router.put('/:id', authMiddleware, upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    
    let stmt = 'UPDATE posts SET title = ?, content = ?, category = ?';
    const params: any[] = [title, content, category || 'Uncategorized'];
    
    if (req.file) {
        stmt += ', image = ?';
        params.push('/uploads/' + req.file.filename);
    }
    stmt += ' WHERE id = ?';
    params.push(id);
    
    try {
        db.prepare(stmt).run(...params);
        const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
        res.json(post);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete post
router.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('DELETE FROM posts WHERE id = ?').run(id);
        res.json({ message: 'Post deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
