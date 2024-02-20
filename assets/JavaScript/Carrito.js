const containerCarrito = document.getElementById("container-carrito");
let containerProductos = document.querySelector(".container-Productos");
const productos = JSON.parse(localStorage.getItem("carrito")) || [];
const BtnVaciar= document.querySelector(".vaciar");
const BtnFinalizar= document.querySelector(".finalizar");
let NavLogin = document.getElementById("NavLogin");
let InsertUser = document.getElementById("UserProfile");
let admin= JSON.parse(localStorage.getItem("adminLogin"));


function Borrar(nombre) {
    productos.splice(productos.findIndex(prod => prod.nombre === nombre), 1);
    localStorage.setItem("carrito", JSON.stringify(productos));
    containerProductos.innerHTML = "";
    cargarProductos();
}

VaciarCarrito=() =>{

    localStorage.removeItem("carrito");
    containerProductos.innerHTML = "";  
    Swal.fire(
        'El carrito se a vaviado con exito',
        '',
        'success'
      )  

}

FinalizarCompra=() =>{

    localStorage.removeItem("carrito");
    containerProductos.innerHTML = "";    
    Swal.fire(
        'La compra se a realizado con exito',
        '',
        'success'
      )
}

function cargarProductos() {
    if (productos.length == 0) {
        setTimeout(()=>{
            Swal.fire('El carrito está vacío');
        }, 100)
        
    } else {
        productos.forEach(prod => {
            containerProductos.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${prod.image}" class="card-img-top" alt="${prod.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <h6 class="card-text">${prod.precio}</h6>
                        <p class="card-text">${prod.stock}</p>
                        <button class="btn btn-primary" onclick="Borrar('${prod.nombre}')">Borrar</button>
                    </div>
                </div>
            `;
        });
    }
}

cargarProductos();
BtnVaciar.addEventListener("click",VaciarCarrito);
BtnFinalizar.addEventListener("click",FinalizarCompra);

if (admin.admin) {
    // inserta imagen de admin
    InsertUser.innerHTML = `
                <p id="user-name">Administrador</p>
                <img src="../imagen/usuario.png" id="user-pic">
                `
    NavLogin.innerText = "Cerrar Sesión";
  }
  
