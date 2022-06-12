import { Container } from '@mui/material'
import { Typography } from '@mui/material'
import { MainList } from '../components/MainList'
import { SelectUser } from '../components/SelectUser'
import { useState, useEffect } from 'react';

const App = (): JSX.Element => {

    const [userId, setUserId] = useState<string | null>(null);

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Reservations for COLA Day!
            </Typography>

            <SelectUser userId={userId} changeUser={setUserId}/>

            {userId &&
                <MainList userid={userId}/>
            }

        </Container>
    )
};

export default App

//TODO
/*
- Remove hardcoded user id when making a reservation
- Indices, foreign keys on db tables
- Error handling - handling is being done, display needs to happen
- Loading indicator
- Add common appbar
- Room card with pic?
- Restricting user entered time on time picker
- Data seeding for rooms in db
- Testing
 */
