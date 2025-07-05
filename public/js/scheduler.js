const task = {
    wait: async (s) => {
        let ms
        if (!s) {ms = 33.33} else {ms = s * 1000} // 30 fps pra não ficar quebrado dms, não é todo mundo que tem um bom dispositivo!
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(true) }, ms)
        })
    }
}