import { useState, useEffect } from 'react';
import { Container } from '@mui/material'
import { Box } from '@mui/material'
import { MainList } from '../components/MainList'
import { SelectUser } from '../components/SelectUser'
import { CustomAppBar } from '../components/CustomAppBar'

const App = (): JSX.Element => {

    const [userId, setUserId] = useState<string | null>(null);

    return (
        <Box>
            <Container>
                <CustomAppBar/>
                <SelectUser userId={userId} changeUser={setUserId}/>

                {userId &&
                    <MainList userid={userId}/>
                }

            </Container>
        </Box>
    )
};

export default App

//TODO
/*
*- Remove hardcoded user id when making a reservation
* Styling
*- Indices, foreign keys on db tables
- Error handling - handling is being done, display needs to happen
- Loading indicator
*- Add common appbar
- Room card with pic?
- Restricting user entered time on time picker
- Data seeding for rooms in db
- Testing
 */
