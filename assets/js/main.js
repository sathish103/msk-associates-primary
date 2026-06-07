/* ============================================================
   BMSR & Co - JavaScript Functionality
   ============================================================ */

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ─────────────────────────────────────────────────────────────
// Mobile Menu Toggle
// ───────────────────────────────────────────────────────────

const hamburger = $('#hamburger');
const mobileNav = $('#mobileNav');
const navLinks = $$('.nav a, .mobile-nav a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// ─────────────────────────────────────────────────────────────
// Smooth Scroll & Active Navigation
// ───────────────────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Spy - Active Navigation Highlighting
const scrollSpyLinks = $$('nav a, .mobile-nav a');
const sections = $$('section');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    scrollSpyLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ─────────────────────────────────────────────────────────────
// Hero Slider / Carousel
// ───────────────────────────────────────────────────────────

const slides = $$('.slide');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds per slide

function showSlide(index) {
    // Ensure index is within bounds
    currentSlide = (index + slides.length) % slides.length;
    
    // Hide all slides
    slides.forEach((slide) => {
        slide.style.opacity = '0';
        slide.classList.remove('active');
    });
    
    // Show current slide
    slides[currentSlide].style.opacity = '1';
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Initialize slider
if (slides.length > 0) {
    showSlide(0);
    
    // Auto-rotate slides
    setInterval(nextSlide, slideInterval);
    
    // Allow manual navigation (optional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') nextSlide();
        if (e.key === 'ArrowRight') showSlide(currentSlide - 1);
    });
}

// ─────────────────────────────────────────────────────────────
// Animated Counter
// ───────────────────────────────────────────────────────────

function animateCounter() {
    const counters = $$('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Trigger animation when counter section is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

animateCounter();

// ─────────────────────────────────────────────────────────────
// Scroll to Top Button
// ───────────────────────────────────────────────────────────

const scrollTopBtn = $('#scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ─────────────────────────────────────────────────────────────
// Chat Widget Functionality
// ───────────────────────────────────────────────────────────

const chatToggle = $('#chatToggle');
const chatWidget = $('#chatWidget');
const chatClose = $('#chatClose');
const chatMessages = $('#chatMessages');
const chatOptions = $$('.chat-option');
const chatInput = $('#chatInput');
const chatSend = $('#chatSend');

// Chat responses database
const chatResponses = {
    audit: {
        question: '📊 Audit Services',
        answer: 'We provide comprehensive audit and assurance services including Statutory Audits (IGAAP/INDAS), Internal Audits, Financial Statement Audits, and IFRS/US GAAP conversions. Would you like to schedule a consultation?'
    },
    tax: {
        question: '💰 Taxation Queries',
        answer: 'Our taxation services cover Direct & Indirect taxation compliance, Tax litigations, International taxation advisory, and Transfer Pricing documentation. We help minimize your tax liability while ensuring full compliance.'
    },
    corporate: {
        question: '🏢 Corporate Filings',
        answer: 'We handle all corporate and secretarial works including Annual filings for companies and LLPs, Charge creations, Share capital changes, and regulatory compliance under the Companies Act.'
    },
    contact: {
        question: '📞 Contact Info',
        answer: 'You can reach us at: 📱 +91 98765 43210 | ✉️ info@bmsrandco.com | 🏢 1234 Accounting Lane, Finance City. Business hours: Mon-Fri 9:00 AM - 6:00 PM, Sat 10:00 AM - 2:00 PM'
    },
    default: 'Thank you for your inquiry! How can we assist you further? Please select an option or type your question.'
};

// Toggle Chat Widget
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
        
        // Show options when chat opens (if hidden)
        const optionsContainer = document.querySelector('.chat-options');
        if (chatWidget.classList.contains('open') && optionsContainer) {
            optionsContainer.classList.remove('hidden');
        }
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('open');
        
        // Optional: Reset chat messages and show options again on next open
        // Uncomment below if you want fresh chat each time
        // setTimeout(() => {
        //     chatMessages.innerHTML = '<div class="chat-message bot-message"><p>Hello! 👋 How can we help you today?</p><small>We\'re available 24/7 to assist</small></div>';
        //     const optionsContainer = document.querySelector('.chat-options');
        //     if (optionsContainer) optionsContainer.classList.remove('hidden');
        // }, 300);
    });
}

// Chat Option Click Handler
chatOptions.forEach(option => {
    option.addEventListener('click', () => {
        const optionType = option.getAttribute('data-option');
        const response = chatResponses[optionType];
        
        // Add user message
        addChatMessage(response.question, 'user');
        
        // Add bot response after a short delay
        setTimeout(() => {
            addChatMessage(response.answer, 'bot');
        }, 500);
        
        // Hide chat options after selection
        const optionsContainer = document.querySelector('.chat-options');
        if (optionsContainer) {
            optionsContainer.classList.add('hidden');
        }
    });
});

// Service category scroll controls
const serviceScrollButtons = document.querySelectorAll('.service-scroll-btn');
serviceScrollButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.closest('.service-category');
        const grid = category ? category.querySelector('.services-grid') : null;
        if (!grid) return;

        const scrollAmount = Math.min(grid.clientWidth * 0.75, 320);
        if (button.classList.contains('prev')) {
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});

// Overlay side buttons (for grids that have inline overlay controls)
const overlayButtons = document.querySelectorAll('.service-overlay-btn');
overlayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.closest('.service-category');
        const grid = category ? category.querySelector('.services-grid') : null;
        if (!grid) return;
        const amount = Math.min(grid.clientWidth * 0.75, 360);
        if (btn.classList.contains('left')) grid.scrollBy({ left: -amount, behavior: 'smooth' });
        else grid.scrollBy({ left: amount, behavior: 'smooth' });
    });
});

// Add Chat Message to Chat Window
function addChatMessage(message, sender = 'bot') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const messageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `<p>${message}</p><small>${messageTime}</small>`;
    } else {
        messageDiv.innerHTML = `<p>${message}</p><small>${messageTime}</small>`;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send Message Handler
if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Hide options when user sends message
        const optionsContainer = document.querySelector('.chat-options');
        if (optionsContainer) {
            optionsContainer.classList.add('hidden');
        }
        
        // Bot auto-reply after 1 second
        setTimeout(() => {
            const autoReply = 'Thank you for your message! 📧 I\'ve provided you with basic information above. \n\nIf you need more detailed guidance or have specific requirements, please feel free to reach out to our team:\n\n📞 Call: +91 9493218465\n📧 Email: info@bmsrandco.com\n💬 WhatsApp: Available 24/7\n\nWe\'re here to help!';
            addChatMessage(autoReply, 'bot');
        }, 1000);
    }
}

// ─────────────────────────────────────────────────────────────
// Form Handling - Contact Form
// ───────────────────────────────────────────────────────────

const contactForm = $('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        // Log form data (in real scenario, send to server)
        console.log('Contact Form Submitted:', data);

        // Build mailto to open user's email client addressed to info@bmsrandco.com
        try {
            const subject = `Website Contact: ${data.name || data.fullname || 'Visitor'}`;
            let bodyLines = [];
            for (const [k, v] of Object.entries(data)) {
                if (v) bodyLines.push(`${k}: ${v}`);
            }
            bodyLines.push('');
            bodyLines.push('-- This message was composed from the website contact form.');
            const body = bodyLines.join('\n');
            const mailto = `mailto:info@bmsrandco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            // Open mail client in a new window/tab
            window.open(mailto, '_blank');
        } catch (err) {
            console.warn('Could not open mail client:', err);
        }

        // Show success message
        alert(`Thank you, ${data.name || data.fullname || 'Visitor'}! Your message has been prepared in your email client and will be sent to info@bmsrandco.com.`);

        // Reset form
        contactForm.reset();

        // Add chat notification
        setTimeout(() => {
            addChatMessage(`We prepared an email for you, ${data.name || data.fullname || 'Visitor'}! Our team will review it and contact you soon.`, 'bot');
        }, 500);
    });
}

// ─────────────────────────────────────────────────────────────
// Form Handling - Career Application Form
// ───────────────────────────────────────────────────────────

const careerForm = $('#careerForm');

if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(careerForm);
        const data = Object.fromEntries(formData);
        // Log form data (in real scenario, send to server)
        console.log('Career Application Submitted:', data);

        // Build mailto to open user's email client addressed to info@bmsrandco.com
        try {
            const subject = `Career Application: ${data.fullname || data.name || 'Applicant'}`;
            let bodyLines = [];
            for (const [k, v] of Object.entries(data)) {
                if (v) bodyLines.push(`${k}: ${v}`);
            }
            bodyLines.push('');
            bodyLines.push('Note: If you have a resume/CV, please attach it to the email before sending.');
            const body = bodyLines.join('\n');
            const mailto = `mailto:info@bmsrandco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailto, '_blank');
        } catch (err) {
            console.warn('Could not open mail client:', err);
        }

        // Show success message
        alert(`Thank you for applying, ${data.fullname || data.name || 'Applicant'}! An email to info@bmsrandco.com has been prepared; please attach your resume and send from your email client.`);

        // Reset form
        careerForm.reset();
    });
}

// ─────────────────────────────────────────────────────────────
// Intersection Observer for Animations
// ───────────────────────────────────────────────────────────

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and team members for animation
document.querySelectorAll('.service-card, .team-member').forEach(el => {
    observer.observe(el);
});

// ─────────────────────────────────────────────────────────────
// Get Consultation CTA Button
// ───────────────────────────────────────────────────────────

const ctaBtns = $$('.cta-btn, .btn-primary');

ctaBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Check if it's the "Get Consultation" button in header
        if (this.textContent.includes('Consultation')) {
            const contactSection = $('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ─────────────────────────────────────────────────────────────
// Service Card Interaction
// ───────────────────────────────────────────────────────────

const serviceCards = $$('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease-out';
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ─────────────────────────────────────────────────────────────
// Lazy Loading for Images
// ───────────────────────────────────────────────────────────

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ─────────────────────────────────────────────────────────────
// Initialize
// ───────────────────────────────────────────────────────────

console.log('BMSR & Co Website Initialized ✓');
console.log('All interactive features are now active!');

// Send initial chat greeting
window.addEventListener('load', () => {
    // Optional: Auto-show chat after page loads
    // Uncomment the line below to enable auto-chat popup
    // setTimeout(() => { chatWidget.classList.add('open'); }, 2000);
});

