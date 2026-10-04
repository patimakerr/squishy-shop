var saved = localStorage.getItem('cart');
var cart = [];
if (saved !== null) {
  cart = JSON.parse(saved);
}

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

function removeItem(i) {
  cart.splice(i, 1);
  showCart();
}

function changeQty(i, change) {
  cart[i].qty = cart[i].qty + change;
  if (cart[i].qty <= 0) {
    cart.splice(i, 1);
  }
  showCart();
}

function showCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  var list = document.getElementById('cart-list');
  var total = 0;
  var html = '';

  for (var i = 0; i < cart.length; i++) {
    var sum = cart[i].price * cart[i].qty;
    total = total + sum;
        html = html + '<li>' + cart[i].name + ' — ' + cart[i].price + ' ₽ ' +
      '<button onclick="changeQty(' + i + ', -1)">−</button> ' + cart[i].qty +
      ' <button onclick="changeQty(' + i + ', 1)">+</button> = ' + sum + ' ₽ ' +
      '<button onclick="removeItem(' + i + ')">Удалить</button></li>';
  }

  if (cart.length === 0) {
    html = '<li>Корзина пуста</li>';
  }

  list.innerHTML = html;
  document.getElementById('cart-total').textContent = total;
}

function openForm() {
  if (cart.length === 0) {
    alert('Сначала добавьте товары в корзину');
  } else {
    document.getElementById('order-form').style.display = 'flex';
  }
}

function createOrder(event) {
  event.preventDefault();
  alert('Заказ создан!');
  cart = [];
  showCart();
  document.getElementById('order-form').reset();
  document.getElementById('order-form').style.display = 'none';
}

showCart();