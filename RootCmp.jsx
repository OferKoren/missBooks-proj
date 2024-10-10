import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

const { useState, useEffect } = React

export function App() {
    const [page, setPage] = useState('home')
    useEffect(() => {
        console.log('loading app')
    }, [])

    function onSetPage(ev, page) {
        setPage(page)
    }
    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage} />
            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'bookIndex' && <BookIndex />}
                {page === 'about' && <About />}
            </main>
        </section>
    )
}
