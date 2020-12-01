const botonRegistar = document.querySelector(".btn2")
const container3 = document.querySelector(".container3")
const container2 = document.querySelector(".container2")
const container1 = document.querySelector(".container1")
const divB = document.querySelector(".clase-1")
const divA = document.querySelector(".clase-2")
const hed = document.querySelector(".header")


let city
let ip
let name
let userName
let mail
let password
let query
let datos
let dato
let boolean
let description
let id
let accomplished

const d1 = () => {
    container1.style.display = "flex"
    container2.style.display = "none"
    container3.style.display = "none"
}

const d2 = () => {
    container1.style.display = "none"
    container2.style.display = "flex"
    container3.style.display = "none"
}

const d3 = () => {
    container1.style.display = "none"
    container2.style.display = "none"
    hed.style.display = "none"
    container3.style.display = "flex"
}

const iniciar = async()={
    
    localStorage.removeItem(token)
    localStorage.setItem(token: , value:).removeItem
   // .removeItem('token')
}
iniciar()

const a = async() => {

    const { data } = await axios({
        method: "GET",
        baseURL: "https://app1tareas.herokuapp.com/",
        url: "homework/all"
    });
    let s
    let n = 0;
    datos = data

    data.forEach(tareas => {

        let newDiv = document.createElement("div")
        newDiv.setAttribute("class", "ar")
        n += 1;
        (tareas.accomplished) ? s = "<input class='inp' type='checkbox' checked=" + tareas.accomplished + " disabled> Cumplida<br> ": s = "<input type='checkbox' disabled> Por concluir<br> ";
        divA.innerHTML += s
        newDiv.textContent = n + ": " + tareas.name;

        divB.appendChild(newDiv);
    })

}






const directoIp = async() => {
    const { data } = await axios({
        method: "GET",
        baseURL: "http://www.geoplugin.com/",
        url: "http://www.geoplugin.net/json.gp"
    })
    //console.log(data)
    city = data.geoplugin_region
    ip = data.geoplugin_request
    //console.log(city)
}

const createUser = async() => {

    await directoIp()
    try {

        console.log(" entro en crear usuario")
        const { data } = await axios({
                method: "POST",
                baseURL: "http://127.0.0.1:5000",
                url: "user",
                data: { name, userName, mail, password, ip }
            })
            console.log(data.token);
        localStorage.setItem("tokenB", data.token)
        localStorage.setItem("tokenA", data.tokenA)

    } catch (error) {
        console.log(error)
    }
}

const valideUser = async() => {
    //await directoIp()
    try {
        const { data } = await axios({
            headers: {
                Authentication: `cats ${localStorage.getItem("token")}`
            },
            method: "GET",
            baseURL: "http://127.0.0.1:5000",
            url: "" + query
        })
        if (data === "No se encontro al usuario") {
            alert("Usuario no Existe")
        } else {
            if (data === "Error en password") {
                alert("mal contraseña")
            } else {
                console.log(data);
                document.querySelector(".titulos3").innerHTML = data.userName
                document.querySelector(".n").innerHTML = data.name
                document.querySelector(".c").innerHTML = data.mail
                document.querySelector(".u").innerHTML = city + " Region "
                d3()
                a()
            }
        }


    } catch (error) {
        console.log(error.message)
    }
}

const createHwork = async() => {

    try {

        const { data } = await axios({
            method: "POST",
            baseURL: "https://app1tareas.herokuapp.com",
            url: "homework",
            data: { name, description, accomplished }
        })

    } catch (error) {
        console.log(error)
    }
}

const updateHwork = async() => {
    try {
        console.log(" Est actualizando accomplished es: " + boolean)
        const { data } = await axios({
            method: "PUT",
            baseURL: "https://app1tareas.herokuapp.com/",
            url: "homework",
            data: { id, name, description, boolean }
        })
        divA.innerHTML = ""
        divB.innerHTML = ""
    } catch (error) {
        console.log(error)
    }
}

botonRegistar.addEventListener("click", async() => {
    name = document.querySelector(".nombre").value
    userName = document.querySelector(".username").value
    mail = document.querySelector(".email").value
    password = document.querySelector(".password2").value
    console.log("click en registrar usuario");
    await createUser()
    d1()
})


document.querySelector(".btn3").addEventListener("click", async() => {
    userName = document.querySelector(".user").value
    password = document.querySelector(".password").value
    query = "user?userName=" + userName + "&password=" + password
    console.log("click en boton iniciar sesion")
    await directoIp()
    await valideUser()
})

document.querySelector(".btn6").addEventListener("click", async() => {
    name = document.querySelector(".namehwork").value
    description = document.querySelector(".deschwork").value
    accomplished = document.querySelector(".checkedhwork").checked
    if (accomplished.checked) console.log("es true")

    await createHwork()
    document.querySelector(".deschwork").value = "";
    document.querySelector(".namehwork").value = "";
    document.querySelector(".checkedhwork").checked = 0;
    divA.innerHTML = ""
    divB.innerHTML = ""
    a();
})


document.querySelector(".btn7").addEventListener("click", async() => {
    name = document.querySelector(".namehwork").value
    description = document.querySelector(".deschwork").value
    boolean = (document.querySelector(".checkedhwork").checked) ? "true" : "false";

    id = dato._id
    await updateHwork()
    document.querySelector(".deschwork").value = "";
    document.querySelector(".namehwork").value = "";
    document.querySelector(".checkedhwork").checked = 0;
    divA.innerHTML = ""
    divB.innerHTML = ""
    a();

})

divB.addEventListener("click", (captura) => {
    let arrayDeCadenas = captura.path[0].textContent.split(": ");
    datos.forEach(tarea => {
        if (arrayDeCadenas[1] === tarea.name) dato = tarea
    })

    document.querySelector(".deschwork").value = dato.description;
    document.querySelector(".namehwork").value = "" + dato.name;
    (dato.accomplished) ? document.querySelector(".checkedhwork").checked = 1: document.querySelector(".checkedhwork").checked = 0
})

document.querySelector(".i").addEventListener("click", () => {
    d1()
})

document.querySelector(".g").addEventListener("click", () => {

    d2()
})