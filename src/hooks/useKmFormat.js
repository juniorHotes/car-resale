function kmFormat(value) {
    if(value === undefined) return 

    const onlyDigits = String(value)
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -3) + "." + onlyDigits.slice(-3)
    return value = digitsFloat
}

export default kmFormat