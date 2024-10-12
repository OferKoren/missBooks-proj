import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

const { useState, useEffect } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function App() {
    const [page, setPage] = useState('bookIndex')
    useEffect(() => {
        console.log('loading app')
    }, [])

    function onSetPage(ev, page) {
        setPage(page)
    }
    return (
        <Router>
            <section className="app">
                <AppHeader onSetPage={onSetPage} />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}
