const creator = {
    createErrorDiv: (message, beforeNode) => {
        const errorDiv = document.createElement("div")
        errorDiv.setAttribute("class", "error-message")

        const beforeParent = beforeNode.parentNode
        if (beforeParent.querySelector(`div.${errorDiv.className}`)) { return }

        const div = document.createElement("div")
        errorDiv.appendChild(div)

        const img = document.createElement("img")

        img.setAttribute("src", "https://res.cloudinary.com/dxyktq9kw/image/upload/w_16,e_replace_color:d13d3d:10/v1751769476/icons8-error-26_dnb7fd.png")
        img.setAttribute("alt", "Imagem de erro")
        img.setAttribute("class", "err-image")
        div.appendChild(img)

        const p = document.createElement("p")
        p.innerText = message
        div.appendChild(p)

        beforeParent.insertBefore(errorDiv, beforeNode)
        return errorDiv
    }
}