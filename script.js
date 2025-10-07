// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update toggle button icon based on current theme
function updateThemeIcon() {
    const icon = themeToggleBtn.querySelector('i');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggleBtn.classList.add('dark-mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggleBtn.classList.remove('dark-mode');
    }
}

// Initialize theme icon
updateThemeIcon();

// Theme toggle functionality
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    // Show notification
    showNotification(`Switched to ${newTheme} mode`, 'success');
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

console.log('Portfolio items found:', portfolioItems.length); // Debug log - Now shows 9 items

// Initial filtering to hide excluded images on page load
function applyInitialFilter() {
    portfolioItems.forEach(item => {
        const excludeFromAll = item.getAttribute('data-exclude-all') === 'true';
        if (excludeFromAll) {
            item.style.display = 'none';
        }
    });
}

// Apply initial filter when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyInitialFilter);
} else {
    applyInitialFilter();
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const excludeFromAll = item.getAttribute('data-exclude-all') === 'true';
            
            if (filterValue === 'all') {
                // For "All" category, show items that don't have data-exclude-all="true"
                if (!excludeFromAll) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            } else if (itemCategory === filterValue) {
                // For specific categories, show all items in that category
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    
    if (window.scrollY > 100) {
        if (isDarkMode) {
            navbar.style.background = 'rgb(26, 26, 26)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgb(255, 255, 255)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        }
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Enhanced Lazy Loading with Intersection Observer
class LazyImageLoader {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all lazy images
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Progressive loading: first show with blur, then sharpen
            img.src = src;
            img.classList.add('loaded');
            
            // Add progressive loading effect
            setTimeout(() => {
                img.style.filter = 'blur(0)';
                img.style.transform = 'scale(1)';
            }, 50);
            
            // Remove placeholder with smooth transition
            const placeholder = img.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                setTimeout(() => {
                    placeholder.style.opacity = '0';
                    setTimeout(() => {
                        placeholder.remove();
                    }, 300);
                }, 100);
            }
        };

        imageLoader.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            img.classList.add('error');
            // Show error placeholder
            const placeholder = img.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.innerHTML = '<div style="color: var(--text-muted); font-size: 0.9rem;">Failed to load</div>';
            }
        };

        // Start loading
        imageLoader.src = src;
    }

    loadAllImages() {
        // Fallback: load all images immediately
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => {
            this.loadImage(img);
        });
    }
}

// Initialize lazy loading
const lazyLoader = new LazyImageLoader();

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Performance:', {
                        'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        'Page Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart)
                    });
                }
            }, 1000);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();

// Legacy image loading for non-lazy images (if any)
const portfolioImages = document.querySelectorAll('.portfolio-image img:not(.lazy-image)');
portfolioImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    
    // Fallback for already loaded images
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Intersection Observer for Portfolio Items
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

portfolioItems.forEach(item => {
    observer.observe(item);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Add to page
    document.body.appendChild(notification);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Hero Image Loading Optimization
function optimizeHeroImage() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    // Add loading class initially
    heroImage.classList.add('loading');

    // Preload the hero image
    const heroImg = new Image();
    heroImg.onload = () => {
        heroImage.classList.remove('loading');
        heroImage.classList.add('loaded');
    };
    heroImg.onerror = () => {
        console.warn('Failed to load hero image');
        heroImage.classList.remove('loading');
    };
    heroImg.src = 'IMG_4688_signed.jpg';
}

// Initialize hero image optimization
optimizeHeroImage();

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize lightbox functionality after page loads
    initializeLightbox();
});

// Add some CSS for the loaded state
const loadedStyles = document.createElement('style');
loadedStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadedStyles);

// Enhanced hover effects for portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll-triggered animations for portfolio elements
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.portfolio-filters, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Add CSS for scroll animations
const scrollAnimationStyles = document.createElement('style');
scrollAnimationStyles.textContent = `
    .portfolio-filters,
    .about-content,
    .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .portfolio-filters.animate,
    .about-content.animate,
    .contact-content.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(scrollAnimationStyles);

// Lightbox functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Re-select portfolio items to ensure they're available
    const currentPortfolioItems = document.querySelectorAll('.portfolio-item');
    console.log('Current portfolio items found:', currentPortfolioItems.length);
    
    // Debug: Check if lightbox elements are found
    console.log('Lightbox elements found:', {
        lightbox: lightbox,
        lightboxImg: lightboxImg,
        lightboxCaption: lightboxCaption,
        lightboxClose: lightboxClose
    });
    
    // Test lightbox functionality
    if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
        console.log('All lightbox elements found successfully');
        
        // Test lightbox open/close
        window.testLightbox = function() {
            lightboxImg.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop';
            lightboxCaption.textContent = 'Test Image';
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
            console.log('Test lightbox opened');
        };
        
        console.log('Test lightbox function available: window.testLightbox()');
        
        // Open lightbox when portfolio item is clicked
        currentPortfolioItems.forEach((item, index) => {
            console.log(`Adding click listener to portfolio item ${index + 1}`);
            item.addEventListener('click', () => {
                console.log(`Portfolio item ${index + 1} clicked!`); // Debug log
                const img = item.querySelector('img');
                const caption = item.querySelector('h3').textContent;
                
                console.log('Image src:', img.src); // Debug log
                console.log('Caption:', caption); // Debug log
                
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = caption;
                
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                console.log('Lightbox should be visible now'); // Debug log
            });
        });
        
        // Close lightbox when close button is clicked
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
        
        // Close lightbox function
        function closeLightbox() {
            lightbox.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
            console.log('Lightbox closed'); // Debug log
        }
        
    } else {
        console.error('Some lightbox elements not found!');
    }
}
