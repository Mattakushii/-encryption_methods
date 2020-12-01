import React from 'react';
import Head from 'next/head';
import MainLayout from '../components/mainLayout/MainLayout';
import '../styles/main.css'

function App ({ Component, pageProps }) {


    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>
                <title>Информационная безопасность и защита информации</title>
            </Head>
            <MainLayout>
                <Component {...pageProps}/>
            </MainLayout>
        </>
    )
}

export default App