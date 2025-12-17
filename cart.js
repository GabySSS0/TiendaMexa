function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#28a745";
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "25px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease";

  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.style.opacity = "1");

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".btn-increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const quantityDiv = btn.previousElementSibling;
      let quantity = parseInt(quantityDiv.textContent);
      quantityDiv.textContent = quantity + 1;
    });
  });

  document.querySelectorAll(".btn-decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const quantityDiv = btn.nextElementSibling;
      let quantity = parseInt(quantityDiv.textContent);
      if (quantity > 0) {
        quantityDiv.textContent = quantity - 1;
      }
    });
  });

  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", () => {

      const card = btn.closest(".product-item");
      const quantity = parseInt(card.querySelector(".quantity").textContent);

      if (quantity === 0) {
        alert("Selecciona al menos 1 producto");
        return;
      }

      const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: parseFloat(card.dataset.price),
        quantity: quantity
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(p => p.id === product.id);

      if (existing) {
        existing.quantity += product.quantity;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      card.querySelector(".quantity").textContent = "0";

      showToast("Producto agregado al carrito 🛒");

    });
  });

});
