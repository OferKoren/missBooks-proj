const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { bookService } from '../services/book.service.js'

export function Dashboard() {
    const [books, setBooks] = useState([])
    // /*   const [Stats, setSpeedStats] = useState([])
    const [priceStats, setPriceStats] = useState([])

    useEffect(() => {
        bookService.query().then(setBooks)
        bookService.getPriceStats().then(setPriceStats)
        /*         bookService.getSpeedStats().then(setSpeedStats)
        bookService.getVendorStats().then(setVendorStats) */
    }, [])

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} books</h2>
            <h4>By Price</h4>
            <Chart data={priceStats} />
            <hr />
            <h4>By Catagories</h4>
            {/* <Chart data={speedStats}  /> */}
        </section>
    )
}
