import './Header.css';

function Header() {
    return (
        <header className="header">
            <h1 className="logo">📕 My Library</h1>
            <nav>
                <a href="#">🏠 Home</a>
                <a href="#">📞 Contact</a>
                <a href="#">📄 About</a>
                <a href="#">📚 My Shelf</a>
                <a href="#">🔑 Login</a>
                <a href="#">👤 Register</a>
            </nav>
        </header>
    );
}

export default Header