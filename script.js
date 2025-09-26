// Configuration loader
let config = {};
let isConfigLoaded = false;

// Load configuration from config.json
async function loadConfig() {
    if (isConfigLoaded) return; // Prevent duplicate loading
    
    try {
        const response = await fetch('config.json');
        config = await response.json();
        isConfigLoaded = true;
        populateWebsite();
    } catch (error) {
        console.error('Error loading config:', error);
        // Fallback to default content if config fails to load
        populateWebsite();
    }
}

// Populate website with config data
function populateWebsite() {
    // Update personal information
    if (config.personal) {
        updateElement('.hero-title', `Hi, I'm <span class="highlight">${config.personal.name}</span>`);
        updateElement('.hero-subtitle', config.personal.title);
        updateElement('.hero-description', config.personal.description);
        updateElement('.nav-logo a', config.personal.name);
        
        // Update contact information
        if (config.personal.email) {
            updateContactItem('fas fa-envelope', config.personal.email);
        }
        if (config.personal.phone) {
            updateContactItem('fas fa-phone', config.personal.phone);
        }
        if (config.personal.location) {
            updateContactItem('fas fa-map-marker-alt', config.personal.location);
        }
        
        // Update profile image
        if (config.personal.profileImage) {
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                // Check if it's an image file or Font Awesome icon
                if (config.personal.profileImage.startsWith('images/') || config.personal.profileImage.startsWith('http')) {
                    // It's an image file
                    profileImage.innerHTML = `<img src="${config.personal.profileImage}" alt="Profile Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                } else {
                    // It's a Font Awesome icon
                    profileImage.innerHTML = `<i class="${config.personal.profileImage}"></i>`;
                }
            }
        }
    }
    
    // Update about section
    if (config.about) {
        updateElement('.about-text p:first-of-type', config.about.description1);
        updateElement('.about-text p:nth-of-type(2)', config.about.description2);
        
        // Update stats
        if (config.about.stats) {
            const statsContainer = document.querySelector('.about-stats');
            if (statsContainer) {
                statsContainer.innerHTML = '';
                config.about.stats.forEach(stat => {
                    const statElement = document.createElement('div');
                    statElement.className = 'stat';
                    statElement.innerHTML = `
                        <h3>${stat.number}</h3>
                        <p>${stat.label}</p>
                    `;
                    statsContainer.appendChild(statElement);
                });
            }
        }
    }
    
    // Update experience section
    if (config.experience) {
        const experienceContainer = document.querySelector('.experience-timeline');
        if (experienceContainer) {
            experienceContainer.innerHTML = '';
            config.experience.forEach((exp, index) => {
                const experienceElement = document.createElement('div');
                experienceElement.className = 'experience-item';
                
                const techHTML = exp.technologies.map(tech => `<span>${tech}</span>`).join('');
                
                experienceElement.innerHTML = `
                    <div class="experience-card">
                        <div class="experience-period">${exp.period}</div>
                        <h3 class="experience-title">${exp.title}</h3>
                        <div class="experience-company">${exp.company}</div>
                        <p class="experience-description">${exp.description}</p>
                        <div class="experience-tech">
                            ${techHTML}
                        </div>
                    </div>
                `;
                experienceContainer.appendChild(experienceElement);
            });
        }
    }
    
    // Update projects section
    if (config.projects) {
        const projectsContainer = document.querySelector('.projects-grid');
        if (projectsContainer) {
            projectsContainer.innerHTML = '';
            config.projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project-card';
                
                const techHTML = project.technologies.map(tech => `<span>${tech}</span>`).join('');
                
                projectElement.innerHTML = `
                    <div class="project-image">
                        <i class="${project.icon}"></i>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${techHTML}
                        </div>
                        <div class="project-links">
                            <a href="${project.liveDemo}" class="btn btn-outline">Live Demo</a>
                            <a href="${project.github}" class="btn btn-outline">GitHub</a>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectElement);
            });
        }
    }
    
    // Update social links
    if (config.social) {
        const socialContainer = document.querySelector('.social-links');
        if (socialContainer) {
            socialContainer.innerHTML = '';
            config.social.forEach(social => {
                const socialElement = document.createElement('a');
                socialElement.className = 'social-link';
                socialElement.href = social.url;
                socialElement.innerHTML = `<i class="${social.icon}"></i>`;
                socialContainer.appendChild(socialElement);
            });
        }
    }
    
    // Update contact section
    if (config.contact) {
        updateElement('.contact-info h3', config.contact.title);
        updateElement('.contact-info p', config.contact.description);
    }
    
    // Update footer
    if (config.footer) {
        updateElement('.footer p', `&copy; ${config.footer.copyright}`);
    }
}

// Helper function to update element content
function updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        // Clear the element completely first
        element.textContent = '';
        element.innerHTML = content;
    }
}

// Helper function to update contact items
function updateContactItem(iconClass, text) {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        if (icon && icon.className.includes(iconClass.split(' ')[1])) {
            const span = item.querySelector('span');
            if (span) {
                span.textContent = text;
            }
        }
    });
}

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.experience-card, .project-card, .stat, .contact-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully!', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Social links hover effect
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Add active class to navigation links
const addActiveClass = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', addActiveClass);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load configuration first
    loadConfig();
    
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});