const { useEffect, useState } = React
const { Link, NavLink } = ReactRouterDOM
export function AppHeader({ onSetPage }) {
    return (
        <header className="app-header">
            <h1>ofer's missBook app</h1>

            <nav className="nav-bar">
                <NavLink to="/home">home </NavLink>
                <NavLink to="/book">books </NavLink>
                <NavLink to="/dashboard">dashboard </NavLink>
                <NavLink to="/about">about </NavLink>
            </nav>
        </header>
    )
}
