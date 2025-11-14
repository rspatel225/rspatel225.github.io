// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    const errorElement = nameInput.parentElement.querySelector('.error-message');
    
    if (name === '') {
        nameInput.classList.add('error');
        errorElement.textContent = 'Name is required';
        return false;
    } else if (name.length < 2) {
        nameInput.classList.add('error');
        errorElement.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        nameInput.classList.remove('error');
        errorElement.textContent = '';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const errorElement = emailInput.parentElement.querySelector('.error-message');
    
    if (email === '') {
        emailInput.classList.add('error');
        errorElement.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        errorElement.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailInput.classList.remove('error');
        errorElement.textContent = '';
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    const errorElement = messageInput.parentElement.querySelector('.error-message');
    
    if (message === '') {
        messageInput.classList.add('error');
        errorElement.textContent = 'Message is required';
        return false;
    } else if (message.length < 10) {
        messageInput.classList.add('error');
        errorElement.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        messageInput.classList.remove('error');
        errorElement.textContent = '';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        validateMessage();
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    // If all fields are valid, show success message
    if (isNameValid && isEmailValid && isMessageValid) {
        const successMessage = document.querySelector('.form-success');
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Remove any error classes
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        messageInput.classList.remove('error');
        
        // Clear error messages
        document.querySelectorAll('.error-message').forEach(elem => {
            elem.textContent = '';
        });
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and stats
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const stats = document.querySelectorAll('.stat');
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(stat);
    });
});

// Smooth scroll to top for hero CTA button
document.querySelector('.hero .btn-primary').addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.querySelector('#contact');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = targetSection.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

