function useDateFormat(date) {
    const fullDate = new Date(`${date}`)

    function convert(n) { return n < 10 ? `0${n}` : n }

    const dd = convert(fullDate.getDate())
    const mm = convert(fullDate.getMonth() + 1)
    const yy = fullDate.getFullYear()

    return `${dd}/${mm}/${yy}`
}

export default useDateFormat;