
/*const socket = io()

socket.emit('mensajeConexion', {user: "Leandro", rol: "Admin"})

socket.on("credencialesConexion",(info)=>{
    console.log(info)
})*/

const socket = io()

const botonChat = document.getElementById("botonChat")
const parrafosMensajes = document.getElementById("parrafosMensajes")
const valInput = document.getElementById("chatBox")

let user

swal.fire({
    title: "Identificación de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && "Ingrese su nombre de usuario valido"
    },
    allowOutsideClick: false,
}).then(resultado =>{
    user = resultado.value
    console.log(user)
})

botonChat.addEventListener("click", () =>{
    let fechaActual = new Date().toLocaleString()
    if(valInput.value.trim().length > 0){
        socket.emit("mensaje", {fecha: fechaActual, user: user, mensaje: valInput.value});
    } 
    valInput.value = ""
})

socket.on("mensajes", (arraymensajes) =>{
    parrafosMensajes.innerHTML = ""
    arraymensajes.forEach(msg => {
        parrafosMensajes.innerHTML += `<p>${msg.fecha}: el Usuario ${msg.user}: escribió: ${msg.mensaje}</p>`
    })

});

