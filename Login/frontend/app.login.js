const btnLogin = document.querySelector(".btn")
let ip



const directioIp = async() => {


    const { data } = await axios({
        method: "GET",
        baseURL: "https://www.cloudflare.com/",
        url: "cdn-cgi/trace"
    })
    ip = data.geoplugin_request
}




const valideUser = async() => {
    await directioIp()
    try {
        let mail = document.getElementById("login-name").value
        let password = document.getElementById("login-pass").value

        const { data } = await axios({
            headers: {
                Authentication: `Bearer ${localStorage.getItem("token")}`
            },
            method: "POST",
            baseURL: "http://127.0.0.1:4000",
            url: "netflix/login",
            data: { mail, password, ip }
        })

        if (data !== "Error en password") {
            window.location.href = "inicio.html"
        }


    } catch (error) {
        console.log(error.message)
    }
}



btnLogin.addEventListener("click", () => {
    console.log("funcionac")
    valideUser()
})