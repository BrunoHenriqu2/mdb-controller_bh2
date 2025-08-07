const login = () => {
    const loginContent = document.querySelector("section#login-content")
    const form = document.querySelector("form#login")
    const loginButton = form.querySelector("button#login-button")

    let sendReq = async () => {
        const user = form.querySelector("input#username")
        const pass = form.querySelector("input#password")
        const data = {user: user.value.toLowerCase(), pass: pass.value}
        
        await fetch("/api/login.js", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data["token"]) {
                console.log("entrar")
                window.location.href = "http://localhost:8080/edit"
            } else {
                creator.createErrorDiv(data.message, loginContent)
            }
        })
    }

    loginButton.addEventListener("click", sendReq)
}

login()