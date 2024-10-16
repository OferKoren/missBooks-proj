import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { Home } from './pages/Home.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { BookAdd } from './pages/BookAdd.jsx'
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
                        <Route path="/" element={<Navigate to="/book" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/add" element={<BookAdd />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}
