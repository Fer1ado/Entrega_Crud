const socket = io();
const form = document.getElementById("idForm");
const listarProd = document.getElementById("listarProd");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.target);
  const datForm = new FormData(e.target);
  const prod = Object.fromEntries(datForm);
  console.log(prod);
  await socket.emit("nuevoProducto", prod);
  await socket.emit("update-products")
});

listarProd.addEventListener("click", async (e) => {
  e.preventDefault();
  await socket.emit("update-products");

  socket.on("product-data", (mensaje) => {
    const tableBody = document.querySelector("#productsTable tbody");
    let tableContent = "";
    if (mensaje && Array.isArray(mensaje)) {
      mensaje.forEach((product) => {
        tableContent += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>${product.thumbnail}</td>
                    <td>${product.code}</td>
                    <td>${product.stock}</td>
                    <td>${product.status}</td>
                </tr>
            `;
      });
    } else {
      console.error("algo salio ,al", mensaje);
    }
    tableBody.innerHTML = tableContent;
  });
});
