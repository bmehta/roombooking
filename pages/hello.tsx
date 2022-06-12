import Head from 'next/head'
import Link from 'next/link';


export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>COLA DAY Reservations</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Welcome to COLA Day!
                </h1>
            </main>
        </div>
    )
}
