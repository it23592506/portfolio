const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database setup
const db = new sqlite3.Database('portfolio.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Skills table
        db.run(`CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT DEFAULT 'Other',
            proficiency INTEGER DEFAULT 80,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Projects table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            technologies TEXT,
            image_url TEXT,
            github_url TEXT,
            live_url TEXT,
            featured INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Experience table
        db.run(`CREATE TABLE IF NOT EXISTS experience (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            company TEXT,
            institution TEXT,
            start_date TEXT,
            end_date TEXT,
            description TEXT,
            type TEXT DEFAULT 'work',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Contacts table
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT,
            read INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Create default admin user
        const defaultPassword = bcrypt.hashSync('admin123', 10);
        db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, 
            ['admin', defaultPassword], (err) => {
                if (!err) {
                    console.log('Default admin user created (username: admin, password: admin123)');
                }
            });

        // Add sample data
        addSampleData();
    });
}

// Add sample data
function addSampleData() {
    // Check if skills exist
    db.get('SELECT COUNT(*) as count FROM skills', (err, row) => {
        if (!err && row.count === 0) {
            const skills = [
                { name: 'C/C++', category: 'Programming' },
                { name: 'Python', category: 'Programming' },
                { name: 'JavaScript', category: 'Programming' },
                { name: 'HTML/CSS', category: 'Web Development' },
                { name: 'Node.js', category: 'Web Development' },
                { name: 'React', category: 'Web Development' },
                { name: 'Arduino', category: 'IoT & Embedded' },
                { name: 'ESP32', category: 'IoT & Embedded' },
                { name: 'STM32', category: 'IoT & Embedded' },
                { name: 'Raspberry Pi', category: 'IoT & Embedded' },
                { name: 'Git', category: 'Tools & Technologies' },
                { name: 'VS Code', category: 'Tools & Technologies' },
                { name: 'Docker', category: 'Tools & Technologies' }
            ];
            
            skills.forEach(skill => {
                db.run('INSERT INTO skills (name, category) VALUES (?, ?)', 
                    [skill.name, skill.category]);
            });
            console.log('Sample skills added');
        }
    });

    // Check if projects exist
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
        if (!err && row.count === 0) {
            const projects = [
                {
                    title: 'Smart Home Automation System',
                    description: 'IoT-based home automation using ESP32 and MQTT protocol',
                    technologies: 'ESP32, MQTT, Node.js, React',
                    github_url: 'https://github.com',
                    featured: 1
                },
                {
                    title: 'Weather Monitoring Station',
                    description: 'Real-time weather monitoring with cloud data logging',
                    technologies: 'Arduino, Sensors, Firebase, React',
                    github_url: 'https://github.com',
                    featured: 1
                }
            ];
            
            projects.forEach(project => {
                db.run(`INSERT INTO projects (title, description, technologies, github_url, featured) 
                        VALUES (?, ?, ?, ?, ?)`, 
                    [project.title, project.description, project.technologies, project.github_url, project.featured]);
            });
            console.log('Sample projects added');
        }
    });

    // Check if experience exists
    db.get('SELECT COUNT(*) as count FROM experience', (err, row) => {
        if (!err && row.count === 0) {
            const experiences = [
                {
                    title: 'IoT Developer',
                    company: 'Tech Solutions Ltd',
                    start_date: '2023',
                    end_date: 'Present',
                    description: 'Developing IoT solutions and embedded systems',
                    type: 'work'
                },
                {
                    title: 'Bachelor of Engineering',
                    institution: 'University of Technology',
                    start_date: '2019',
                    end_date: '2023',
                    description: 'Electronics and Communication Engineering',
                    type: 'education'
                }
            ];
            
            experiences.forEach(exp => {
                db.run(`INSERT INTO experience (title, company, institution, start_date, end_date, description, type) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                    [exp.title, exp.company, exp.institution, exp.start_date, exp.end_date, exp.description, exp.type]);
            });
            console.log('Sample experience added');
        }
    });
}

// JWT Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// ============ AUTH ROUTES ============

// Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: user.username });
    });
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});

// ============ PUBLIC API ROUTES ============

// Get all skills (public)
app.get('/api/skills', (req, res) => {
    db.all('SELECT * FROM skills ORDER BY category, name', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Get all projects (public)
app.get('/api/projects', (req, res) => {
    db.all('SELECT * FROM projects ORDER BY featured DESC, created_at DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Get all experience (public)
app.get('/api/experience', (req, res) => {
    db.all('SELECT * FROM experience ORDER BY start_date DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Submit contact form (public)
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    db.run('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to save message' });
            }
            res.json({ success: true, id: this.lastID });
        });
});

// ============ ADMIN API ROUTES (Protected) ============

// Dashboard stats
app.get('/api/admin/stats', authenticateToken, (req, res) => {
    const stats = {};
    
    db.get('SELECT COUNT(*) as count FROM skills', (err, row) => {
        stats.skills = row ? row.count : 0;
        
        db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
            stats.projects = row ? row.count : 0;
            
            db.get('SELECT COUNT(*) as count FROM experience', (err, row) => {
                stats.experience = row ? row.count : 0;
                
                db.get('SELECT COUNT(*) as count FROM contacts WHERE read = 0', (err, row) => {
                    stats.unreadContacts = row ? row.count : 0;
                    res.json(stats);
                });
            });
        });
    });
});

// SKILLS CRUD
app.post('/api/admin/skills', authenticateToken, (req, res) => {
    const { name, category, proficiency } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Skill name is required' });
    }

    db.run('INSERT INTO skills (name, category, proficiency) VALUES (?, ?, ?)',
        [name, category || 'Other', proficiency || 80], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to add skill' });
            }
            res.json({ success: true, id: this.lastID });
        });
});

app.put('/api/admin/skills/:id', authenticateToken, (req, res) => {
    const { name, category, proficiency } = req.body;
    const { id } = req.params;

    db.run('UPDATE skills SET name = ?, category = ?, proficiency = ? WHERE id = ?',
        [name, category, proficiency, id], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update skill' });
            }
            res.json({ success: true });
        });
});

app.delete('/api/admin/skills/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM skills WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete skill' });
        }
        res.json({ success: true });
    });
});

// PROJECTS CRUD
app.post('/api/admin/projects', authenticateToken, (req, res) => {
    const { title, description, technologies, image_url, github_url, live_url, featured } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Project title is required' });
    }

    db.run(`INSERT INTO projects (title, description, technologies, image_url, github_url, live_url, featured) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, technologies, image_url, github_url, live_url, featured ? 1 : 0], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to add project' });
            }
            res.json({ success: true, id: this.lastID });
        });
});

app.put('/api/admin/projects/:id', authenticateToken, (req, res) => {
    const { title, description, technologies, image_url, github_url, live_url, featured } = req.body;
    const { id } = req.params;

    db.run(`UPDATE projects SET title = ?, description = ?, technologies = ?, image_url = ?, 
            github_url = ?, live_url = ?, featured = ? WHERE id = ?`,
        [title, description, technologies, image_url, github_url, live_url, featured ? 1 : 0, id], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update project' });
            }
            res.json({ success: true });
        });
});

app.delete('/api/admin/projects/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete project' });
        }
        res.json({ success: true });
    });
});

// EXPERIENCE CRUD
app.post('/api/admin/experience', authenticateToken, (req, res) => {
    const { title, company, institution, start_date, end_date, description, type } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    db.run(`INSERT INTO experience (title, company, institution, start_date, end_date, description, type) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, company, institution, start_date, end_date, description, type || 'work'], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to add experience' });
            }
            res.json({ success: true, id: this.lastID });
        });
});

app.put('/api/admin/experience/:id', authenticateToken, (req, res) => {
    const { title, company, institution, start_date, end_date, description, type } = req.body;
    const { id } = req.params;

    db.run(`UPDATE experience SET title = ?, company = ?, institution = ?, start_date = ?, 
            end_date = ?, description = ?, type = ? WHERE id = ?`,
        [title, company, institution, start_date, end_date, description, type, id], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update experience' });
            }
            res.json({ success: true });
        });
});

app.delete('/api/admin/experience/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM experience WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete experience' });
        }
        res.json({ success: true });
    });
});

// CONTACTS
app.get('/api/admin/contacts', authenticateToken, (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

app.put('/api/admin/contacts/:id/read', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run('UPDATE contacts SET read = 1 WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to mark as read' });
        }
        res.json({ success: true });
    });
});

app.delete('/api/admin/contacts/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM contacts WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete contact' });
        }
        res.json({ success: true });
    });
});

// Serve admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log('Default login: admin / admin123');
});
