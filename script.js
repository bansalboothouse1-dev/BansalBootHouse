// DOM Elements
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortProducts');
const productsGrid = document.getElementById('productsGrid');
const homeProducts = document.getElementById('homeProducts');
const loadMoreBtn = document.getElementById('loadMore');
const contactForm = document.getElementById('contactForm');
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const themeToggle = document.getElementById("themeToggle");
const themeLink = document.getElementById("themeStylesheet");

// Load saved theme on refresh
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    themeLink.href = savedTheme === "light" ? "style2.css" : "styles.css";
    themeToggle.innerHTML = savedTheme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode";
}

themeToggle.addEventListener("click", () => {
    if (themeLink.getAttribute("href") === "styles.css") {
        themeLink.href = "style2.css";
        themeToggle.innerHTML = "🌞 Light Mode";
        localStorage.setItem("theme", "light");
    } else {
        themeLink.href = "styles.css";
        themeToggle.innerHTML = "🌙 Dark Mode";
        localStorage.setItem("theme", "dark");
    }
});


// Sample Product Data
const products = [
    { id: 1, name: "Classic Leather Boots", category: "men", price: 500, originalPrice: 899, image: "https://assets.ajio.com/medias/sys_master/root/20240416/Azu6/661e84f105ac7d77bb0f3c7a/-473Wx593H-467229143-tan-MODEL.jpg", badge: "BESTSELLER", featured: true },
    { id: 2, name: "Women's Sandals", category: "women", price: 500, originalPrice: 799, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", badge: "NEW", featured: true },
    { id: 3, name: "Sports Running Shoes", category: "sports", price: 500, originalPrice: 999, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", badge: "", featured: true },
    { id: 4, name: "Men's Formal Shoes", category: "men", price: 500, originalPrice: 849, image: "https://m.media-amazon.com/images/I/81nBa+4b7eL._AC_UY1000_.jpg", badge: "", featured: false },
    { id: 5, name: "Women's Sneakers", category: "women", price: 500, originalPrice: 749, image: "https://redtape.com/cdn/shop/files/RLL0308A_1_14cd7d6d-cb2b-44cd-8fa7-7e5645e52645.jpg?v=1758879069", badge: "SALE", featured: false },
    { id: 6, name: "Gym Training Shoes", category: "sports", price: 500, originalPrice: 899, image: "https://www.verywellfit.com/thmb/lgBXTPIKLVuiGiKN8affEvMRlew=/fit-in/1500x2667/filters:no_upscale():max_bytes(150000):strip_icc()/vwt-tier-3-reebok-womens-nano-x4-training-shoes-ahuang-058-77b3f40b99ae4f92b6dd857028344a03.jpeg", badge: "", featured: false },
    { id: 7, name: "Kids School Shoes", category: "kids", price: 450, originalPrice: 699, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", badge: "NEW", featured: true },
    { id: 8, name: "Men's Sports Shoes", category: "men", price: 500, originalPrice: 999, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", badge: "SALE", featured: false },
    { id: 9, name: "Men's Casual Shoes", category: "men", price: 400, originalPrice: 649, image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", badge: "", featured: false },
    { id: 10, name: "Kids Casual Shoes", category: "kids", price: 400, originalPrice: 599, image: "https://img.joomcdn.net/566ddf03fa67df0e6252041f0c7d40dfb7084f76_original.jpeg", badge: "", featured: false },
    { id: 11, name: "Women's Casual Shoes", category: "women", price: 500, originalPrice: 799, image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/31026146/2024/9/28/b16e290c-914e-4c4c-b360-04acf8c39ac21727522292788-Roadster-Women-PU-Stylish-Casual-Lightweight-Comfort-Sneaker-1.jpg", badge: "BESTSELLER", featured: false },
    { id: 12, name: "Women's Formal Shoes", category: "women", price: 500, originalPrice: 849, image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/26330848/2023/12/9/5971d936-657e-4495-aea0-8deb2a0cd7271702105998419herbyinvictusformalshoesforwomen7.jpg", badge: "", featured: false }
];

let currentFilter = 'all';
let displayedProducts = 8;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme preference first
    loadThemePreference();
    
    // Initialize the rest
    initializePage();
    renderHomeProducts();
    renderAllProducts();
    setupEventListeners();
    
    // Add theme toggle button to DOM if it doesn't exist
    if (!themeToggleBtn) {
        createThemeToggleButton();
    }
});

// Create theme toggle button if not in HTML
function createThemeToggleButton() {
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeToggle';
    themeBtn.className = 'theme-toggle-btn';
    themeBtn.innerHTML = `
        <i id="themeIcon" class="fas fa-moon"></i>
        <span id="themeText" class="theme-text">Dark Mode</span>
    `;
    
    // Add to header near the cart icon
    const navIcon = document.querySelector('.nav-icon');
    if (navIcon) {
        navIcon.insertAdjacentElement('afterend', themeBtn);
    } else {
        // Fallback: add to end of nav
        const mainNav = document.querySelector('.main-nav');
        if (mainNav) {
            mainNav.appendChild(themeBtn);
        }
    }
    
    // Add event listener
    themeBtn.addEventListener('click', toggleTheme);
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    setTheme(savedTheme);
}

// Toggle between light and dark themes
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    saveThemePreference(newTheme);
}

// Set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update button text and icon
    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
    
    if (theme === 'dark') {
        // Switch to light mode button
        if (icon) icon.className = 'fas fa-moon';
        if (text) text.textContent = 'Dark Mode';
        // Load dark theme CSS
        loadCSS('styles.css');
    } else {
        // Switch to dark mode button
        if (icon) icon.className = 'fas fa-sun';
        if (text) text.textContent = 'Light Mode';
        // Load light theme CSS
        loadCSS('style2.css');
    }
}

// Load CSS dynamically
function loadCSS(filename) {
    // Remove existing theme stylesheet
    const existingLink = document.querySelector('link[data-theme="true"]');
    if (existingLink) {
        existingLink.remove();
    }
    
    // Create new link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filename;
    link.setAttribute('data-theme', 'true');
    document.head.appendChild(link);
}

// Save theme preference to localStorage
function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

// Initialize based on URL hash
function initializePage() {
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'products', 'about', 'contact'];
    
    if (hash && validPages.includes(hash)) {
        navigateToPage(hash);
    } else {
        navigateToPage('home');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Mobile navigation
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            navigateToPage(pageId);
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            navigateToPage(pageId);
        });
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-filter');
            displayedProducts = 8;
            renderAllProducts();
        });
    });
    
    // Sort products
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderAllProducts();
        });
    }
    
    // Load more products
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedProducts += 8;
            renderAllProducts();
            
            // Hide button if all products are displayed
            if (displayedProducts >= getFilteredProducts().length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Contact form submission with EmailJS
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init("g5wdUa6VHrB_wa4Yq");
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email
            emailjs.sendForm(
                "service_jeh7kz7",
                "template_qofm4y1",
                this
            ).then(
                function() {
                    // Success
                    const status = document.getElementById('status');
                    if (status) {
                        status.innerHTML = "✅ Message sent successfully! We'll contact you soon.";
                        status.className = 'form-feedback success';
                        status.style.display = 'block';
                    } else {
                        alert("✅ Message sent successfully! We'll contact you soon.");
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide status after 5 seconds
                    if (status) {
                        setTimeout(() => {
                            status.style.display = 'none';
                        }, 5000);
                    }
                },
                function(error) {
                    // Error
                    const status = document.getElementById('status');
                    if (status) {
                        status.innerHTML = "❌ Failed to send message. Please try again.";
                        status.className = 'form-feedback error';
                        status.style.display = 'block';
                    } else {
                        alert("❌ Failed to send message. Please try again.");
                    }
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    console.log(error);
                }
            );
        });
    }
    
    // Theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Handle hash changes (browser back/forward)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        const validPages = ['home', 'products', 'about', 'contact'];
        
        if (hash && validPages.includes(hash)) {
            navigateToPage(hash);
        }
    });
}

// Page navigation
function navigateToPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update URL hash
        window.location.hash = pageId;
        
        // Update active nav links
        updateActiveNav(pageId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Special handling for products page
        if (pageId === 'products') {
            displayedProducts = 8;
            renderAllProducts();
            if (loadMoreBtn) loadMoreBtn.style.display = 'block';
        }
    }
}

// Update active navigation
function updateActiveNav(pageId) {
    // Update desktop nav
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav
    mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
}

// Get filtered products based on current filter
function getFilteredProducts() {
    let filtered = products;
    
    if (currentFilter !== 'all') {
        filtered = products.filter(product => product.category === currentFilter);
    }
    
    // Apply sorting
    const sortValue = sortSelect ? sortSelect.value : 'featured';
    switch(sortValue) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        default:
            // Featured: show featured products first
            filtered.sort((a, b) => b.featured - a.featured);
            break;
    }
    
    return filtered;
}

// Render home page products (featured only)
function renderHomeProducts() {
    if (!homeProducts) return;
    
    const featuredProducts = products.filter(product => product.featured).slice(0, 4);
    
    homeProducts.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-cart btn-small">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add cart functionality
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const cartCount = document.querySelector('.cart-count');
            
            let count = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = count + 1;
            
            // Visual feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);
            
            console.log(`Added ${productName} to cart`);
        });
    });
}

// Render all products for products page
function renderAllProducts() {
    if (!productsGrid) return;
    
    const filteredProducts = getFilteredProducts();
    const productsToShow = filteredProducts.slice(0, displayedProducts);
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-cart btn-small">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update load more button visibility
    if (loadMoreBtn) {
        if (displayedProducts >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Add cart functionality
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const cartCount = document.querySelector('.cart-count');
            
            let count = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = count + 1;
            
            // Visual feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);
            
            console.log(`Added ${productName} to cart`);
        });
    });
}

// Header scroll effect
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
  
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
});

// Add CSS for theme toggle button
const themeToggleCSS = `
    .theme-toggle-btn {
        background: transparent;
        border: 2px solid var(--primary);
        color: var(--primary);
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: var(--transition);
        margin-left: 15px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .theme-toggle-btn:hover {
        background: var(--primary);
        color: var(--white);
        transform: translateY(-3px);
        box-shadow: var(--shadow);
    }
    
    .theme-text {
        font-size: 12px;
    }
    
    /* Mobile theme button */
    @media (max-width: 992px) {
        .theme-toggle-btn {
            margin: 15px auto;
            width: 80%;
            justify-content: center;
        }
        
        .mobile-contact .theme-toggle-btn {
            margin-top: 20px;
        }
    }
`;

// Inject theme toggle CSS
const style = document.createElement('style');
style.textContent = themeToggleCSS;
document.head.appendChild(style);

// Also add theme toggle to mobile menu
if (mobileMenu) {
    const mobileContact = mobileMenu.querySelector('.mobile-contact');
    if (mobileContact) {
        const mobileThemeBtn = document.createElement('button');
        mobileThemeBtn.className = 'theme-toggle-btn';
        mobileThemeBtn.id = 'mobileThemeToggle';
        mobileThemeBtn.innerHTML = `
            <i id="mobileThemeIcon" class="fas fa-moon"></i>
            <span id="mobileThemeText" class="theme-text">Dark Mode</span>
        `;
        
        mobileContact.appendChild(mobileThemeBtn);
        
        // Sync with main theme toggle
        mobileThemeBtn.addEventListener('click', () => {
            toggleTheme();
            // Update mobile button icon/text
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const mobileIcon = document.getElementById('mobileThemeIcon');
            const mobileText = document.getElementById('mobileThemeText');
            
            if (currentTheme === 'dark') {
                mobileIcon.className = 'fas fa-moon';
                mobileText.textContent = 'Dark Mode';
            } else {
                mobileIcon.className = 'fas fa-sun';
                mobileText.textContent = 'Light Mode';
            }
        });
    }
}