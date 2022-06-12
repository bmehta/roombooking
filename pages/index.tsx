import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { Container } from '@mui/material'
import { Box } from '@mui/material'
import { MainList } from '../components/MainList'
import { SelectUser } from '../components/SelectUser'
import { CustomAppBar } from '../components/CustomAppBar'

const App = (): JSX.Element => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {

        if (router.query.userid) {
            setUserId(router.query.userId)
        }

    }, [router]);

    return (
        <Box>
            <Container>
                <CustomAppBar userId={userId}/>
                <SelectUser userId={router.query.userid} changeUser={setUserId}/>

                { ( userId || router.query.userid ) &&
                    <MainList userid={userId || router.query.userid}/>
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
*- Format dates on display
- README update
- Testing
- Room card - add pic, description etc.
- Error handling - handling is being done, display needs to happen
- Loading indicator
*- Add common appbar
- Restricting user entered time on time picker
*- Data seeding for rooms in db

 */
