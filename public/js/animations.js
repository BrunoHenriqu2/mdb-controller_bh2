const animateBackground = async () => {
    const body = document.body
    let styles = window.getComputedStyle(body)

    let currentDeg = 0
    while (await task.wait(.1)) {
        if (currentDeg === 360) {currentDeg = 0}
        currentDeg++
        
        let constructBackground = () => {
            let colors = styles.background.match(/rgb\s*\([0-9]{1,3}[,]\s*[0-9]{1,3}[,]\s*[0-9]{1,3}\)/g)
            let background = `linear-gradient(${String(currentDeg)}deg`

            colors.forEach(rgb => {
                background += `, ${rgb}`
            })
            background += ")"

            return background
        }
        
        body.style.background = constructBackground()//; console.log(constructBackground())
    }
}

window.addEventListener("load", () => {
    animateBackground()
})