let containerProductos = document.querySelector(".container-productos");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let admin= JSON.parse(localStorage.getItem("adminLogin"));
let boton= document.querySelector("#CargarProd");
let nombre;
let precio;
let stock;
let NavLogin = document.getElementById("NavLogin");
let InsertUser = document.getElementById("UserProfile");
const productos = JSON.parse(localStorage.getItem("productos")) || [];



let ListaProducto=[]
if (!localStorage.getItem("productos")) {
    ListaProducto = [
    {nombre:"Expanción-no step, no back", precio:980, stock:5000, img: "./assets/Imagen/ManTheGuns.jpg"},
    {nombre:"Expanción-la résistance", precio:700, stock:5000, img: "./assets/Imagen/NoStepNoBack.jpg"},
    {nombre:"Expanción-man the guns", precio:700, stock:5000, img: "./assets/Imagen/LaRésistance.jpg"},
  ];
  localStorage.setItem("productos", JSON.stringify(ListaProducto));
  ListaProducto.forEach(prod => {
    containerProductos.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
    <div class="card-body">
      <h5 class="card-title">${prod.nombre}</h5>
      <h6 class="card-text">$${prod.precio}</h6>
      <p class="card-text">stock: ${prod.stock}</p>
      <a href="#" class="btn btn-primary BtnCar">Añadir al carrito</a>
    </div>
  </div>
`;
});
} else {
    
    ListaProducto = JSON.parse(localStorage.getItem("productos"));
    ListaProducto.forEach(prod => {
        containerProductos.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body">
          <h5 class="card-title">${prod.nombre}</h5>
          <h6 class="card-text">$${prod.precio}</h6>
          <p class="card-text">stock: ${prod.stock}</p>
          <a href="#" class="btn btn-primary BtnCar">Añadir al carrito</a>
        </div>
      </div>
    `;
    });}

// ------CREAR PRODUCTOS-------

PedirNomPre = async () => {
  Swal.fire({
    title: 'Ingrese la información del producto',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Precio">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Stock">' +
      '<input id="swal-input4" class="swal2-input" placeholder="URL de la imagen">',
    focusConfirm: false,
    preConfirm: async () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
        document.getElementById('swal-input3').value,
        document.getElementById('swal-input4').value
      ];
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      const [nombre, precio, stock, img] = result.value;
      let nuevoProd = {
        nombre: nombre,
        precio: precio,
        stock: stock,
        img: img
      };

      if (!nuevoProd.img.includes("http") || !nuevoProd.img.includes("https")) {
        try {
          const imageUrl = await GeneraImag(nuevoProd.img);
          nuevoProd.img = imageUrl;
        } catch (error) {
          nuevoProd.img = "./assets/Imagen/Default.jpg";
        }
      }

      ListaProducto.push(nuevoProd);
      localStorage.setItem("productos", JSON.stringify(ListaProducto));
      containerProductos.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${nuevoProd.img}" class="card-img-top" alt="${nuevoProd.nombre}">
          <div class="card-body">
            <h5 class="card-title">${nuevoProd.nombre}</h5>
            <h6 class="card-text">$${nuevoProd.precio}</h6>
            <p class="card-text">stock: ${nuevoProd.stock}</p>
            <a href="#" class="btn btn-primary BtnCar">Añadir al carrito</a>
          </div>
        </div>
      `;
      checkearBotones();
    }
  });
};



async function GeneraImag(imageUrl) {
  const AccesKey = "CHWPZHaFAhC6gUNeJVz6Q4ULqY9HeMRvEU7sOYc16pE";
  const url = `https://api.unsplash.com/search/photos?page=1&query=${imageUrl}&client_id=${AccesKey}&per_page=1`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      const imageResults = data.results;

      if (imageResults.length > 0) {
          return imageResults[0].urls.small; 
      } else {
          throw new Error("No se encontraron resultados de imágenes.");
      }
  } catch (error) {
      throw new Error("Error al obtener la imagen de Unsplash.");
  }
}


function checkearBotones(){
  let botones = document.querySelectorAll(".btn");
  
  for (let boton of botones) {
    if(admin.admin){
      boton.innerText = "Borrar"
    }
    boton.onclick = (e) => {
      if(admin.admin){
        BorrarProd(e)
      } else {
      agregarCarrito(e);
    }
    };
  }
  let contadorCarrito;
  if(localStorage.getItem("carrito")){
    contadorCarrito = localStorage.getItem("carrito").length;
  } else {
    contadorCarrito = 0;
  }
  function agregarCarrito(e) {
    let elemento = e.target;
    // uso e.target para saber qué boton traigo
    let padre = elemento.parentElement; //busco al elemento padre
    console.log(padre);
    let nombre = padre.querySelector("h5").innerText;
    let precio = padre.querySelector("h6").innerText;
    let stock = padre.querySelector("p").innerText;
    let image= padre.parentElement.querySelector("img").src;
    Swal.fire(
      `Se a añadido al carrito el producto: ${nombre}, Precio: ${precio}`
    )  
    let producto = {
      nombre: nombre,
      precio: precio,
      stock: stock,
      image: image,
    };
    
    carrito.push(producto);
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    contadorCarrito++;
      
  }

  function BorrarProd(e) {

    let elemento = e.target;
    let padre = elemento.parentElement.parentElement;
    let nombre = padre.querySelector("h5").innerText; 

 
    padre.remove();


    let index = ListaProducto.findIndex(prod => prod.nombre === nombre);
    if (index !== -1) {
        ListaProducto.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(ListaProducto));
    }
}
}

checkearBotones();

if(admin.admin){
  let Btncar = document.querySelectorAll(".BtnCar");
  boton.style.display = "flex";

  Btncar.innerText='Borrar';
}else{
  boton.style.display = "none"
}

boton.addEventListener("click", PedirNomPre);

if (admin.admin) {
  // inserta imagen de admin
  InsertUser.innerHTML = `
              <p id="user-name">Administrador</p>
              <img src="./assets/imagen/usuario.png" id="user-pic">
              `
  NavLogin.innerText = "Cerrar Sesión";
}
