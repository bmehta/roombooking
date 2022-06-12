import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'

interface IReservation {
    name: string,
    start_time: string,
    end_time: string
}

const Reserve =  () : JSX.Element => {
    const router = useRouter();
    const userId = router.query.userid;

    const [results, setResults] = useState<IReservation[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await handleSearch();
                if (response.status === 200) {
                    setResults(response.data);
                } else {
                    setError(response.error)
                }
            } catch(error) {
                setError(error);
            }
        }
        if (router.query.userid) {
            fetchData();
        }

    }, [router]);

    const handleDelete = async (reservationId) => {
        try {
            const response = await fetch('/api/reservation', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: reservationId
                })
            });
            if (response.status === 200) {
                const newResults = results.filter((result) => result.id !== reservationId);
                setResults(newResults);
            } else {
                setError(response.error)
            }
        } catch(error) {
            setError(error.message);
            return;
        }

    };

    const handleSearch = async () => {
        const response = await fetch(`/api/myreservations?userid=${router.query.userid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch((error) => {
            setError(error.message);
            return;
        });

        const jsonResponse = await response.json();
        setResults(jsonResponse.data);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>Your reservations</Typography>
                </Grid>
                <Grid item xs={12}>
                    { results && results.map((result) => (
                            <div key={result.id}>
                                <div>{ result.name } - {result.start_time} - {result.end_time}</div>
                                <Button onClick={() => handleDelete(result.id)} variant="contained">Delete</Button>
                            </div>
                        )
                    )}
                    { results && !results.length && (
                        <div>You don't have any reservations</div>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
};

export default Reserve;
