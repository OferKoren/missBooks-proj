const { useState, useEffect, useRef } = React
export function SeasonClock() {
    const [isDark, setIsDark] = useState(false)
    const [clock, setClock] = useState()
    const intervalIdRef = useRef()

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setClock(getTime)
        }, 1000)

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [])

    function getSeason() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuerday']

        const date = new Date()
        const month = date.getMonth()
        const day = date.getDay()

        let season
        if (month >= 5 && month <= 8) season = 'summer'
        else if (month >= 9 && month <= 10) season = 'autumn'
        else if (month === 11 || month < 3) season = 'winter'
        else season = 'spring'

        return {
            month: monthNames[month],
            day: daysNames[day],
            season,
        }
    }

    function getTime() {
        const data = new Date()
        const hours = String(data.getHours()).padStart(2, '0')
        const minutes = String(data.getMinutes()).padStart(2, '0')
        const seconds = String(data.getSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds}`
    }

    function toggleDarkMode() {
        setIsDark((prevState) => !prevState)
    }
    const clockData = getSeason()
    const themeClass = isDark ? 'dark' : 'light'
    return (
        <section className={`season-clock ${themeClass}`} onClick={toggleDarkMode}>
            <h2>{`${clockData.month}(${clockData.season})`}</h2>
            <img src={`./assets/img/season-imgs/${clockData.season}.png`} alt="" />
            <p>{clockData.day}</p>
            <p>{clock}</p>
        </section>
    )
}
