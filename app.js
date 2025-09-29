// Bizorra E-commerce Application JavaScript

// Application data
const appData = {
  company: {
    name: "Bizorra",
    tagline: "Premium E-commerce Experience",
    description: "Discover premium quality products with exceptional design and unmatched value",
    email: "contact@bizorra.com",
    phone: "+1 (555) 123-4567",
    whatsapp: "+1 (555) 123-4567",
    address: "123 Commerce Street, Business District, City 12345",
    hours: "Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM",
    founded: "2020"
  },
  products: [
    {
      id: "prod-001",
      name: "Premium Wireless Headphones",
      price: 199.99,
      salePrice: 149.99,
      image: "🎧",
      category: "Audio",
      rating: 4.8,
      reviews: 156,
      description: "High-quality wireless headphones with active noise cancellation and premium sound quality",
      features: ["Noise Cancellation", "40-hour Battery", "Bluetooth 5.0", "Premium Materials"],
      colors: ["Black", "White", "Silver"],
      stock: "In Stock"
    },
    {
      id: "prod-002", 
      name: "Smart Fitness Watch",
      price: 299.99,
      salePrice: 249.99,
      image: "⌚",
      category: "Wearables",
      rating: 4.6,
      reviews: 203,
      description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and health insights",
      features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"],
      colors: ["Black", "Rose Gold", "Silver"],
      stock: "In Stock"
    },
    {
      id: "prod-003",
      name: "Wireless Charging Station",
      price: 79.99,
      salePrice: 59.99,
      image: "🔌", 
      category: "Accessories",
      rating: 4.5,
      reviews: 89,
      description: "Fast wireless charging station compatible with multiple devices simultaneously",
      features: ["Fast Charging", "Multi-Device", "LED Indicators", "Safe Charging"],
      colors: ["Black", "White"],
      stock: "In Stock"
    },
    {
      id: "prod-004",
      name: "Portable Bluetooth Speaker",
      price: 129.99,
      salePrice: 99.99,
      image: "🔊",
      category: "Audio", 
      rating: 4.7,
      reviews: 124,
      description: "Portable speaker with 360-degree sound, waterproof design, and long battery life",
      features: ["360° Sound", "Waterproof", "12-hour Battery", "Voice Assistant"],
      colors: ["Black", "Blue", "Red"],
      stock: "In Stock"
    },
    {
      id: "prod-005",
      name: "USB-C Hub Pro",
      price: 89.99,
      salePrice: 69.99,
      image: "💻",
      category: "Accessories",
      rating: 4.4,
      reviews: 67,
      description: "Multi-port USB-C hub with HDMI, USB 3.0, and fast charging for laptops and tablets",
      features: ["HDMI Output", "USB 3.0 Ports", "Fast Charging", "Compact Design"],
      colors: ["Space Gray", "Silver"],
      stock: "In Stock"
    },
    {
      id: "prod-006",
      name: "Smart Home Camera",
      price: 159.99,
      salePrice: 119.99,
      image: "📷",
      category: "Smart Home",
      rating: 4.6,
      reviews: 145,
      description: "HD security camera with night vision, motion detection, and smartphone alerts",
      features: ["HD Video", "Night Vision", "Motion Detection", "Cloud Storage"],
      colors: ["White", "Black"],
      stock: "Limited Stock"
    }
  ]
};

// Application state
let cart = [];
let currentSection = 'home';
let filteredProducts = [...appData.products];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupCartFunctionality();
  setupContactForm();
  setupShopFilters();
  renderFeaturedProducts();
  renderShopProducts();
  loadCartFromStorage();
  updateCartDisplay();
}

// Navigation functionality
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('href').substring(1);
      showSection(targetSection);
      
      // Update active nav link
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Handle hero section buttons
  const heroButtons = document.querySelectorAll('.hero-actions .btn');
  heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('href').substring(1);
      showSection(targetSection);
      
      // Update nav
      navLinks.forEach(nav => nav.classList.remove('active'));
      document.querySelector(`[href="#${targetSection}"]`).classList.add('active');
    });
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove('hidden');
    targetSection.classList.add('fade-in');
    currentSection = sectionId;
  }
}

// Product rendering
function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  const featuredProducts = appData.products.slice(0, 4);
  
  container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function renderShopProducts() {
  const container = document.getElementById('shopProducts');
  container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
  const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">${product.image}</div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="product-stars">${stars}</span>
          <span class="product-reviews">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="product-sale-price">$${product.salePrice}</span>
          ${product.price !== product.salePrice ? `<span class="product-original-price">$${product.price}</span>` : ''}
        </div>
        <div class="product-stock ${product.stock === 'In Stock' ? 'in-stock' : 'limited-stock'}">${product.stock}</div>
        <div class="product-actions">
          <button class="btn btn--primary btn-add-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

// Shopping cart functionality
function setupCartFunctionality() {
  const cartToggle = document.getElementById('cartToggle');
  const cartModal = document.getElementById('cartModal');
  const cartClose = document.getElementById('cartClose');
  const cartBackdrop = document.getElementById('cartBackdrop');
  
  cartToggle.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
  });
  
  cartClose.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
  
  cartBackdrop.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
}

function addToCart(productId) {
  const product = appData.products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  saveCartToStorage();
  showCartAnimation();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
  saveCartToStorage();
}

function updateCartQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      updateCartDisplay();
      saveCartToStorage();
    }
  }
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');
  const cartTotal = document.getElementById('cartTotal');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartCount.textContent = totalItems;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartSummary.classList.add('hidden');
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="product-image" style="width: 60px; height: 60px; font-size: 24px;">${item.image}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
        </div>
        <div class="cart-item-controls">
          <button class="quantity-control" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-control" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
          <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    `).join('');
    
    cartSummary.classList.remove('hidden');
    cartTotal.textContent = totalPrice.toFixed(2);
  }
}

function showCartAnimation() {
  const cartToggle = document.getElementById('cartToggle');
  cartToggle.classList.add('cart-add-animation');
  setTimeout(() => {
    cartToggle.classList.remove('cart-add-animation');
  }, 300);
}

function saveCartToStorage() {
  try {
    sessionStorage.setItem('bizorraCart', JSON.stringify(cart));
  } catch (e) {
    // Fallback if sessionStorage is not available
    console.log('Cart saved locally');
  }
}

function loadCartFromStorage() {
  try {
    const savedCart = sessionStorage.getItem('bizorraCart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    // Fallback if sessionStorage is not available
    console.log('Using local cart');
  }
}

// Shop filters functionality
function setupShopFilters() {
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');
  const searchFilter = document.getElementById('searchFilter');
  
  categoryFilter.addEventListener('change', applyFilters);
  sortFilter.addEventListener('change', applyFilters);
  searchFilter.addEventListener('input', applyFilters);
}

function applyFilters() {
  const categoryFilter = document.getElementById('categoryFilter').value;
  const sortFilter = document.getElementById('sortFilter').value;
  const searchFilter = document.getElementById('searchFilter').value.toLowerCase();
  
  // Start with all products
  filteredProducts = [...appData.products];
  
  // Apply category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
  }
  
  // Apply search filter
  if (searchFilter) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchFilter) ||
      product.description.toLowerCase().includes(searchFilter) ||
      product.category.toLowerCase().includes(searchFilter)
    );
  }
  
  // Apply sorting
  switch (sortFilter) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.salePrice - b.salePrice);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.salePrice - a.salePrice);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      // Keep original order
      break;
  }
  
  renderShopProducts();
}

// Contact form functionality
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', handleContactFormSubmit);
  
  // Add real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';
  
  // Clear previous error
  clearFieldError(field);
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  
  // Specific field validation
  switch (fieldName) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      break;
      
    case 'phone':
      const phoneRegex = /^[\+]?[1-9]?[0-9]{7,15}$/;
      if (value && !phoneRegex.test(value.replace(/\s|-|\(|\)/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
      break;
      
    case 'message':
      if (value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
      }
      break;
  }
  
  if (!isValid) {
    showFieldError(field, errorMessage);
  }
  
  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');
  const errorElement = document.getElementById(field.name + 'Error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

function clearFieldError(field) {
  field.classList.remove('error');
  const errorElement = document.getElementById(field.name + 'Error');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }
}

function validateContactForm() {
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function handleContactFormSubmit(e) {
  e.preventDefault();
  
  if (!validateContactForm()) {
    showFormMessage('Please check the highlighted fields and try again.', 'error');
    return;
  }
  
  // Simulate form submission
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    // Reset form
    e.target.reset();
    
    // Clear any existing errors
    const inputs = e.target.querySelectorAll('input, textarea');
    inputs.forEach(input => clearFieldError(input));
    
    // Show success message
    showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
    
    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1500);
}

function showFormMessage(message, type) {
  const messagesContainer = document.getElementById('formMessages');
  messagesContainer.innerHTML = `<div class="${type}">${message}</div>`;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    messagesContainer.innerHTML = '';
  }, 5000);
}

// Category card functionality
document.addEventListener('click', function(e) {
  if (e.target.closest('.category-card')) {
    const categoryCard = e.target.closest('.category-card');
    const categoryName = categoryCard.querySelector('h3').textContent;
    
    // Navigate to shop section
    showSection('shop');
    
    // Update nav
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    document.querySelector('[href="#shop"]').classList.add('active');
    
    // Set category filter
    document.getElementById('categoryFilter').value = categoryName;
    applyFilters();
  }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      showSection(targetId);
      
      // Update navigation
      document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
      const navLink = document.querySelector(`[href="#${targetId}"]`);
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  }
});

// Utility functions
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);
  
  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  // Update any responsive elements if needed
  updateCartDisplay();
});

// Prevent form submission on Enter key for search
document.getElementById('searchFilter')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    applyFilters();
  }
});

// Initialize theme handling (optional)
function initializeTheme() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-color-scheme', 'dark');
  } else {
    document.documentElement.setAttribute('data-color-scheme', 'light');
  }
  
  // Listen for changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
      document.documentElement.setAttribute('data-color-scheme', 'light');
    }
  });
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Export functions for global access (if needed)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;

console.log('Bizorra e-commerce application initialized successfully!');