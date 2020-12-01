import Link from 'next/link'

const MainLayout = (props) => {
    return(
        <div className="container">
            <header className="header">
                <Link href="/">
                    Home
                </Link>
                <div>
                <Link href="/vigenere">
                    VIGENETE
                </Link>
                <Link href="/des">
                    DES
                </Link>  
                </div>
            </header>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default MainLayout