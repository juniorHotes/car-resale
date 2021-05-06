function useDateFormat(date) {
    const fullDate = new Date(`${date}`)

    function convert(n) { return n < 10 ? `0${n}` : n }

    const dd = convert(fullDate.getDate())
    const mm = convert(fullDate.getMonth() + 1)
    const yy = fullDate.getFullYear()
    const hrs = convert(fullDate.getHours())
    const mts = convert(fullDate.getMinutes())

    return `${dd}/${mm}/${yy} às ${hrs}:${mts}`
}

export default useDateFormat;