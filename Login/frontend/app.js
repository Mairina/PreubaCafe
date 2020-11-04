const create = document.querySelector(".botonRegistro")
const regisPassword = document.querySelector(".botonPassword")
const message = document.querySelector(".containerRegistro")
const createContainer = document.querySelector(".container")
const footer = document.querySelector(".footer")
const createWhite = document.querySelector(".containerWhite")


let mail
let password
let city
let ip


const directoIp = async() => {

    const { data } = await axios({
        method: "GET",
        baseURL: "http://www.geoplugin.com/",
        url: "http://www.geoplugin.net/json.gp"
    })
    city = data.geoplugin_city
    ip = data.geoplugin_request
}





const createUser = async() => {
    await directoIp()
    console.log(mail, password, city, typeof(ip), " entro en crear usuario")
    try {
        const { data } = await axios({
            method: "POST",
            baseURL: "http://127.0.0.1:4000",
            url: "netflix",
            data: { mail, password, ip, city }
        })
        console.log(data.mail, data.password, data.city, data.ip, " salio en crear usuario")
        document.querySelector(".mostrarU").innerHTML = data.mail
        localStorage.setItem("token", data.token)
        localStorage.setItem("tokenLocal", data.ip)
        createWhite.style.display = "none"
        message.style.display = "flex"

    } catch (error) {
        console.log(error)
    }
}




create.addEventListener("click", () => {
    mail = document.querySelector(".emailRegis").value
    createContainer.style.display = "none"
    createWhite.style.display = "flex"
    footer.style.background = "#f3f3f3"
    document.querySelector(".nombre").innerHTML = mail

})



regisPassword.addEventListener("click", async() => {

    password = document.querySelector(".password").value
    await createUser()

})