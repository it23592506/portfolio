# Professional Portfolio - Embedded Systems & IoT Developer

A modern, responsive portfolio website showcasing expertise in embedded systems, IoT development, and software engineering.

## 🚀 Features

### Technical Showcase
- **Skills Visualization**: Interactive skill bars with animations showing proficiency levels
- **Project Portfolio**: Filtered project gallery with detailed modal views
- **Experience Timeline**: Interactive timeline showing education, work experience, and certifications
- **Technology Stack**: Visual representation of tools and technologies

### User Experience
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: GPU-accelerated animations and transitions
- **Interactive Elements**: Hover effects, scroll animations, and micro-interactions
- **Accessibility**: Keyboard navigation support and screen reader friendly
- **Performance Optimized**: Lazy loading, debounced events, and optimized assets

### Modern Technologies
- **Pure HTML5/CSS3/JavaScript**: No frameworks, lightweight and fast
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Dynamic theming system
- **Intersection Observer API**: Efficient scroll animations
- **Web APIs**: Responsive design with modern browser features

## 📂 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet with modern CSS
│   ├── js/
│   │   └── script.js      # Interactive functionality
│   ├── images/
│   │   ├── projects/      # Project screenshots (add your images here)
│   │   ├── og-image.jpg   # Social media preview image
│   │   └── favicon.ico    # Website icon
│   └── resume/
│       └── resume.pdf     # Your resume/CV file
└── README.md              # This file
```

## 🛠️ Skills Highlighted

### Programming & Development
- **C/C++**: Data Structures, Algorithms, Embedded Systems
- **Python**: Scripting, Data Analysis, IoT Applications
- **Arduino & ESP32**: IoT Development, Sensor Integration
- **Web Development**: HTML, CSS, JavaScript, Responsive Design
- **Version Control**: Git, GitHub/GitLab, CI/CD basics
- **Software Engineering**: SRS, SDLC, Testing methodologies

### IoT & Embedded Systems
- **Microcontrollers**: Arduino Pro Mini, ESP32
- **Sensors**: DHT22, DS18B20, MQ2, Various environmental sensors
- **Communication**: LoRa Ra-02 SX1278, NRF24L01+, SIM900A GSM
- **Protocols**: I2C, SPI, UART, WiFi, Bluetooth
- **Actuators**: LEDs, Buzzers, Relays, TFT/LCD Displays

### Tools & Testing
- **Development**: VS Code, Arduino IDE, MATLAB/Octave
- **Testing**: Equivalence Partitioning, Boundary Value Analysis, Decision Tables
- **Electronics**: Voltage-current measurement, Circuit analysis
- **Graphics**: OpenGL, Signal Processing, Fourier Transforms
- **Cloud**: Basic OpenTelemetry, Cloud observability concepts

## 🎯 Featured Projects

1. **Smart Weather Monitoring System**
   - ESP32-based IoT weather station
   - Multiple environmental sensors (DHT22, DS18B20, MQ2)
   - Web dashboard with real-time data visualization
   - Cloud integration and mobile responsiveness

2. **Home Automation Hub**
   - Arduino-controlled smart home system
   - Wireless communication with NRF24L01+ modules
   - Mobile app interface and voice control
   - Automated scheduling and security features

3. **IoT Data Analytics Dashboard**
   - Python Flask backend with interactive frontend
   - Real-time data visualization and analysis
   - RESTful API and database integration
   - Predictive modeling capabilities

4. **LoRa Wireless Sensor Network**
   - Long-range environmental monitoring network
   - Mesh topology with self-healing capabilities
   - Ultra-low power consumption design
   - Solar-powered remote sensors

5. **LED Characterization Platform**
   - Automated testing for LED analysis
   - Precision voltage-current measurements
   - Planck's constant estimation algorithms
   - MATLAB integration for data analysis

6. **Mobile IoT Control Interface**
   - Responsive web interface for device control
   - Real-time WebSocket communication
   - Progressive Web App features
   - Mobile-first design approach

## 🚀 Getting Started

### 1. Personalization
Replace placeholder content with your information:

- **Personal Information**: Update name, contact details, and bio in `index.html`
- **Profile Photo**: Add your photo to replace the placeholder in the hero section
- **Resume/CV**: Add your resume PDF to `assets/resume/resume.pdf`
- **Project Images**: Add project screenshots to `assets/images/projects/`

### 2. Content Updates

#### Skills Section
Update skill levels and technologies in the skills section to match your expertise:
```html
<div class="skill-fill" style="--width: 95%"></div> <!-- Adjust percentage -->
```

#### Projects Section
Customize project information in the JavaScript file (`assets/js/script.js`):
```javascript
projectsData = {
    'your-project-id': {
        title: 'Your Project Name',
        description: 'Project description...',
        features: ['Feature 1', 'Feature 2'],
        technologies: ['Tech 1', 'Tech 2'],
        liveUrl: 'https://your-demo-url.com',
        githubUrl: 'https://github.com/yourusername/project'
    }
};
```

#### Experience Timeline
Update the timeline sections with your education and work experience in `index.html`.

### 3. Customization

#### Colors and Branding
Modify CSS custom properties in `assets/css/style.css`:
```css
:root {
    --primary-color: #00d4ff;     /* Your brand color */
    --secondary-color: #ff6b35;   /* Accent color */
    --accent-color: #10b981;      /* Success/positive color */
}
```

#### Typography
Change fonts by updating the Google Fonts import and CSS font-family declarations.

### 4. Deployment

#### GitHub Pages
1. Push code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

#### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Custom domain support available

#### Traditional Web Hosting
Upload all files to your web hosting provider's public folder.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-optimized interface with maintained functionality
- **Mobile**: Mobile-first design with collapsible navigation

## 🔧 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **CSS Features**: Grid, Flexbox, Custom Properties, Backdrop Filter
- **JavaScript**: ES6+ features, Intersection Observer, Web APIs

## 📊 Performance Features

- **Lazy Loading**: Images load only when needed
- **Debounced Events**: Optimized scroll and resize handlers
- **GPU Acceleration**: Hardware-accelerated animations
- **Minimal Dependencies**: Pure vanilla JavaScript for fast loading
- **Optimized Assets**: Compressed images and minified code

## 🎨 Customization Tips

### Adding New Projects
1. Add project data to `projectsData` object in `script.js`
2. Create a new project card in the HTML
3. Add project images to `assets/images/projects/`

### Changing Animation Speed
Modify CSS animation durations and JavaScript timing values:
```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Adding New Sections
1. Create new section HTML with appropriate classes
2. Add navigation link to navbar
3. Update JavaScript for scroll animations and navigation

## 📈 SEO Optimization

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Semantic HTML**: Proper HTML5 semantic structure
- **Performance**: Fast loading times for better rankings
- **Mobile-First**: Responsive design for mobile indexing
- **Structured Data**: Ready for schema markup addition

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you create improvements that could benefit others, pull requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Font Awesome**: Icons used throughout the interface
- **Google Fonts**: Inter font family for modern typography
- **CSS Grid**: Modern layout capabilities
- **JavaScript APIs**: Modern browser APIs for enhanced functionality

## 📞 Support

If you need help customizing this portfolio or have questions about the code:

1. **Documentation**: Check this README for detailed instructions
2. **Code Comments**: The code is well-commented for easy understanding
3. **GitHub Issues**: Create an issue for bugs or feature requests
4. **Community**: Share your customized version with the community

---

**Built with passion for clean code and modern web technologies** ⚡

*Ready to showcase your embedded systems and IoT expertise to the world!* 🌟