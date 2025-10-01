document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const orderFormModal = document.getElementById('order-form-modal');
    const successModal = document.getElementById('success-modal');
    const closeBtns = document.querySelectorAll('.close');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderForm = document.getElementById('order-form');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const productGrid = document.getElementById('product-grid');
    const pagination = document.getElementById('pagination');

    const products = [
        { id: 1, name: 'Kiwi Ears Cadenza', price: 35, image: 'images/kecadenza.webp' },
        { id: 2, name: 'Kefine Klean', price: 50, image: 'images/kefineklean.webp' },
        { id: 3, name: 'Moondrop Chu 2', price: 23, image: 'images/chu2.webp' },
        { id: 4, name: '7HZ x Crinacle Zero: 2', price: 25, image: 'images/zero2.webp' },
        { id: 5, name: 'KZ Castor PRO', price: 25, image: 'images/CastorPro.webp' },
        { id: 6, name: 'Truthear Hexa', price: 90, image: 'images/truthearHexa.webp' },
        { id: 7, name: 'Simgot EW300', price: 80, image: 'images/simgotEW300.webp' },
        { id: 8, name: 'Artti T10', price: 55, image: 'images/artti.webp' },
        { id: 9, name: 'Letshuoer S08', price: 100, image: 'images/letshuoer.webp' },
        { id: 10, name: 'Kefine Delci', price: 75, image: 'images/kefineDelci.webp' },
        { id: 11, name: 'Aful Explorer', price: 95, image: 'images/afulExplorer.webp' },
        { id: 12, name: 'Simgot Supermix 4', price: 170, image: 'images/supermix.webp' },
        { id: 13, name: 'Kiwi Ears KE4', price: 200, image: 'images/ke4.webp' },
        { id: 14, name: 'LETSHUOER S12 PRO', price: 170, image: 'images/S12PRO.webp' },
        { id: 15, name: 'Truthear Nova', price: 160, image: 'images/nova.webp' },
        { id: 16, name: 'XENNS Mangird Tea PRO', price: 360, image: 'images/teaPRO.webp' },
        { id: 17, name: 'AFUL Performer 5+2', price: 220, image: 'images/afulP7.webp' },
        { id: 18, name: 'ZiiGaat Odyssey', price: 230, image: 'images/ziigat.webp' },
        { id: 19, name: 'Softears Volume S', price: 320, image: 'images/volumeS.webp' },
        { id: 20, name: 'Thieaudio Hype 4', price: 400, image: 'images/hype4.webp' },
        { id: 21, name: 'DUNU DK3001BD', price: 450, image: 'images/dunu.webp' },
        { id: 22, name: 'Kiwi Ears x HBB Punch', price: 450, image: 'images/punch.webp' },
        { id: 23, name: 'THIEAUDIO Prestige LTD', price: 1300, image: 'images/prestige.webp' },
        { id: 24, name: 'BUY MY IEMS', price: 9999, image: 'images/product.jpg' }
    ];

    let currentPage = 1;
    const itemsPerPage = 16;

    function renderPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageProducts = products.slice(start, end);

        productGrid.innerHTML = '';
        pageProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price} usd</p>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    Add to cart
                </button>
            `;
            productGrid.appendChild(card);
        });

        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.dataset.page = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => {
                currentPage = i;
                renderPage();
            });
            pagination.appendChild(btn);
        }
    }

    productGrid.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = +e.target.dataset.price;

            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            updateCart();
        }
    });

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - ${item.price} usd. 
                <input type="number" min="1" value="${item.quantity}" data-id="${item.id}">
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(li);
            total += item.price * item.quantity;

            const quantityInput = li.querySelector(`input[data-id="${item.id}"]`);
            quantityInput.addEventListener('change', e => {
                const newQuantity = +e.target.value;
                if (newQuantity < 1) {
                    e.target.value = 1;
                    return;
                }
                item.quantity = newQuantity;
                updateCart();
            });

            const removeBtn = li.querySelector(`.remove-item[data-id="${item.id}"]`);
            removeBtn.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                updateCart();
            });
        });

        cartTotal.textContent = total;
        document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartModal.style.display = 'none';
            orderFormModal.style.display = 'none';
            successModal.style.display = 'none';
        });
    });

    checkoutBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
        orderFormModal.style.display = 'block';
    });

    orderForm.addEventListener('submit', e => {
        e.preventDefault();
        orderFormModal.style.display = 'none';
        successModal.style.display = 'block';
        cart = []
        updateCart();
        orderForm.reset();
    });

    renderPage();
    updateCart();
});