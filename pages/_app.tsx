import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import theme from '../styles/theme'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles: Element | null = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, []);

    return (
        <ThemeProvider theme={ theme }>
            <Head>
                <title>
                    Room Booking
                </title>
                <link
                    rel="icon"
                    href="./favicon.ico"
                />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <CssBaseline />
            <Component { ...pageProps } />
        </ThemeProvider>
    )
};

export default MyApp
