var cart = [];

function addToCart(name, price) {
  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty = cart[i].qty + 1;
      found = true;
    }
  }
  if (found === false) {
    cart.push({ name: name, price: price, qty: 1 });
  }
  showCart();
}

function showCart() {
  var list = document.getElementById('cart-list');
  var total = 0;
  var html = '';

  for (var i = 0; i < cart.length; i++) {
    var sum = cart[i].price * cart[i].qty;
    total = total + sum;
    html = html + '<li>' + cart[i].name + ' — ' + cart[i].price + ' ₽ × ' + cart[i].qty + ' = ' + sum + ' ₽</li>';
  }

  if (cart.length === 0) {
    html = '<li>Корзина пуста</li>';
  }

  list.innerHTML = html;
  document.getElementById('cart-total').textContent = total;
}

showCart();