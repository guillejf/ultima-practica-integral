const socket = io();

const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const inputCategory = document.getElementById("input-category");
const inputPrice = document.getElementById("input-price");
const inputThumbnail = document.getElementById("input-thumbnail");
const inputCode = document.getElementById("input-code");
const inputStock = document.getElementById("input-stock");

const addProduct = document.getElementById("addProductForm");
const deleteButtons = document.querySelectorAll(".btnDelete");
const editButtons = document.querySelectorAll(".btnEdit");
const cardId = document.getElementById("card-id");
const container = document.getElementById("dinamic-list");

function setModalTitle(id) {
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = "Editar Producto con el ID " + id;
}

function saveChanges() {
  const id = window.localStorage.getItem("id");

  const inputEditTitle = document.getElementById("input-editTitle");
  const inputEditDescription = document.getElementById("input-editDescription");
  const inputEditCategory = document.getElementById("input-editCategory");
  const inputEditPrice = document.getElementById("input-editPrice");
  const inputEditThumbnail = document.getElementById("input-editThumbnail");
  const inputEditCode = document.getElementById("input-editCode");
  const inputEditStock = document.getElementById("input-editStock");

  const newProduct = {
    title: inputEditTitle.value,
    description: inputEditDescription.value,
    category: inputEditCategory.value,
    price: inputEditPrice.value,
    thumbnail: inputEditThumbnail.value,
    code: inputEditCode.value,
    stock: inputEditStock.value,
  };

  socket.emit("productModified", id, newProduct);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto Modificado",
    showConfirmButton: true,
    confirmButtonColor: "#0d6efd",
    timer: 1500,
  });
  const modalElement = document.getElementById("exampleModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
  modalElement.addEventListener("hidden.bs.modal", () => {
    const backdropElement = document.querySelector(".modal-backdrop");
    if (backdropElement) {
      backdropElement.parentNode.removeChild(backdropElement);
    }
    document.body.style.overflow = "auto";
  });
}

// AUMENTAR O DISMINUIR CANTIDAD
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.querySelectorAll(".cartItem");
  const totalCartElement = document.querySelector(".totalCart span");

  function calcularSubtotal(cartItem) {
    const cantidadElement = cartItem.querySelector(".quant");
    const precioElement = cartItem.querySelector("#precio");
    const subtotalElement = cartItem.querySelector("#subtotal");

    const cantidad = parseFloat(cantidadElement.textContent);
    const precio = parseFloat(precioElement.textContent.replace("$ ", ""));

    const subtotal = cantidad * precio;
    subtotalElement.textContent = "$ " + subtotal;
  }

  function actualizarCantidad(cartItem, cantidad) {
    const cantidadElement = cartItem.querySelector(".quant");
    cantidadElement.textContent = cantidad.toString();
    calcularSubtotal(cartItem);
  }

  async function actualizarCantidadBackend(cartItem, cantidad) {
    const cartId = document.querySelector(".cartId").textContent;
    const productId = cartItem
      .querySelector(".butonDelete")
      .getAttribute("data-product-id");

    try {
      const response = await fetch(`/cart/${cartId}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: cantidad }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedCart = data.cart;
        const cantidadElement = cartItem.querySelector(".quant");
        cantidadElement.textContent = cantidad;
        calcularSubtotal(cartItem);
        actualizarTotalCart();
      } else {
        console.error(
          "Error al actualizar la cantidad del producto en el carrito"
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  function botonIncrementarClick(event) {
    const cartItem = event.target.closest(".cartItem");
    const cantidadElement = cartItem.querySelector(".quant");
    let cantidad = parseFloat(cantidadElement.textContent);
    cantidad++;
    actualizarCantidad(cartItem, cantidad);
    actualizarCantidadBackend(cartItem, cantidad);
  }

  function botonDecrementarClick(event) {
    const cartItem = event.target.closest(".cartItem");
    const cantidadElement = cartItem.querySelector(".quant");
    let cantidad = parseFloat(cantidadElement.textContent);
    if (cantidad > 1) {
      cantidad--;
      actualizarCantidad(cartItem, cantidad);
      actualizarCantidadBackend(cartItem, cantidad);
    }
  }

  function actualizarTotalCart() {
    let total = 0;
    cartItems.forEach((cartItem) => {
      const subtotalElement = cartItem.querySelector("#subtotal");
      const subtotal = parseFloat(
        subtotalElement.textContent.replace("$ ", "")
      );
      total += subtotal;
    });
    totalCartElement.textContent = total;
  }

  cartItems.forEach((cartItem) => {
    calcularSubtotal(cartItem);

    const botonIncrementar = cartItem.querySelector(
      ".butonController:nth-child(1)"
    );
    botonIncrementar.addEventListener("click", botonIncrementarClick);

    const botonDecrementar = cartItem.querySelector(
      ".butonController:nth-child(2)"
    );
    botonDecrementar.addEventListener("click", botonDecrementarClick);
  });

  actualizarTotalCart();
});

// ELIMINAR DEL CARRITO
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".bi-trash");
  const cartIdElement = document.querySelector(".cartId");

  if (cartIdElement) {
    const cartId = cartIdElement.textContent.trim();
    deleteButtons.forEach((button) => {
      button.setAttribute("data-cart-id", cartId);
      button.addEventListener("click", async () => {
        const productId = button.getAttribute("data-product-id");
        const cartId = button.getAttribute("data-cart-id");
        // console.log(`Producto a eliminar del carrito. ID: ${productId}`);
        // console.log(`El carrito tiene el ID: ${cartId}`);

        await (async () => {
          const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminará el producto de tu carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#FF0000",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
          });

          if (result.isConfirmed) {
            Swal.fire({
              title: "Hecho!",
              text: "Eliminaste el producto",
              icon: "success",
              confirmButtonColor: "#000000",
            });
            try {
              const response = await fetch(
                `/cart/${cartId}/products/${productId}`,
                {
                  method: "DELETE",
                }
              );

              if (response.ok) {
                // console.log("Producto eliminado del carrito con éxito.");
                location.reload();
              } else {
                // console.error("Error al eliminar el producto del carrito.");
              }
            } catch (error) {
              // console.error("Error de red:", error);
            }
          }
        })();
      });
    });
  }

  const vaciarCarritoButton = document.getElementById(
    "carrito-acciones-vaciar"
  );
  vaciarCarritoButton.addEventListener("click", async () => {
    const cartId = cartIdElement.textContent.trim();

    await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se vaciará tu carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#FF0000",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/cart/${cartId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            // console.log("Carrito vaciado con éxito.");
            Swal.fire("Hecho!", "Has vaciado el carrito", "success");
            setTimeout(() => {
              location.reload();
              window.location.href = "/products";
            }, 1500);
          } else {
            // console.error("Error al vaciar el carrito.");
          }
        } catch (error) {
          // console.error("Error de red:", error);
        }
      }
    });
  });
});

// AGREGAR AL CARRITO
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".btnCart");
  const cartLink = document.getElementById("cartLink");
  const cartId = cartLink.getAttribute("href").split("/").pop();
  const userRole = document.getElementById("role").textContent;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-product-id");
      // console.log(`Producto agregado al carrito. ID: ${productId}`);
      // console.log(`El carrito tiene el ID: ${cartId}`);

      try {
        const response = await fetch(`/cart/${cartId}/products/${productId}`, {
          method: "POST",
        });

        if (response.ok) {
          if (userRole === "user") {
            Toastify({
              text: "Producto Agregado al Carrito",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom",
              position: "left",
              stopOnFocus: true,
              style: {
                background: "#000",
              },
            }).showToast();

            const cartQuantityElement =
              document.querySelector("#cartLink span");
            if (cartQuantityElement) {
              const currentQuantity = parseInt(cartQuantityElement.innerText);
              const newQuantity = currentQuantity + 1;
              cartQuantityElement.innerText = newQuantity;
            }
          } else {
            Swal.fire({
              title: "Solo los usuarios pueden agregar Productos al Carrito",
              icon: "warning",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#000",
              onAfterClose: () => {
                window.location.href = "/home";
              },
              timer: 3000,
            });
            setTimeout(() => {
              window.location.href = "/home";
            }, 3000);
          }
        } else {
          console.error("Error al agregar el producto al carrito.");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    });
  });
});

// GUARDAR COMPRA
document.addEventListener("DOMContentLoaded", function () {
  const comprarButton = document.getElementById("carrito-acciones-comprar ");
  const userEmail = document.getElementById("email").textContent;
  comprarButton.addEventListener("click", async function () {
    const cartId = document.querySelector(".cartId").textContent;
    const totalCart = document.querySelector(".totalCart span").textContent;
    const user = userEmail;

    const cartData = {
      usuario: user,
      cart_id: cartId,
      total: totalCart,
    };

    fetch(`/cart/${cartId}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartData }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Compra realizada:", data);
        Swal.fire({
          title: "¡Gracias por tu compra!",
          text: "Podrás visualizarla en MIS COMPRAS.",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#000",
          onAfterClose: () => {
            window.location.href = "/home";
          },
          timer: 3000,
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 3000);
      })
      .catch((error) => {
        console.error("Error en la compra:", error);
      });
  });
});

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    category: inputCategory.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
    code: inputCode.value,
    stock: inputStock.value,
  };
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto Creado",
    showConfirmButton: true,
    confirmButtonColor: "#000",
    timer: 1500,
  });
  socket.emit("new-product", newProduct);
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnEdit")) {
    const button = event.target;
    const cardId = button.getAttribute("data-id");
    window.localStorage.setItem("id", cardId);

    const modalElement = document.getElementById("exampleModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  if (event.target.classList.contains("btnDelete")) {
    const button = event.target;
    const cardId = button.dataset.id;

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el producto del array original",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const productId = cardId;
        socket.emit("delete-product", productId);
        Swal.fire("Hecho!", "Eliminaste el producto", "success");
      }
    });
  }
});

socket.on("products", (producto) => {
  container.innerHTML = producto
    .map((prod) => {
      return `
      <div class="card" style="width: 15rem; border: 1px solid black">
        <img src=${prod.thumbnail} class="card-img" alt="${prod.title}" />
        <div class="card-body text-center">
          <h6 class="card-id">ID: ${prod._id}</h6>
          <div class="card-title">
            <h4 class="m-0">${prod.title}</h4>
          </div>
          <div>
            <h6 class="m-0">${prod.category}</h6>
          </div>
          <div class="card-description">
            <p class="m-0 py-2">${prod.description}</p>
          </div>
          <div class="card-price">
            <p class="m-0">$ ${prod.price}.-</p>
          </div>
          <div class="card-item-detail">
            <p class="code m-0"><b>Code:</b> ${prod.code}</p>
            <p class="stock m-0"><b>Stock:</b> ${prod.stock}</p>
          </div>
          <div class="btnContainer">
            <a
              href="#"
              class="btn btn-primary btn-sm btnEdit"
              data-id=${prod._id}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onclick="setModalTitle(this.getAttribute('data-id'))"
            ><i class="bi bi-pencil me-1"></i>Editar</a>
            <a
              href="#"
              class="btn btn-danger btn-sm ms-2 btnDelete"
              data-id=${prod._id}
            ><i class="bi bi-trash3 me-1"></i>Eliminar</a>
          </div>
        </div>
      </div>
      <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" id="modalHeader">
            <h2 class="modal-title fs-5" id="exampleModalLabel">Editar
              Producto
            </h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="addProductForm">
              <div class="row">
                <div class="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editTitle"
                      placeholder="Nombre"
                    />
                    <label for="input-title"><i
                        class="bi bi-pencil-square me-1"
                      ></i>Nombre</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editDescription"
                      placeholder="Descripcion"
                    />
                    <label for="input-description"><i
                        class="bi bi-file-bar-graph me-1"
                      ></i>Descripcion</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editCategory"
                      placeholder="Categoria"
                    />
                    <label for="input-categoria"><i class="bi bi-tag me-1"></i>Categoria</label>
                 </div>
               </div>
                <div class="col-4">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editPrice"
                      placeholder="Precio"
                    />
                    <label for="input-price"><i
                        class="bi bi-currency-dollar me-1"
                      ></i>Precio</label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editThumbnail"
                      placeholder="Imagen"
                    />
                    <label for="input-thumbnail"><i
                        class="bi bi-card-image me-1"
                      ></i>Imagen</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editCode"
                      placeholder="Codigo"
                    />
                    <label for="input-code"><i
                        class="bi bi-qr-code me-1"
                      ></i>Codigo</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editStock"
                      placeholder="Stock"
                    />
                    <label for="input-stock"><i
                        class="bi bi-list-ol me-1"
                      ></i>Stock</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >Cancelar</button>
            <button
              type="button"
              class="btn btn-primary"
              id="btn-edit"
              onclick="saveChanges()"
            >Guardar</button>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
});
