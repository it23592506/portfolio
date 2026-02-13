// Portfolio Dynamic Content Loader
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded - fetching dynamic content...');
    
    // Initialize all dynamic content
    loadAllContent();
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll animations
    initScrollAnimations();
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Typing effect for hero
    initTypingEffect();
});

// Typing effect
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = ['Embedded Systems Developer', 'IoT Specialist', 'Hardware Enthusiast', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Load all dynamic content
async function loadAllContent() {
    try {
        await Promise.all([
            loadSkills(),
            loadProjects(),
            loadExperience()
        ]);
        console.log('All dynamic content loaded successfully');
    } catch (error) {
        console.error('Error loading dynamic content:', error);
    }
}

// Load Skills from API
async function loadSkills() {
    const container = document.getElementById('skills-container');
    
    try {
        console.log('Fetching skills...');
        const response = await fetch('/api/skills');
        
        if (!response.ok) {
            throw new Error('Failed to fetch skills');
        }
        
        const skills = await response.json();
        console.log('Skills loaded:', skills.length, 'items');
        
        if (skills.length === 0) {
            container.innerHTML = '<p class="no-data">No skills added yet. Add skills from the admin panel.</p>';
            return;
        }
        
        // Group skills by category
        const categories = {};
        skills.forEach(skill => {
            const cat = skill.category || 'Other';
            if (!categories[cat]) {
                categories[cat] = [];
            }
            categories[cat].push(skill.name);
        });
        
        // Generate HTML
        const categoryIcons = {
            'Programming': 'fa-code',
            'Web Development': 'fa-globe',
            'IoT & Embedded': 'fa-microchip',
            'Tools & Technologies': 'fa-tools',
            'Database': 'fa-database',
            'Cloud': 'fa-cloud',
            'Other': 'fa-folder'
        };
        
        let html = '';
        for (const [category, skillList] of Object.entries(categories)) {
            const icon = categoryIcons[category] || 'fa-folder';
            html += `
                <div class="skill-category">
                    <h3><i class="fas ${icon}"></i> ${category}</h3>
                    <div class="skill-list">
                        ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = html;
        console.log('Skills section updated');
        
    } catch (error) {
        console.error('Error loading skills:', error);
        container.innerHTML = '<p class="no-data">Failed to load skills. Please refresh the page.</p>';
    }
}

// Load Projects from API
async function loadProjects() {
    const container = document.getElementById('projects-container');
    
    try {
        console.log('Fetching projects...');
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        
        const projects = await response.json();
        console.log('Projects loaded:', projects.length, 'items');
        
        if (projects.length === 0) {
            container.innerHTML = '<p class="no-data">No projects added yet. Add projects from the admin panel.</p>';
            return;
        }
        
        let html = '';
        projects.forEach(project => {
            const tags = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];
            
            html += `
                <div class="project-card">
                    <div class="project-image">
                        ${project.image_url 
                            ? `<img src="${project.image_url}" alt="${project.title}">`
                            : `<i class="fas fa-project-diagram"></i>`
                        }
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description || ''}</p>
                        <div class="project-tags">
                            ${tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.github_url ? `<a href="${project.github_url}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                            ${project.live_url ? `<a href="${project.live_url}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Update project count
        const projectCount = document.getElementById('projects-count');
        if (projectCount) {
            projectCount.textContent = projects.length + '+';
        }
        
        console.log('Projects section updated');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p class="no-data">Failed to load projects. Please refresh the page.</p>';
    }
}

// Load Experience from API
async function loadExperience() {
    const container = document.getElementById('experience-container');
    
    try {
        console.log('Fetching experience...');
        const response = await fetch('/api/experience');
        
        if (!response.ok) {
            throw new Error('Failed to fetch experience');
        }
        
        const experiences = await response.json();
        console.log('Experience loaded:', experiences.length, 'items');
        
        if (experiences.length === 0) {
            container.innerHTML = '<p class="no-data">No experience added yet. Add experience from the admin panel.</p>';
            return;
        }
        
        let html = '';
        experiences.forEach(exp => {
            html += `
                <div class="timeline-item">
                    <div class="timeline-content">
                        <h3>${exp.title}</h3>
                        <h4>${exp.company || exp.institution || ''}</h4>
                        <span class="date">${exp.start_date || ''} - ${exp.end_date || 'Present'}</span>
                        <p>${exp.description || ''}</p>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        console.log('Experience section updated');
        
    } catch (error) {
        console.error('Error loading experience:', error);
        container.innerHTML = '<p class="no-data">Failed to load experience. Please refresh the page.</p>';
    }
}

// Handle contact form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Message sent successfully! I will get back to you soon.');
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again later.');
    }
}

// Refresh content function (can be called manually)
window.refreshContent = function() {
    console.log('Refreshing all content...');
    loadAllContent();
};

// Particle Animation
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 150)})`;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', initParticles);