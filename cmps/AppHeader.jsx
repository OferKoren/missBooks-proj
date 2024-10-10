const { useEffect, useState } = React

export function AppHeader({ onSetPage }) {
    return (
        <header className="app-header">
            <h1>ofer's missBook app</h1>

            <nav className="nav-bar">
                <a href="#" onClick={(ev) => onSetPage(ev, 'home')}>
                    home
                </a>
                <a href="#" onClick={(ev) => onSetPage(ev, 'bookIndex')}>
                    books
                </a>
                <a href="#" onClick={(ev) => onSetPage(ev, 'about')}>
                    about
                </a>
            </nav>
        </header>
    )
}
