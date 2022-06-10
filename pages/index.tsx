import { Container } from '@mui/material'
import { Typography } from '@mui/material'
import { MainList } from '../components/MainList'

const App = (): JSX.Element => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Reservations for COLA Day!
            </Typography>
            <MainList/>

        </Container>
    )
};

export default App