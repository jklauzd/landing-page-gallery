/* ==========================================================================
   AURA E-COMMERCE — app.js v4
   ZERO external dependencies. Bulletproof initialization.
   Uses DOMContentLoaded + pageshow for bfcache resilience.
   ========================================================================== */

// ==========================================================================
// PRODUCT DATABASE
// ==========================================================================
var PRODUCTS = {
    "camisa-masc": {
        title: "Camisa de Linho Slim Fit",
        price: 289.00,
        tag: "Destaque Masculino",
        desc: "Corte clássico estruturado com linho 100% orgânico amaciado. Uma peça coringa para o guarda-roupa minimalista, oferecendo alta respirabilidade e caimento impecável.",
        material: "Tecido 100% linho cultivado organicamente sem defensivos químicos. Costuras reforçadas e botões em madrepérola natural ecológica.",
        hasModelSelector: true,
        models: {
            masc: {
                title: "Camisa de Linho Slim Fit",
                colors: [
                    { name: "Preto Ônix", value: "#1A1A1A", img: "assets/camisa-masc-1.jpg" },
                    { name: "Bege Mineral", value: "#D8CDBC", img: "assets/camisa-masc-2.jpg" },
                    { name: "Azul Oceano", value: "#5B758E", img: "assets/camisa-masc-3.jpg" },
                    { name: "Verde Sálvia", value: "#667E6B", img: "assets/camisa-masc-4.jpg" },
                    { name: "Branco Neve", value: "#ECECEC", img: "assets/camisa-masc-5.jpg" }
                ]
            },
            fem: {
                title: "Camisa de Linho Oversized",
                colors: [
                    { name: "Branco Neve", value: "#ECECEC", img: "assets/camisa-fem-1.jpg" },
                    { name: "Bege Soft", value: "#ebd8c8", img: "assets/camisa-fem-2.jpg" },
                    { name: "Verde Oliva", value: "#818e7e", img: "assets/camisa-fem-3.jpg" },
                    { name: "Azul Denim", value: "#7c93ab", img: "assets/camisa-fem-4.jpg" }
                ]
            }
        }
    },
    "bolsa-sacola": {
        title: "Bolsa Sacola Premium",
        price: 429.00,
        tag: "Acessórios de Luxo",
        desc: "Desenvolvida em couro legítimo texturizado com grão integral. Possui amplo espaço interno para notebook e pertences diários, com acabamento feito à mão.",
        material: "100% couro legítimo bovino curtido em processo vegetal ecológico. Metais banhados a ouro escovado e forro em algodão cru de alta durabilidade.",
        hasModelSelector: false,
        colors: [
            { name: "Couro Caramelo", value: "#a1683a", img: "assets/bolsa-1.jpg" },
            { name: "Preto Clássico", value: "#111111", img: "assets/bolsa-2.jpg" },
            { name: "Branco Areia", value: "#e5dfd9", img: "assets/bolsa-3.jpg" }
        ]
    },
    "sapato-derby": {
        title: "Sapato Derby Casual",
        price: 389.00,
        tag: "Calçados Premium",
        desc: "Design clássico Derby reinventado com conforto moderno. Conta com palmilha acolchoada de alta densidade e sola vulcanizada flexível.",
        material: "Cabedal em camurça bovina selecionada com forro em couro pelica para toque suave nos pés. Cadarços em algodão encerado.",
        hasModelSelector: false,
        colors: [
            { name: "Preto Ônix", value: "#1c1c1c", img: "assets/sapato-masc-1.jpg" },
            { name: "Marrom Café", value: "#5a3a22", img: "assets/sapato-masc-2.jpg" },
            { name: "Bege Nobuck", value: "#cfbeaa", img: "assets/sapato-masc-3.jpg" },
            { name: "Cinza Asfalto", value: "#8c8e90", img: "assets/sapato-masc-4.jpg" }
        ]
    },
    "camisa-fem": {
        title: "Camisa Linho Oversized",
        price: 289.00,
        tag: "Moda Feminina",
        desc: "Corte descontraído, ideal para looks leves e elegantes de verão. Oferece versatilidade para uso aberto como terceira peça ou fechado tradicional.",
        material: "Tecido 100% linho puro amaciado em processo ecológico de lavanderia, garantindo toque macio desde o primeiro uso.",
        hasModelSelector: true,
        models: {
            fem: {
                title: "Camisa Linho Oversized",
                colors: [
                    { name: "Branco Neve", value: "#ECECEC", img: "assets/camisa-fem-1.jpg" },
                    { name: "Bege Soft", value: "#ebd8c8", img: "assets/camisa-fem-2.jpg" },
                    { name: "Verde Oliva", value: "#818e7e", img: "assets/camisa-fem-3.jpg" },
                    { name: "Azul Denim", value: "#7c93ab", img: "assets/camisa-fem-4.jpg" }
                ]
            },
            masc: {
                title: "Camisa de Linho Slim Fit",
                colors: [
                    { name: "Bege Mineral", value: "#D8CDBC", img: "assets/camisa-masc-2.jpg" },
                    { name: "Preto Ônix", value: "#1A1A1A", img: "assets/camisa-masc-1.jpg" },
                    { name: "Azul Oceano", value: "#5B758E", img: "assets/camisa-masc-3.jpg" },
                    { name: "Verde Sálvia", value: "#667E6B", img: "assets/camisa-masc-4.jpg" },
                    { name: "Branco Neve", value: "#ECECEC", img: "assets/camisa-masc-5.jpg" }
                ]
            }
        }
    },
    "sapato-mocassim": {
        title: "Mocassim Elegance",
        price: 349.00,
        tag: "Calçados Femininos",
        desc: "Bico refinado e design clean. Uma escolha atemporal para looks formais e casuais que exigem extremo conforto e sofisticação.",
        material: "Confeccionado em couro premium macio com palmilha anatômica em gel e sola em borracha crepe de alta aderência.",
        hasModelSelector: false,
        colors: [
            { name: "Preto Verniz", value: "#181818", img: "assets/sapato-fem-1.jpg" },
            { name: "Bege Soft", value: "#eddcc6", img: "assets/sapato-fem-2.jpg" }
        ]
    },
    "camisetas-marca": {
        title: "Camiseta Classic Aura",
        price: 199.00,
        tag: "Essenciais de Linho",
        desc: "Algodão egípcio penteado e elastano com toque de linho, proporcionando durabilidade excepcional, frescor e conforto térmico para o dia a dia.",
        material: "Composição de 92% algodão egípcio de fibra longa e 8% elastano de alta elasticidade. Gola reforçada com ribana fina.",
        hasModelSelector: false,
        colors: [
            { name: "Bege Mineral", value: "#dbd8d0", img: "assets/camisetas-marca-1.jpg" },
            { name: "Branco Neve", value: "#ECECEC", img: "assets/camisetas-marca-2.jpg" }
        ]
    }
};

// ==========================================================================
// CART STATE (shared across pages via localStorage)
// ==========================================================================
var cart = [];
try {
    var stored = localStorage.getItem('aura_cart');
    if (stored) { var p = JSON.parse(stored); if (Array.isArray(p)) cart = p; }
} catch (e) { cart = []; }

function saveCart() {
    try { localStorage.setItem('aura_cart', JSON.stringify(cart)); } catch (e) {}
}

function fmt(v) { return 'R$ ' + v.toFixed(2).replace('.', ','); }

// ==========================================================================
// CART DRAWER UI
// ==========================================================================
function setupCartDrawer() {
    var drawer = document.querySelector('.cart-drawer');
    var overlay = document.querySelector('.cart-drawer-overlay');
    var closeBtn = document.querySelector('.cart-close-btn');
    var closeShop = document.querySelector('.close-cart-to-shop');

    function open() {
        if (drawer && overlay) {
            drawer.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    function close() {
        if (drawer && overlay) {
            drawer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.querySelectorAll('.cart-toggle-btn').forEach(function (b) { b.addEventListener('click', open); });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
    if (closeShop) closeShop.addEventListener('click', close);

    window._openCart = open;
}

function updateCartUI() {
    var badge = document.querySelector('.cart-badge');
    var totalQty = document.querySelector('.cart-total-qty');
    var subtotalVal = document.querySelector('.cart-subtotal-val');
    var container = document.querySelector('.cart-items-container');
    var emptyMsg = document.querySelector('.empty-cart-message');
    var ckBtn = document.querySelector('.checkout-btn');

    if (!badge) return;
    var total = cart.reduce(function (s, i) { return s + (i.qty || 0); }, 0);
    badge.textContent = total;
    if (totalQty) totalQty.textContent = total;

    if (cart.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'flex';
        if (container) container.style.display = 'none';
        if (subtotalVal) subtotalVal.textContent = 'R$ 0,00';
        if (ckBtn) ckBtn.disabled = true;
    } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        if (container) container.style.display = 'flex';
        if (ckBtn) ckBtn.disabled = false;
        if (container) {
            container.innerHTML = '';
            var sub = 0;
            cart.forEach(function (item) {
                var t = (item.price || 0) * (item.qty || 0);
                sub += t;
                var el = document.createElement('div');
                el.className = 'cart-item';
                el.innerHTML =
                    '<div class="cart-item-media"><img src="' + (item.img||'') + '" alt="' + (item.name||'') + '"></div>' +
                    '<div class="cart-item-details"><div>' +
                    '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
                    '<h4 class="cart-item-title">' + (item.name||'') + '</h4>' +
                    '<button class="cart-item-remove" onclick="removeFromCart(\'' + item.id + '\',\'' + item.color + '\',\'' + item.size + '\')">✕</button></div>' +
                    '<p class="cart-item-meta">Cor: ' + (item.color||'') + ' | Tam: ' + (item.size||'') + '</p></div>' +
                    '<div class="cart-item-bottom"><div class="cart-item-qty">' +
                    '<button class="cart-item-qty-btn" onclick="changeCartQty(\'' + item.id + '\',\'' + item.color + '\',\'' + item.size + '\',-1)">−</button>' +
                    '<span class="cart-item-qty-val">' + item.qty + '</span>' +
                    '<button class="cart-item-qty-btn" onclick="changeCartQty(\'' + item.id + '\',\'' + item.color + '\',\'' + item.size + '\',1)">+</button></div>' +
                    '<span class="cart-item-price">' + fmt(t) + '</span></div></div>';
                container.appendChild(el);
            });
            if (subtotalVal) subtotalVal.textContent = fmt(sub);
        }
    }
}

// Global cart functions (called from onclick attributes)
window.addToCart = function (item, redirect) {
    var ex = cart.find(function (i) { return i.id === item.id && i.color === item.color && i.size === item.size; });
    if (ex) { ex.qty += item.qty; } else { cart.push(item); }
    saveCart(); updateCartUI();
    if (redirect) { window.location.href = 'checkout.html'; } else if (window._openCart) { window._openCart(); }
};
window.removeFromCart = function (id, color, size) {
    cart = cart.filter(function (i) { return !(i.id === id && i.color === color && i.size === size); });
    saveCart(); updateCartUI();
    if (typeof window.renderCheckoutSummary === 'function') window.renderCheckoutSummary();
};
window.changeCartQty = function (id, color, size, delta) {
    var item = cart.find(function (i) { return i.id === id && i.color === color && i.size === size; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { window.removeFromCart(id, color, size); return; }
    saveCart(); updateCartUI();
    if (typeof window.renderCheckoutSummary === 'function') window.renderCheckoutSummary();
};

// ==========================================================================
// HOME PAGE — Carousel
// ==========================================================================
function initHomePage() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var slides = hero.querySelectorAll('.slide');
    var dots = hero.querySelectorAll('.dot');
    var prev = hero.querySelector('.slider-arrow.prev');
    var next = hero.querySelector('.slider-arrow.next');
    var cur = 0, timer;

    // Mobile banner swap
    function swapBanners() {
        var mobile = window.innerWidth <= 768;
        slides.forEach(function (s) {
            var mob = s.getAttribute('data-mobile');
            var desk = s.getAttribute('data-desktop');
            if (!desk) { desk = s.style.backgroundImage.replace(/url\(['"]?/, '').replace(/['"]?\)/, ''); s.setAttribute('data-desktop', desk); }
            if (mobile && mob) { s.style.backgroundImage = "url('" + mob + "')"; }
            else if (desk) { s.style.backgroundImage = "url('" + desk + "')"; }
        });
    }
    swapBanners();
    window.addEventListener('resize', swapBanners);

    function show(i) {
        if (!slides.length) return;
        slides.forEach(function (s) { s.classList.remove('active'); });
        dots.forEach(function (d) { d.classList.remove('active'); });
        cur = ((i % slides.length) + slides.length) % slides.length;
        slides[cur].classList.add('active');
        if (dots[cur]) dots[cur].classList.add('active');
    }
    function go() { show(cur + 1); }
    function start() { timer = setInterval(go, 6000); }
    function reset() { clearInterval(timer); start(); }

    if (prev) prev.addEventListener('click', function () { show(cur - 1); reset(); });
    if (next) next.addEventListener('click', function () { go(); reset(); });
    dots.forEach(function (d) { d.addEventListener('click', function () { show(parseInt(d.dataset.index)); reset(); }); });
    start();
}

// ==========================================================================
// PRODUCT DETAIL PAGE
// ==========================================================================
function initProductPage() {
    var imgEl = document.getElementById('product-img');
    if (!imgEl) return;

    var params = new URLSearchParams(window.location.search);
    var pid = params.get('id');
    if (!pid) { window.location.href = 'index.html'; return; }

    var product = PRODUCTS[pid];
    if (!product) { window.location.href = 'index.html'; return; }

    // DOM refs
    var tagEl = document.getElementById('product-tag');
    var titleEl = document.getElementById('product-title');
    var priceEl = document.getElementById('product-price');
    var descEl = document.getElementById('product-desc');
    var matEl = document.getElementById('accordion-material-text');
    var modelGrp = document.getElementById('model-group');
    var colorNameEl = document.getElementById('color-name');
    var colorBox = document.getElementById('color-selectors');
    var sizeBtns = document.querySelectorAll('#size-selectors .size-btn');
    var qtyVal = document.querySelector('.qty-value');
    var qtyMinus = document.querySelector('.qty-btn.minus');
    var qtyPlus = document.querySelector('.qty-btn.plus');
    var addBtn = document.getElementById('add-to-cart-detail-btn');
    var buyBtn = document.getElementById('buy-now-btn');

    // State
    var activeModel = null;
    if (product.hasModelSelector) {
        activeModel = (pid === 'camisa-fem') ? 'fem' : 'masc';
    }
    var colors = product.hasModelSelector ? product.models[activeModel].colors : product.colors;
    var selColor = colors[0];
    var selSize = 'M';
    var selQty = 1;

    // ---- POPULATE THE PAGE ----
    function populatePage() {
        var displayTitle = product.hasModelSelector ? product.models[activeModel].title : product.title;
        if (tagEl) tagEl.textContent = product.tag || '';
        if (titleEl) titleEl.textContent = displayTitle || '';
        if (priceEl) priceEl.textContent = fmt(product.price);
        if (descEl) descEl.textContent = product.desc || '';
        if (matEl) matEl.textContent = product.material || '';
        if (imgEl && selColor) imgEl.src = selColor.img;
        if (imgEl) imgEl.alt = displayTitle || 'Produto AURA';
    }

    populatePage();

    // Model selector
    if (product.hasModelSelector && modelGrp) {
        modelGrp.style.display = 'block';
        var mBtns = modelGrp.querySelectorAll('.selector-btn');
        mBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.model === activeModel); });
        mBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                mBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                activeModel = btn.dataset.model;
                colors = product.models[activeModel].colors;
                selColor = colors[0];
                if (titleEl) titleEl.textContent = product.models[activeModel].title;
                renderColors();
                updateImg();
            });
        });
    }

    function renderColors() {
        if (!colorBox) return;
        colorBox.innerHTML = '';
        colors.forEach(function (c) {
            var opt = document.createElement('button');
            opt.className = 'color-option' + (selColor.name === c.name ? ' active' : '');
            opt.style.backgroundColor = c.value;
            opt.title = c.name;
            opt.setAttribute('type', 'button');
            opt.addEventListener('click', function () {
                colorBox.querySelectorAll('.color-option').forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');
                selColor = c;
                updateImg();
            });
            colorBox.appendChild(opt);
        });
    }

    function updateImg() {
        if (imgEl && selColor) {
            imgEl.style.opacity = '0';
            setTimeout(function () { imgEl.src = selColor.img; imgEl.style.opacity = '1'; }, 120);
        }
        if (colorNameEl && selColor) colorNameEl.textContent = selColor.name;
    }

    sizeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            sizeBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            selSize = btn.textContent;
        });
    });

    if (qtyMinus) qtyMinus.addEventListener('click', function () { if (selQty > 1) { selQty--; if (qtyVal) qtyVal.textContent = selQty; } });
    if (qtyPlus) qtyPlus.addEventListener('click', function () { selQty++; if (qtyVal) qtyVal.textContent = selQty; });

    function buildItem() {
        return {
            id: pid + (activeModel ? '-' + activeModel : ''),
            name: product.hasModelSelector ? product.models[activeModel].title : product.title,
            price: product.price, qty: selQty, color: selColor.name, size: selSize, img: selColor.img
        };
    }

    if (addBtn) addBtn.addEventListener('click', function () {
        window.addToCart(buildItem(), false);
        selQty = 1; if (qtyVal) qtyVal.textContent = '1';
    });
    if (buyBtn) buyBtn.addEventListener('click', function () { window.addToCart(buildItem(), true); });

    renderColors();
    updateImg();

    // Accordion
    document.querySelectorAll('.accordion-header').forEach(function (h) {
        h.addEventListener('click', function () {
            var it = h.parentElement;
            var was = it.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(function (i) { i.classList.remove('active'); });
            if (!was) it.classList.add('active');
        });
    });
}

// ==========================================================================
// CHECKOUT PAGE
// ==========================================================================
function initCheckoutPage() {
    var form = document.getElementById('checkout-form');
    if (!form) return;

    var cardBtn = document.getElementById('pay-card-btn');
    var pixBtn = document.getElementById('pay-pix-btn');
    var cardF = document.getElementById('credit-card-fields');
    var pixF = document.getElementById('pix-fields');

    if (cardBtn && pixBtn) {
        cardBtn.addEventListener('click', function () {
            cardBtn.classList.add('active'); pixBtn.classList.remove('active');
            if (cardF) cardF.style.display = 'block'; if (pixF) pixF.style.display = 'none';
        });
        pixBtn.addEventListener('click', function () {
            pixBtn.classList.add('active'); cardBtn.classList.remove('active');
            if (cardF) cardF.style.display = 'none'; if (pixF) pixF.style.display = 'flex';
        });
    }

    window.renderCheckoutSummary = function () {
        var list = document.getElementById('checkout-items-list');
        var subEl = document.getElementById('checkout-subtotal');
        var shipEl = document.getElementById('checkout-shipping');
        var totEl = document.getElementById('checkout-total');
        if (!list) return;
        if (cart.length === 0) {
            list.innerHTML = '<p style="text-align:center;padding:2rem 0;color:var(--text-secondary);">Nenhum item na sacola.</p>';
            if (subEl) subEl.textContent = 'R$ 0,00';
            if (shipEl) shipEl.textContent = 'R$ 0,00';
            if (totEl) totEl.textContent = 'R$ 0,00';
            return;
        }
        list.innerHTML = '';
        var sub = 0;
        cart.forEach(function (item) {
            var t = (item.price||0) * (item.qty||0); sub += t;
            var r = document.createElement('div'); r.className = 'checkout-item';
            r.innerHTML =
                '<div class="checkout-item-img"><img src="' + (item.img||'') + '" alt="' + (item.name||'') + '"></div>' +
                '<div class="checkout-item-info"><h4 class="checkout-item-title">' + (item.name||'') + ' (' + item.qty + 'x)</h4>' +
                '<span class="checkout-item-meta">Cor: ' + (item.color||'') + ' | Tam: ' + (item.size||'') + '</span></div>' +
                '<span class="checkout-item-price">' + fmt(t) + '</span>';
            list.appendChild(r);
        });
        var ship = sub >= 400 ? 0 : 15;
        if (subEl) subEl.textContent = fmt(sub);
        if (shipEl) shipEl.textContent = ship === 0 ? 'Grátis' : fmt(ship);
        if (totEl) totEl.textContent = fmt(sub + ship);
    };

    window.finalizeCheckout = function () {
        var main = document.getElementById('checkout-main-content');
        var success = document.getElementById('success-screen');
        if (main) main.style.display = 'none';
        if (success) success.style.display = 'block';
        cart = []; saveCart(); updateCartUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.renderCheckoutSummary();
}

// ==========================================================================
// MASTER INIT — called on DOMContentLoaded AND on pageshow (bfcache)
// ==========================================================================
var _initialized = false;

function masterInit() {
    console.log('[AURA] masterInit running, URL:', window.location.href);
    setupCartDrawer();
    updateCartUI();
    initHomePage();
    initProductPage();
    initCheckoutPage();
    _initialized = true;
}

// Run on first load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', masterInit);
} else {
    masterInit();
}

// Re-run product page init when restored from bfcache
window.addEventListener('pageshow', function (e) {
    console.log('[AURA] pageshow event, persisted:', e.persisted);
    if (e.persisted || _initialized) {
        // Page was restored from back-forward cache, re-initialize product data
        var imgEl = document.getElementById('product-img');
        if (imgEl) {
            // Re-populate the product page from scratch
            initProductPage();
        }
        updateCartUI();
    }
});
