const create = document.querySelector(".botonRegistro")
const regisPassword=document.querySelector(".botonPassword")
const message=document.querySelector(".containerRegistro")
const createContainer = document.querySelector(".container")
const footer = document.querySelector(".footer")



const createWhite = document.querySelector(".containerWhite")
let mail
let password



const createUser=async()=>{
    try {
        const { data } = await axios({
            method: "POST",
            baseURL: "http://127.0.0.1:4000",
            url: "loginNetflix",
            data: {  mail,  password }
        })
        document.querySelector(".mostrarU").innerHTML = data.mail
        localStorage.setItem("token", data.token) 
        createWhite.style.display="none"
        message.style.display="block"

    } catch (error) {
        console.log(error)
       }
}




create.addEventListener("click",()=>{
     mail=document.querySelector(".emailRegis").value
    createContainer.style.display="none"
    createWhite.style.display="block"
    footer.style.background="#f3f3f3"
    document.querySelector(".nombre").innerHTML=mail

})



regisPassword.addEventListener("click",()=>{

    password=document.querySelector(".password").value
    createUser()

})


