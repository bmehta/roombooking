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

//TODO
/*
- Remove hardcoded user id when making a reservation
- Error handling
- Loading indicator
- Add common appbar
- Room card with pic?
- Restricting user entered time on time picker
- Data seeding for rooms in db
 */
