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
    document.getElementById('message').textContent = '';
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

function createCartItem(item, index) {
  var li = document.createElement('li');

  var text = document.createElement('span');
  text.textContent = item.name + ' — ' + item.price + ' ₽ ';

  var minus = document.createElement('button');
  minus.textContent = '−';
  minus.onclick = function () {
    changeQty(index, -1);
  };

  var qty = document.createElement('span');
  qty.textContent = ' ' + item.qty + ' ';

  var plus = document.createElement('button');
  plus.textContent = '+';
  plus.onclick = function () {
    changeQty(index, 1);
  };

  var sum = document.createElement('span');
  sum.textContent = ' = ' + item.price * item.qty + ' ₽ ';

  var remove = document.createElement('button');
  remove.textContent = 'Удалить';
  remove.onclick = function () {
    removeItem(index);
  };

  li.appendChild(text);
  li.appendChild(minus);
  li.appendChild(qty);
  li.appendChild(plus);
  li.appendChild(sum);
  li.appendChild(remove);
  return li;
}

function showCart() {
  localStorage.setItem('cart', JSON.stringify(cart));

  var list = document.getElementById('cart-list');
  list.textContent = '';
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].qty;
    list.appendChild(createCartItem(cart[i], i));
  }

  if (cart.length === 0) {
    var empty = document.createElement('li');
    empty.textContent = 'Корзина пуста';
    list.appendChild(empty);
  }

  document.getElementById('cart-total').textContent = total;
}

function openForm() {
  var message = document.getElementById('message');
  if (cart.length === 0) {
    message.textContent = 'Сначала добавьте товары в корзину';
  } else {
    message.textContent = '';
    document.getElementById('order-form').style.display = 'flex';
  }
}

function createOrder(event) {
  event.preventDefault();
  cart = [];
  showCart();
  document.getElementById('order-form').reset();
  document.getElementById('order-form').style.display = 'none';
  document.getElementById('message').textContent = 'Заказ создан!';
}

showCart();