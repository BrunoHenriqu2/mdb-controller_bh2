import dotenv from "dotenv"
import express from "express"
import jwt from "jsonwebtoken"
import crypt from "./api/library/crypt.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

dotenv.config()

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

function authenticateToken(req, res, next) {
    const authHeader = req.headers['permission'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrai o token "Bearer <token>"

    if (token == null) {
        return res.status(401).json({ message: 'Token de autenticação ausente' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            // console.error("Erro na verificação do token:", err.message); // Para depuração
            return res.status(403).json({ message: 'Token inválido ou expirado' });
        }
        req.user = user; // Anexa as informações do usuário (payload) à requisição
        next(); // Continua para a próxima middleware/rota
    });
}

app.listen(8080, () => {
    console.log("listening!")
})

app.get("/", (req, res) => {
    res.status(200).sendFile(`index.html`)
})

app.get("/edit", (req, res) => {

})

app.post("/api/login.js", async (req, res) => {
    console.log(req)
    console.log(req.body)

    if (req.method === "POST") {
        const { user, pass } = req.body
        
        const isUser = crypt.compareText(user, process.env.USER)
        const isPass = await crypt.compareHashAsync(pass, process.env.PASS_HASH)
    
        console.log(isUser, isPass)

        if (isUser && isPass) {
            let payload = { permission: "admin" }
            const token = jwt.sign(payload, crypt.createNewKeyBase64(), {algorithm: "HS512", expiresIn: "1h"})
            return res.status(200).json({ message: "Sucesso ao entrar!", token })
        }
        res.status(201).json({ message: "Email ou senha incorretos!" })
    } else {
        res.status(404).json(`Método não permitido: ${req.method}`)
    }
})