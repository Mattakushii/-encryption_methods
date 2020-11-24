import Link from 'next/link'

const MainLayout = (props) => {
    return(
        <div className="container">
            <div>
                <Link href="/">
                    Home
                </Link>
                <div>
                <Link href="/vigenere">
                    VIGENETE
                </Link>  
                </div>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default MainLayout