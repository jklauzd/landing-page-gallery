// PETLUXE Premium E-Commerce - Core Logic

// --- Global State ---
let products = [
    {
        id: 1,
        name: "Ração Natural Premium Orgânica",
        price: 189.90,
        category: "alimentacao",
        petType: "cão",
        img: "assets/product-dog-food.jpg",
        rating: 4.8,
        reviewsCount: 124,
        description: "Alimento super premium produzido com ingredientes 100% naturais selecionados, livre de transgênicos, corantes ou conservantes químicos. Rica em ômegas e minerais.",
        variants: ["1.5kg", "5kg", "10kg"]
    },
    {
        id: 2,
        name: "Cama Anatômica Escandinava",
        price: 289.00,
        category: "conforto",
        petType: "gato",
        img: "assets/product-cat-bed.jpg",
        rating: 4.9,
        reviewsCount: 86,
        description: "Desenvolvida com espuma ortopédica viscoelástica de alta densidade que se adapta ao corpo do pet, reduzindo pontos de pressão. Capa de linho lavável de alto padrão.",
        variants: ["Pequena", "Média", "Grande"]
    },
    {
        id: 3,
        name: "Brinquedo de Encaixe Inteligente",
        price: 79.90,
        category: "brinquedos",
        petType: "cão",
        img: "assets/product-smart-toy.jpg",
        rating: 4.7,
        reviewsCount: 54,
        description: "Estimulador cognitivo interativo feito de madeira certificada e corda de algodão orgânico. Ideal para diminuir a ansiedade e exercitar a mente do seu cão.",
        variants: ["Único"]
    },
    {
        id: 4,
        name: "Arranhador Modular Felino Luxo",
        price: 450.00,
        category: "conforto",
        petType: "gato",
        img: "assets/product-cat-tree.jpg",
        rating: 5.0,
        reviewsCount: 32,
        description: "Arranhador e torre modular de design contemporâneo que complementa a decoração da casa. Feito com madeira maciça de reflorestamento, sisal premium e feltro macio.",
        variants: ["Padrão"]
    },
    {
        id: 5,
        name: "Coleira de Couro Clássica Ouro",
        price: 120.00,
        category: "acessorios",
        petType: "cão",
        img: "assets/product-leather-collar.jpg",
        rating: 4.6,
        reviewsCount: 98,
        description: "Confeccionada artesanalmente com couro legítimo premium de curtimento vegetal. Metais banhados em latão escovado com alta resistência e argola integrada.",
        variants: ["P", "M", "G"]
    },
    {
        id: 6,
        name: "Shampoo Pet Orgânico Camomila",
        price: 65.00,
        category: "higiene",
        petType: "gato",
        img: "assets/product-pet-shampoo.jpg",
        rating: 4.8,
        reviewsCount: 112,
        description: "Fórmula vegana e hipoalergênica com extrato de camomila e aveia coloidal. Promove limpeza profunda enquanto hidrata a pele sensível do pet, deixando uma fragrância suave.",
        variants: ["300ml"]
    }
];

let cart = JSON.parse(localStorage.getItem("petluxe_cart")) || [];
let appointments = JSON.parse(localStorage.getItem("petluxe_appointments")) || [];
let orders = JSON.parse(localStorage.getItem("petluxe_orders")) || [];
let pets = JSON.parse(localStorage.getItem("petluxe_pets")) || [
    { name: "Zeus", breed: "Golden Retriever", age: 3 },
    { name: "Mingau", breed: "Persa", age: 2 }
];
let currentTheme = localStorage.getItem("petluxe_theme") || "light";

// Quiz Wizard State
let quizAnswers = {
    "pet-type": "",
    "pet-size": "",
    "pet-interest": "",
    "pet-name": ""
};
let currentQuizStep = 1;

// Service Booking State
let selectedService = "banho";
let servicePrice = 80;
let selectedSlot = "";
let availableSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

// Checkout Flow State
let paymentMethod = "card";
let finalShippingCost = 0;

// Current detail modal product
let currentDetailProduct = null;
let currentDetailVariant = "";

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Theme configuration
    setTheme(currentTheme);
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }

    // Scroll Navbar Effect
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Hamburger Menu Toggle (single button: menu ↔ close icon)
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const navBackdrop = document.getElementById("nav-backdrop");
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            setMobileNavOpen(!document.body.classList.contains("nav-open"));
        });
    }
    if (navBackdrop) {
        navBackdrop.addEventListener("click", () => setMobileNavOpen(false));
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMobileNavOpen(false);
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) setMobileNavOpen(false);
    });

    // Cart Drawer actions
    const cartToggleBtn = document.getElementById("cart-toggle-btn");
    const cartCloseBtn = document.getElementById("cart-close-btn");
    const drawerOverlay = document.getElementById("drawer-overlay");
    
    if (cartToggleBtn) cartToggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCartDrawer();
    });
    if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener("click", closeCartDrawer);

    // Initial render routines
    renderProductsList(products);
    updateCartDisplay();
    generateTimeSlots();
    renderDashboard();
    
    // Initialize Lucide Icons
    lucide.createIcons();
});

// --- Theme Management ---
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("petluxe_theme", theme);
    currentTheme = theme;
    
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
        if (theme === "dark") {
            themeIcon.setAttribute("data-lucide", "sun");
        } else {
            themeIcon.setAttribute("data-lucide", "moon");
        }
        lucide.createIcons();
    }
}

function toggleTheme() {
    setTheme(currentTheme === "light" ? "dark" : "light");
}

function setBodyScrollLocked(locked) {
    document.body.classList.toggle("scroll-locked", locked);
}

function setMobileNavOpen(open) {
    document.body.classList.toggle("nav-open", open);
    const backdrop = document.getElementById("nav-backdrop");
    const toggle = document.getElementById("menu-toggle-btn");
    const icon = document.getElementById("menu-toggle-icon");
    if (backdrop) {
        if (open) backdrop.removeAttribute("hidden");
        else backdrop.setAttribute("hidden", "");
    }
    if (toggle) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Fechar menu" : "Menu");
    }
    // Swap the single Lucide icon (menu ↔ x) so only one control shows
    if (toggle) {
        toggle.innerHTML = open
            ? '<i data-lucide="x" id="menu-toggle-icon"></i>'
            : '<i data-lucide="menu" id="menu-toggle-icon"></i>';
        if (window.lucide) lucide.createIcons();
    }
    // Only lock scroll for nav if cart/modal aren't open
    if (!document.getElementById("cart-drawer")?.classList.contains("open") &&
        !document.querySelector(".modal-overlay.open")) {
        setBodyScrollLocked(open);
    }
}

// --- Section navigation (single-page scroll) ---
function navigateToSection(viewId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Keep all sections visible; mark the target for nav highlight only
    document.querySelectorAll(".page-view").forEach(view => {
        view.classList.remove("active");
    });
    
    const selectedView = document.getElementById(`${viewId}-view`);
    if (selectedView) {
        selectedView.classList.add("active");
    }

    // Manage nav-link states
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("onclick") && link.getAttribute("onclick").includes(`'${viewId}'`)) {
            link.classList.add("active");
        }
    });

    // Close mobile menu if open
    setMobileNavOpen(false);

    // Special view triggers
    if (viewId === "dashboard") {
        renderDashboard();
    }

    // Smooth-scroll to section (account for fixed navbar)
    if (selectedView) {
        const nav = document.getElementById("navbar");
        const offset = (nav ? nav.offsetHeight : 80) + 8;
        const top = selectedView.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
    return false;
}

// --- Cart Drawer State Controllers ---
function openCartDrawer() {
    setMobileNavOpen(false);
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("drawer-overlay").classList.add("open");
    setBodyScrollLocked(true);
}

function closeCartDrawer() {
    document.getElementById("cart-drawer").classList.remove("open");
    document.getElementById("drawer-overlay").classList.remove("open");
    if (!document.body.classList.contains("nav-open") &&
        !document.querySelector(".modal-overlay.open")) {
        setBodyScrollLocked(false);
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById("cart-items-list");
    const cartCounter = document.getElementById("cart-counter");
    
    // Update badge counter
    const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounter.textContent = totalItemsCount;

    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="cart-empty-message">
                <i data-lucide="shopping-bag"></i>
                <p>Seu carrinho está vazio.</p>
                <button class="btn btn-primary" onclick="closeCartDrawer(); navigateToSection('catalog')">Explorar Produtos</button>
            </div>
        `;
        lucide.createIcons();
        updateCartTotals(0);
        return;
    }

    // Render cart items
    let cartHtml = "";
    cart.forEach((item, index) => {
        cartHtml += `
            <div class="cart-item">
                <img src="${item.product.img}" alt="${item.product.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.product.name}</div>
                    <div class="cart-item-meta">Tam/Vol: ${item.variant}</div>
                    <div class="cart-item-price">R$ ${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="adjustCartQty(${index}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="adjustCartQty(${index}, 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeCartItem(${index})" aria-label="Remover item">
                        <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>
            </div>
        `;
    });
    cartList.innerHTML = cartHtml;
    lucide.createIcons();

    // Calculate sum
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    updateCartTotals(subtotal);
}

function updateCartTotals(subtotal) {
    const shipping = subtotal > 150 || subtotal === 0 ? 0 : 25;
    const total = subtotal + shipping;
    
    document.getElementById("cart-subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById("cart-shipping").textContent = shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`;
    document.getElementById("cart-total").textContent = `R$ ${total.toFixed(2)}`;

    // Update checkout summary panels as well
    const chkSubtotalEl = document.getElementById("chk-subtotal");
    const chkShippingEl = document.getElementById("chk-shipping");
    const chkTotalEl = document.getElementById("chk-total");
    
    if (chkSubtotalEl) chkSubtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (chkShippingEl) chkShippingEl.textContent = shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`;
    if (chkTotalEl) chkTotalEl.textContent = `R$ ${total.toFixed(2)}`;
}

function adjustCartQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartDisplay();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

function addToCart(productId, quantity = 1, variant = "") {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selectedVariant = variant || product.variants[0];

    // Check if matching item is in cart
    const existingItem = cart.find(item => item.product.id === productId && item.variant === selectedVariant);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            product: product,
            quantity: quantity,
            variant: selectedVariant
        });
    }

    saveCart();
    updateCartDisplay();
    openCartDrawer();
}

function saveCart() {
    localStorage.setItem("petluxe_cart", JSON.stringify(cart));
}

// --- Product Catalog Rendering & Filtering ---
function renderProductsList(productsArray) {
    const grid = document.getElementById("products-grid");
    const countText = document.getElementById("catalog-count-text");
    
    if (!grid) return;
    
    countText.textContent = `Exibindo ${productsArray.length} ${productsArray.length === 1 ? 'produto' : 'produtos'}`;

    if (productsArray.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i data-lucide="info" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
                <p>Nenhum produto atende aos filtros selecionados.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    let html = "";
    productsArray.forEach(p => {
        html += `
            <div class="product-card">
                <span class="product-badge">Novidade</span>
                <button class="product-fav-btn" onclick="toggleFavorite(${p.id}, this)" aria-label="Favoritar">
                    <i data-lucide="heart" style="width: 18px; height: 18px;"></i>
                </button>
                <div class="product-image-container" onclick="openProductDetail(${p.id})">
                    <img src="${p.img}" alt="${p.name}" class="product-img">
                </div>
                <div class="product-info">
                    <span class="product-category">${p.category}</span>
                    <h3 class="product-name" onclick="openProductDetail(${p.id})">${p.name}</h3>
                    <div class="product-rating">
                        <i data-lucide="star" style="width: 14px; height: 14px; fill: #f59e0b; stroke: none;"></i>
                        <strong>${p.rating}</strong>
                        <span>(${p.reviewsCount} reviews)</span>
                    </div>
                    <div class="product-card-footer">
                        <div class="product-price">R$ ${p.price.toFixed(2)}</div>
                        <button class="btn btn-primary" onclick="addToCart(${p.id}, 1)" style="padding: 8px 16px; font-size: 0.85rem;">
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
    lucide.createIcons();
}

function filterProducts() {
    const searchText = document.getElementById("catalog-search").value.toLowerCase();
    
    // Collect active category filters
    const activeCategories = Array.from(document.querySelectorAll(".category-filter:checked")).map(cb => cb.value);
    
    // Collect active pet type filters
    const activePetTypes = Array.from(document.querySelectorAll(".pet-type-filter:checked")).map(cb => cb.value);
    
    // Collect price filter
    const activePriceRange = document.querySelector("input[name='price-filter']:checked").value;

    // Filter array
    let filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchText) || p.description.toLowerCase().includes(searchText);
        const matchesCategory = activeCategories.length === 0 || activeCategories.includes(p.category);
        const matchesPet = activePetTypes.length === 0 || activePetTypes.includes(p.petType);
        
        let matchesPrice = true;
        if (activePriceRange === "0-100") {
            matchesPrice = p.price <= 100;
        } else if (activePriceRange === "100-250") {
            matchesPrice = p.price > 100 && p.price <= 250;
        } else if (activePriceRange === "250+") {
            matchesPrice = p.price > 250;
        }

        return matchesSearch && matchesCategory && matchesPet && matchesPrice;
    });

    // Sort array
    const sortVal = document.getElementById("sort-select").value;
    if (sortVal === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProductsList(filtered);
}

function filterByCategory(categoryName) {
    navigateToSection("catalog");
    
    // Uncheck other category checkboxes
    document.querySelectorAll(".category-filter").forEach(cb => {
        cb.checked = false;
        if (cb.value === categoryName || (categoryName === 'cão' && cb.value === 'cão') || (categoryName === 'gato' && cb.value === 'gato')) {
            cb.checked = true;
        }
    });

    document.querySelectorAll(".pet-type-filter").forEach(cb => {
        cb.checked = false;
        if (cb.value === categoryName) {
            cb.checked = true;
        }
    });

    filterProducts();
}

function toggleFavorite(productId, btnEl) {
    btnEl.classList.toggle("active");
    const icon = btnEl.querySelector("i");
    if (btnEl.classList.contains("active")) {
        icon.style.fill = "#ef4444";
        icon.style.stroke = "#ef4444";
    } else {
        icon.style.fill = "none";
        icon.style.stroke = "currentColor";
    }
}

// --- Product Detail Modal ---
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentDetailProduct = product;
    currentDetailVariant = product.variants[0];

    const modalContent = document.getElementById("detail-modal-content");
    modalContent.innerHTML = `
        <!-- Coluna Imagem -->
        <div class="detail-media">
            <img src="${product.img}" alt="${product.name}">
        </div>
        <!-- Coluna Info -->
        <div class="detail-info">
            <span class="product-category">${product.category}</span>
            <h2 style="font-size: 1.8rem;">${product.name}</h2>
            <div class="product-rating">
                <i data-lucide="star" style="width: 16px; height: 16px; fill: #f59e0b; stroke: none;"></i>
                <strong>${product.rating}</strong>
                <span>(${product.reviewsCount} avaliações de clientes)</span>
            </div>
            
            <div class="product-price" style="font-size: 1.75rem; margin: 10px 0;">R$ ${product.price.toFixed(2)}</div>
            
            <p style="color: var(--text-muted);">${product.description}</p>
            
            <div class="detail-variants">
                <label>Opção Disponível:</label>
                <div class="variants-options">
                    ${product.variants.map((v, i) => `
                        <button class="variant-btn ${i === 0 ? 'selected' : ''}" onclick="selectDetailVariant('${v}', this)">
                            ${v}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="display: flex; gap: 16px; margin-top: 20px;">
                <div class="qty-control" style="height: 48px;">
                    <button class="qty-btn" onclick="adjustDetailQty(-1)" style="width: 40px; height: 100%;">-</button>
                    <span class="qty-val" id="detail-qty" style="width: 40px;">1</span>
                    <button class="qty-btn" onclick="adjustDetailQty(1)" style="width: 40px; height: 100%;">+</button>
                </div>
                <button class="btn btn-primary" onclick="addDetailToCart()" style="flex-grow: 1; height: 48px;">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    openModal("detail-modal");
    lucide.createIcons();
}

function selectDetailVariant(variant, btnEl) {
    currentDetailVariant = variant;
    btnEl.parentNode.querySelectorAll(".variant-btn").forEach(btn => btn.classList.remove("selected"));
    btnEl.classList.add("selected");
}

function adjustDetailQty(change) {
    const qtyVal = document.getElementById("detail-qty");
    let currentQty = parseInt(qtyVal.textContent);
    currentQty += change;
    if (currentQty < 1) currentQty = 1;
    qtyVal.textContent = currentQty;
}

function addDetailToCart() {
    const qty = parseInt(document.getElementById("detail-qty").textContent);
    addToCart(currentDetailProduct.id, qty, currentDetailVariant);
    closeModal("detail-modal");
}

// --- Modals Global Controllers ---
function openModal(modalId) {
    setMobileNavOpen(false);
    document.getElementById(modalId).classList.add("open");
    setBodyScrollLocked(true);
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("open");
    if (!document.getElementById("cart-drawer")?.classList.contains("open") &&
        !document.body.classList.contains("nav-open") &&
        !document.querySelector(".modal-overlay.open")) {
        setBodyScrollLocked(false);
    }
}

// --- Pet Box Configurator Wizard (Quiz) ---
function selectQuizOption(category, value, btnEl) {
    quizAnswers[category] = value;
    
    // Handle visual selection
    btnEl.parentNode.querySelectorAll(".quiz-opt-btn").forEach(btn => {
        btn.classList.remove("selected");
    });
    btnEl.classList.add("selected");

    // Enable next button
    document.getElementById("quiz-next-btn").removeAttribute("disabled");
}

function checkQuizNameInput() {
    const nameInput = document.getElementById("quiz-pet-name").value.trim();
    quizAnswers["pet-name"] = nameInput;
    
    const nextBtn = document.getElementById("quiz-next-btn");
    if (nameInput.length > 0) {
        nextBtn.removeAttribute("disabled");
    } else {
        nextBtn.setAttribute("disabled", "true");
    }
}

function nextQuizStep() {
    if (currentQuizStep === 4) {
        generateRecommendation();
    }

    if (currentQuizStep < 5) {
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.remove("active");
        currentQuizStep++;
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.add("active");
        
        // Update nodes visually
        document.querySelector(`.progress-node[data-step="${currentQuizStep}"]`).classList.add("active");
        document.querySelector(`.progress-node[data-step="${currentQuizStep-1}"]`).classList.remove("active");
        document.querySelector(`.progress-node[data-step="${currentQuizStep-1}"]`).classList.add("completed");
        
        // Update progress bar width
        document.getElementById("quiz-progress-bar").style.width = `${(currentQuizStep - 1) * 25}%`;

        // Check if next button should be enabled
        updateQuizFooterButtons();
    }
}

function prevQuizStep() {
    if (currentQuizStep > 1) {
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.remove("active");
        
        // Update nodes visually
        document.querySelector(`.progress-node[data-step="${currentQuizStep}"]`).classList.remove("active");
        document.querySelector(`.progress-node[data-step="${currentQuizStep-1}"]`).classList.remove("completed");
        document.querySelector(`.progress-node[data-step="${currentQuizStep-1}"]`).classList.add("active");
        
        currentQuizStep--;
        document.getElementById(`quiz-step-${currentQuizStep}`).classList.add("active");
        
        // Update progress bar width
        document.getElementById("quiz-progress-bar").style.width = `${(currentQuizStep - 1) * 25}%`;

        updateQuizFooterButtons();
    }
}

function updateQuizFooterButtons() {
    const prevBtn = document.getElementById("quiz-prev-btn");
    const nextBtn = document.getElementById("quiz-next-btn");

    if (currentQuizStep === 1) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline-flex";
    }

    if (currentQuizStep === 5) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "inline-flex";
        
        // Check if step has an answer already
        let stepCategory = "";
        if (currentQuizStep === 1) stepCategory = "pet-type";
        if (currentQuizStep === 2) stepCategory = "pet-size";
        if (currentQuizStep === 3) stepCategory = "pet-interest";
        
        if (currentQuizStep === 4) {
            const nameInput = document.getElementById("quiz-pet-name").value.trim();
            if (nameInput.length > 0) {
                nextBtn.removeAttribute("disabled");
            } else {
                nextBtn.setAttribute("disabled", "true");
            }
        } else if (quizAnswers[stepCategory] !== "") {
            nextBtn.removeAttribute("disabled");
        } else {
            nextBtn.setAttribute("disabled", "true");
        }
    }
}

function generateRecommendation() {
    const resultContainer = document.getElementById("recommendation-result");
    
    // Pricing logic
    let basePrice = 99.90;
    if (quizAnswers["pet-size"] === "medium") basePrice = 139.90;
    if (quizAnswers["pet-size"] === "large") basePrice = 179.90;
    
    if (quizAnswers["pet-interest"] === "mix") basePrice += 20.00;

    let petEmoji = quizAnswers["pet-type"] === "dog" ? "🐶" : "🐱";
    let interestText = "";
    if (quizAnswers["pet-interest"] === "toys") interestText = "brinquedos estimulantes e interativos";
    if (quizAnswers["pet-interest"] === "snacks") interestText = "snack orgânicos e ração super premium";
    if (quizAnswers["pet-interest"] === "fashion") interestText = "acessórios elegantes e itens de higiene";
    if (quizAnswers["pet-interest"] === "mix") interestText = "seleção completa (brinquedos, snacks e moda)";

    resultContainer.innerHTML = `
        <i data-lucide="gift" style="width: 48px; height: 48px; color: var(--primary); margin-bottom: 16px;"></i>
        <h2>A Box Ideal para ${quizAnswers["pet-name"]} ${petEmoji}</h2>
        <p style="margin-top: 10px;">Com base nas respostas, recomendamos o plano mensal de <strong>${interestText}</strong> perfeitamente dimensionado para o porte <strong>${quizAnswers["pet-size"]}</strong>.</p>
        
        <div class="recommendation-box">
            <span style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Assinatura Mensal</span>
            <div class="recommendation-price">R$ ${basePrice.toFixed(2)} / mês</div>
            <p style="font-size: 0.85rem; color: var(--accent); font-weight: 600;">Frete Grátis incluso para sempre!</p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px; margin: 24px auto 0 auto;">
            <button class="btn btn-primary" onclick="subscribePetBox('${quizAnswers["pet-name"]}', ${basePrice})">Contratar Assinatura</button>
            <button class="btn btn-secondary" onclick="resetQuiz()">Refazer Quiz</button>
        </div>
    `;
    lucide.createIcons();
}

function subscribePetBox(petName, price) {
    // Treat Box Subscription as a custom product item
    const customBoxProduct = {
        id: 99,
        name: `Box Assinatura - ${petName}`,
        price: price,
        img: "assets/product-smart-toy.jpg", // placeholder generated
        variants: ["Mensal"]
    };
    
    // Add custom object directly to cart
    cart.push({
        product: customBoxProduct,
        quantity: 1,
        variant: "Mensal"
    });
    
    saveCart();
    updateCartDisplay();
    closeCartDrawer();
    resetQuiz();
    navigateToSection("catalog");
    openCartDrawer();
}

function resetQuiz() {
    quizAnswers = {
        "pet-type": "",
        "pet-size": "",
        "pet-interest": "",
        "pet-name": ""
    };
    currentQuizStep = 1;
    
    document.querySelectorAll(".quiz-step").forEach(step => {
        step.classList.remove("active");
    });
    document.getElementById("quiz-step-1").classList.add("active");
    
    document.querySelectorAll(".progress-node").forEach(node => {
        node.classList.remove("active", "completed");
    });
    document.querySelector(".progress-node[data-step='1']").classList.add("active");
    
    document.getElementById("quiz-progress-bar").style.width = "0%";
    document.getElementById("quiz-pet-name").value = "";
    document.querySelectorAll(".quiz-opt-btn").forEach(btn => btn.classList.remove("selected"));
    
    updateQuizFooterButtons();
}

// --- Spa Services Booking Logic ---
function selectService(serviceType, price) {
    selectedService = serviceType;
    servicePrice = price;
    
    document.querySelectorAll(".service-card").forEach(card => card.classList.remove("selected"));
    document.getElementById(`serv-${serviceType}`).checked = true;
    document.getElementById(`serv-${serviceType}`).closest(".service-card").classList.add("selected");
}

function generateTimeSlots() {
    const slotsContainer = document.getElementById("booking-slots-container");
    if (!slotsContainer) return;

    let html = "";
    availableSlots.forEach(slot => {
        const isDisabled = Math.random() < 0.25; // Simulate booked slots randomly
        html += `
            <button class="slot-btn ${isDisabled ? 'disabled' : ''}" 
                    ${isDisabled ? 'disabled' : ''} 
                    onclick="selectTimeSlot('${slot}', this)">
                ${slot}
            </button>
        `;
    });
    slotsContainer.innerHTML = html;
    selectedSlot = "";
}

function selectTimeSlot(slot, btnEl) {
    selectedSlot = slot;
    document.querySelectorAll(".slot-btn").forEach(btn => btn.classList.remove("selected"));
    btnEl.classList.add("selected");
}

function confirmAppointment() {
    const petName = document.getElementById("booking-pet-name").value.trim();
    const petType = document.getElementById("booking-pet-type").value;
    const bookingDate = document.getElementById("booking-date").value;
    const stylist = document.getElementById("booking-stylist").value;

    if (!petName || !bookingDate || !selectedSlot) {
        alert("Por favor, preencha todos os campos do agendamento (Nome do Pet, Data e Horário).");
        return;
    }

    const serviceName = selectedService === "banho" ? "Banho Terapêutico" : "Spa Completo (Banho + Tosa)";

    // Save appointment
    const newApt = {
        id: Math.floor(Math.random() * 100000),
        petName: petName,
        petType: petType,
        serviceName: serviceName,
        price: servicePrice,
        date: bookingDate,
        time: selectedSlot,
        stylist: stylist,
        status: "Agendado"
    };

    appointments.push(newApt);
    localStorage.setItem("petluxe_appointments", JSON.stringify(appointments));

    // Reset fields
    document.getElementById("booking-pet-name").value = "";
    document.getElementById("booking-date").value = "";
    selectedSlot = "";
    document.querySelectorAll(".slot-btn").forEach(btn => btn.classList.remove("selected"));

    // Show booking confirmation success modal
    document.getElementById("booking-confirm-details").innerHTML = `
        Seu agendamento de <strong>${serviceName}</strong> para <strong>${petName}</strong> foi realizado com sucesso!<br><br>
        <strong>Data:</strong> ${new Date(bookingDate).toLocaleDateString('pt-BR')}<br>
        <strong>Horário:</strong> ${newApt.time}<br>
        <strong>Profissional:</strong> ${stylist}<br>
        <strong>Valor:</strong> R$ ${servicePrice.toFixed(2)}
    `;
    openModal("booking-success-modal");
}

// --- Checkout Step Wizard Flow ---
function openCheckout() {
    if (cart.length === 0) {
        alert("Adicione itens ao carrinho antes de prosseguir para o checkout!");
        return;
    }
    
    closeCartDrawer();
    openModal("checkout-modal");
    
    // Render Checkout Summary items
    const summaryList = document.getElementById("checkout-summary-items");
    let html = "";
    cart.forEach(item => {
        html += `
            <div class="order-item-row">
                <span>${item.product.name} (x${item.quantity})</span>
                <span>R$ ${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    summaryList.innerHTML = html;
}

function simulateShippingCalculation() {
    const zip = document.getElementById("chk-zip").value;
    if (zip.length >= 8) {
        // Mock shipping calculation based on subtotal
        const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        finalShippingCost = subtotal > 150 ? 0 : 19.90;
        updateCartTotals(subtotal);
    }
}

function goToPaymentStep(event) {
    event.preventDefault();
    
    document.getElementById("chk-step-1").classList.remove("active");
    document.getElementById("chk-step-2").classList.add("active");
    
    document.getElementById("chk-ind-1").classList.remove("active");
    document.getElementById("chk-ind-1").classList.add("completed");
    document.getElementById("chk-ind-2").classList.add("active");
}

function backToDeliveryStep() {
    document.getElementById("chk-step-2").classList.remove("active");
    document.getElementById("chk-step-1").classList.add("active");
    
    document.getElementById("chk-ind-2").classList.remove("active");
    document.getElementById("chk-ind-1").classList.remove("completed");
    document.getElementById("chk-ind-1").classList.add("active");
}

function selectPaymentMethod(method, btnEl) {
    paymentMethod = method;
    
    // Visual indicators
    document.querySelectorAll(".pay-method-btn").forEach(btn => btn.classList.remove("selected"));
    btnEl.classList.add("selected");

    // Toggle fields visibility
    document.getElementById("payment-card-fields").style.display = method === "card" ? "block" : "none";
    document.getElementById("payment-pix-fields").style.display = method === "pix" ? "block" : "none";
    document.getElementById("payment-boleto-fields").style.display = method === "boleto" ? "block" : "none";
}

// Card mockup flipping and updates
function flipCardBack(shouldFlip) {
    const cardEl = document.getElementById("card-animation-wrapper");
    if (shouldFlip) {
        cardEl.classList.add("flipped");
    } else {
        cardEl.classList.remove("flipped");
    }
}

function updateCardDetails(field, inputEl) {
    if (field === "number") {
        // Format layout with spaces
        let value = inputEl.value.replace(/\D/g, '');
        let formatted = "";
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += " ";
            formatted += value[i];
        }
        inputEl.value = formatted;
        document.getElementById("mock-card-number").textContent = formatted || "•••• •••• •••• ••••";
    } else if (field === "name") {
        document.getElementById("mock-card-name").textContent = inputEl.value.toUpperCase() || "NOME SOBRENOME";
    } else if (field === "expiry") {
        let value = inputEl.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        inputEl.value = value;
        document.getElementById("mock-card-expiry").textContent = value || "MM/AA";
    } else if (field === "cvv") {
        let value = inputEl.value.replace(/\D/g, '');
        inputEl.value = value;
        document.getElementById("mock-card-cvv").textContent = value || "•••";
    }
}

function copyPixKey() {
    const keyStr = document.getElementById("pix-key-string").textContent;
    navigator.clipboard.writeText(keyStr);
    
    const feedback = document.getElementById("pix-copy-feedback");
    feedback.style.display = "block";
    setTimeout(() => {
        feedback.style.display = "none";
    }, 3000);
}

function processPurchase(event) {
    event.preventDefault();
    processPurchaseDirectly("Cartão de Crédito");
}

function processPurchaseDirectly(methodStr) {
    const orderNumber = "PX-" + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 150 ? 0 : 19.90;
    const finalTotal = subtotal + shipping;

    const newOrder = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('pt-BR'),
        items: [...cart],
        subtotal: subtotal,
        shipping: shipping,
        total: finalTotal,
        paymentMethod: methodStr,
        status: "Preparando"
    };

    // Save order
    orders.unshift(newOrder);
    localStorage.setItem("petluxe_orders", JSON.stringify(orders));

    // Clear Cart
    cart = [];
    saveCart();
    updateCartDisplay();

    // Go to success step
    document.getElementById("chk-step-2").classList.remove("active");
    document.getElementById("chk-step-3").classList.add("active");
    
    document.getElementById("chk-ind-2").classList.remove("active");
    document.getElementById("chk-ind-2").classList.add("completed");
    document.getElementById("chk-ind-3").classList.add("active");
    
    document.getElementById("chk-order-number").textContent = orderNumber;
}

function finishCheckoutFlow() {
    closeModal("checkout-modal");
    
    // Reset wizard
    document.getElementById("chk-step-3").classList.remove("active");
    document.getElementById("chk-step-1").classList.add("active");
    
    document.getElementById("chk-ind-3").classList.remove("active");
    document.getElementById("chk-ind-2").classList.remove("completed");
    document.getElementById("chk-ind-1").classList.add("active");
    
    // Clear forms
    document.getElementById("checkout-delivery-form").reset();
    document.getElementById("card-payment-form").reset();
    
    // Redirect dashboard
    navigateToSection("dashboard");
}

// --- Customer Dashboard View Panels ---
function switchDashboardTab(tabId, tabEl) {
    document.querySelectorAll(".dashboard-menu-item").forEach(item => {
        item.classList.remove("active");
    });
    tabEl.classList.add("active");

    document.querySelectorAll(".dashboard-content-panel").forEach(panel => {
        panel.classList.remove("active");
    });
    document.getElementById(`db-panel-${tabId}`).classList.add("active");
}

function renderDashboard() {
    renderDashboardOrders();
    renderDashboardPets();
    renderDashboardAppointments();
}

function renderDashboardOrders() {
    const container = document.getElementById("dashboard-orders-container");
    if (orders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px 0; color: var(--text-muted);">
                <i data-lucide="package-x" style="width: 48px; height: 48px; margin-bottom: 12px;"></i>
                <p>Nenhum pedido realizado ainda.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    let html = "";
    orders.forEach(order => {
        let trackerPercent = "10%";
        let step1Class = "active";
        let step2Class = "";
        let step3Class = "";
        let step4Class = "";

        if (order.status === "Preparando") {
            trackerPercent = "35%";
            step1Class = "completed";
            step2Class = "active";
        } else if (order.status === "A Caminho") {
            trackerPercent = "70%";
            step1Class = "completed";
            step2Class = "completed";
            step3Class = "active";
        } else if (order.status === "Entregue") {
            trackerPercent = "100%";
            step1Class = "completed";
            step2Class = "completed";
            step3Class = "completed";
            step4Class = "completed";
        }

        html += `
            <div class="dashboard-card" style="padding: 24px; border: 1px solid var(--border-color); margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4>Pedido ${order.orderId}</h4>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">${order.date}</span>
                </div>
                
                <!-- Tracking line -->
                <div class="order-tracker">
                    <div class="tracker-line" style="width: ${trackerPercent}"></div>
                    <div class="tracker-step ${step1Class}">
                        <div class="tracker-dot"><i data-lucide="check" style="width: 14px;"></i></div>
                        <div class="tracker-label">Recebido</div>
                    </div>
                    <div class="tracker-step ${step2Class}">
                        <div class="tracker-dot"><i data-lucide="package" style="width: 14px;"></i></div>
                        <div class="tracker-label">Preparando</div>
                    </div>
                    <div class="tracker-step ${step3Class}">
                        <div class="tracker-dot"><i data-lucide="truck" style="width: 14px;"></i></div>
                        <div class="tracker-label">A Caminho</div>
                    </div>
                    <div class="tracker-step ${step4Class}">
                        <div class="tracker-dot"><i data-lucide="home" style="width: 14px;"></i></div>
                        <div class="tracker-label">Entregue</div>
                    </div>
                </div>

                <!-- Products list row -->
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <span>${item.product.name} (x${item.quantity})</span>
                            <span>R$ ${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                    <div class="order-item-row" style="margin-top: 10px; border-top: 1px dashed var(--border-color); padding-top: 10px; font-weight: 700;">
                        <span>Método: ${order.paymentMethod}</span>
                        <span>Total: R$ ${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    lucide.createIcons();
}

function renderDashboardPets() {
    const container = document.getElementById("dashboard-pets-container");
    if (pets.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted);">Nenhum pet cadastrado.</p>`;
        return;
    }

    let html = "";
    pets.forEach(pet => {
        html += `
            <div class="pet-tag">
                <i data-lucide="heart" style="width: 14px; fill: var(--primary);"></i>
                <strong>${pet.name}</strong> (${pet.breed}, ${pet.age} anos)
            </div>
        `;
    });
    container.innerHTML = html;
    lucide.createIcons();
}

function renderDashboardAppointments() {
    const container = document.getElementById("dashboard-apts-container");
    if (appointments.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px 0; color: var(--text-muted);">
                <i data-lucide="calendar-x" style="width: 48px; height: 48px; margin-bottom: 12px;"></i>
                <p>Nenhum agendamento realizado.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    let html = "";
    appointments.forEach(apt => {
        html += `
            <div class="apt-card">
                <div class="apt-card-details">
                    <h5>${apt.serviceName} para ${apt.petName}</h5>
                    <p>
                        <i data-lucide="calendar" style="width: 14px; display: inline; vertical-align: middle;"></i> 
                        ${new Date(apt.date).toLocaleDateString('pt-BR')} às ${apt.time} | Profissional: ${apt.stylist}
                    </p>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 700; color: var(--primary);">R$ ${apt.price.toFixed(2)}</div>
                    <span style="font-size: 0.8rem; background: var(--primary-light); color: var(--primary); padding: 2px 8px; border-radius: 10px;">${apt.status}</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    lucide.createIcons();
}

function openAddPetModal() {
    openModal("add-pet-modal");
}

function saveNewPet() {
    const name = document.getElementById("new-pet-name").value.trim();
    const breed = document.getElementById("new-pet-breed").value.trim();
    const age = document.getElementById("new-pet-age").value.trim();

    if (!name || !breed || !age) {
        alert("Preencha todos os dados do pet!");
        return;
    }

    pets.push({ name, breed, age: parseInt(age) });
    localStorage.setItem("petluxe_pets", JSON.stringify(pets));
    
    // Clear forms
    document.getElementById("new-pet-name").value = "";
    document.getElementById("new-pet-breed").value = "";
    document.getElementById("new-pet-age").value = "";

    closeModal("add-pet-modal");
    renderDashboardPets();
}

function subscribeNewsletter() {
    const email = document.getElementById("newsletter-email").value.trim();
    if (email.length > 0) {
        alert("Inscrição realizada com sucesso! Aproveite seus cupons exclusivos.");
        document.getElementById("newsletter-email").value = "";
    } else {
        alert("Insira um endereço de e-mail válido!");
    }
}
