document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const orderFormModal = document.getElementById('order-form-modal');
    const successModal = document.getElementById('success-modal');
    const closeBtns = document.querySelectorAll('.close');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderForm = document.getElementById('order-form');

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
    });
});