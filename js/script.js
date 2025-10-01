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

    const products = [
        { id: 1, name: 'IEM 1', price: 10 },
        { id: 2, name: 'IEM 2', price: 15 },
        { id: 3, name: 'IEM 3', price: 20 },
        { id: 4, name: 'IEM 4', price: 12 },
        { id: 5, name: 'IEM 5', price: 18 },
        { id: 6, name: 'IEM 6', price: 25 },
    ];

    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} usd</p>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    Add to cart
                </button>
            `;
            productGrid.appendChild(card);
        });
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

    renderProducts();
    updateCart();
});