import { Container } from '@mui/material'
import { useEffect } from 'react'

const App = (): JSX.Element => {
    return (
        <main>
            <Container
                maxWidth="xl"
                sx={ {
                    marginTop: 75,
                } }
            >
                <h1>
                    Welcome
                </h1>
                <p>
                    This is the default page for your room booking
                </p>

            </Container>
        </main>
    )
};

export default App
