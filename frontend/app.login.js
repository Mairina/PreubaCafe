
const btnLogin=document.querySelector(".btn")


const valideUser=async()=>{
    try {
        let mail=document.getElementById("login-name").value
        let password=document.getElementById("login-pass").value
        console.log(mail,password)
        console.log(localStorage.getItem("token"))
        
       
         const { data } = await axios({
             headers: {
                 Authentication: `Bearer ${localStorage.getItem("token")}`
             },
             method: "POST",
             baseURL: "http://127.0.0.1:4000",
             url: "loginNetflix/login",
             data: {  mail,  password }
         })
         console.log(data)
         window.location.href="inicio.html"


        
    } catch (error) {
        console.log(error.message)
    }
}



btnLogin.addEventListener("click",()=>{
    console.log("funcionac")
    valideUser()
})