import Link from 'next/link'

const MainLayout = (props) => {
    return(
        <div className="container">
            <header className="header">
                <div className="header_container">
                    <div className="header_logo">
                        <Link href="/"><h1>НА ГЛАВНУЮ</h1></Link>
                    </div>
                    <nav className="header_nav">
                        <div className="header_nav_link">
                            <Link href="/vigenere">Шифр Виженера</Link>
                        </div>
                        <div className="header_nav_link">
                            <Link href="/des">Алгоритм DES</Link>  
                        </div>
                        <div className="header_nav_link">
                            <Link href="/probability-cipher">Вероятностный шифр</Link>  
                        </div>
                    </nav>
                </div>
            </header>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default MainLayout