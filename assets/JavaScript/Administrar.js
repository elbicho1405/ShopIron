
let BotonL= document.querySelector(".inicio");
let login = document.getElementById("login")
let NavLogin = document.getElementById("NavLogin");
let InsertUser = document.getElementById("UserProfile");

// Si adminLogin no existe, lo crea y le establece admin: false
const AdminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

// Si ya inició sesión modifica interfaz
if (AdminLogin.admin) {
    // inserta imagen de admin
    InsertUser.innerHTML = `
                <p id="user-name">Administrador</p>
                <img src="../imagen/usuario.png" id="user-pic">
                `
    NavLogin.innerText = "Cerrar Sesión";
    login.innerHTML = "";
    login.innerHTML = `
    <h1>Hola, admin</h1>
    <button type="submit" class="login-submit btn btn-primary" id="btn-unlog">Cerrar Sesión</button>
    `
    let btnUnlog = document.getElementById("btn-unlog");
    btnUnlog.onclick = (e) => {
        e.preventDefault();
        AdminLogin.admin = false;
        localStorage.setItem("adminLogin", JSON.stringify(AdminLogin));
        window.location.reload();
    }
}







// login
BotonL.onclick = (e) => {
    e.preventDefault();
    let Usuario= document.getElementById("user").value;
    let Contra= document.getElementById("pass").value;
    if (Usuario == "Elbicho" && Contra == "1985") {
        AdminLogin.admin = true;
        console.log(AdminLogin.admin)
            // redirecciona a home si el login es exitoso
        window.location.href = "../../index.html";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un problema...',
            text: 'No se pudo ingresar a "' + Usuario + '"',
        })
    }
    localStorage.setItem("adminLogin", JSON.stringify(AdminLogin));
}

