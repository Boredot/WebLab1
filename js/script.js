document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const orderFormModal = document.getElementById('order-form-modal');
    const successModal = document.getElementById('success-modal');
    const closeBtns = document.querySelectorAll('.close');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderForm = document.getElementById('order-form');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

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

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = +btn.dataset.price;

            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            updateCart();
        });
    });

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

    updateCart();
});