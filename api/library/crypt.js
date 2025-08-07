import crypto from "crypto"
import bcrypit from "bcrypt"

export default {
    createNewKeyBase64() {
        const secretBuffer = crypto.randomBytes(64)
        const secretKeyBase64 = secretBuffer.toString('base64');

        return secretKeyBase64
    },

    encryptText (string) {
        const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]
        // const vogals = ["a", "e", "i", "o", "u"]
        let splittedText = string.split("")

        return splittedText.map((value) => {
            const isConsonant = consonants.findIndex((consonant) => consonant === value)

            if (isConsonant > -1) {
                let newConsonant

                if (isConsonant >= 0) {
                    newConsonant = consonants[isConsonant - 1]
                } else {
                    newConsonant = consonants[isConsonant + 1]
                }

                return newConsonant
            }

            return value
        }).toString().replace(/[,]/g, "")
    },

    decryptText (data) {
        const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]
        // const vogals = ["a", "e", "i", "o", "u"]
        let splittedText = data.split("")

        return splittedText.map((value) => {
            const isConsonant = consonants.findIndex((consonant) => consonant === value)
            console.log(value, isConsonant)
            if (isConsonant > -1) {
                let newConsonant

                if (isConsonant >= 0) {
                    newConsonant = consonants[isConsonant + 1]
                } else {
                    newConsonant = consonants[isConsonant - 1]
                }

                return newConsonant
            }

            return value
        }).toString().replace(/[,]/g, "")
    },

    compareText(string, encryptText) {
        let decryptedText = this.decryptText(encryptText)

        if (string === decryptedText) {return true}
        return false
    },

    async hashAsync(string) {
        const saltRounds = 10
        try { return await bcrypit.hash(string, saltRounds) } catch (err) { throw err }
    },

    async compareHashAsync (stringData, hash) {
        try { return await bcrypit.compare(stringData, hash) } catch (err) { throw err }
    }
}
