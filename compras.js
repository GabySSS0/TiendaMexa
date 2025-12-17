document.addEventListener("DOMContentLoaded", () => {

  const cartItemsDiv = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      totalSpan.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const div = document.createElement("div");
      div.className = "card mb-3 p-3";

      div.innerHTML = `
        <h5>${item.name}</h5>
        <p>Precio: $${item.price}</p>
        <p>Cantidad: ${item.quantity}</p>
        <p><strong>Subtotal: $${subtotal}</strong></p>
        <button class="btn btn-sm btn-danger" data-index="${index}">
          Eliminar
        </button>
      `;

      cartItemsDiv.appendChild(div);
    });

    totalSpan.textContent = total.toFixed(2);
  }

  cartItemsDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("¿Vaciar carrito?")) {
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    }
  });

  renderCart();
});
