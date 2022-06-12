import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { CustomAppBar} from '../components/CustomAppBar';
import { format, parseISO } from 'date-fns'

interface IReservation {
    name: string,
    start_time: string,
    end_time: string
}

const Reserve =  () : JSX.Element => {
    const router = useRouter();

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
            <Container>
                <CustomAppBar userId={router.query.userid}/>

                <Grid container spacing={1}>
                    { results && results.length > 0 && (
                        <Grid item xs={12}>
                            <Typography>Your reservations</Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        { results && !results.length && (
                            <div>You don't have any reservations</div>
                        )}
                        { results && results.length > 0 &&
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" sx={ {
                                            backgroundColor: 'primary.dark',
                                            color: 'primary.contrastText',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        } }>Room Name</TableCell>
                                        <TableCell align="left" sx={ {
                                            backgroundColor: 'primary.dark',
                                            color: 'primary.contrastText',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        } }>Capacity</TableCell>
                                        <TableCell align="left" sx={ {
                                            backgroundColor: 'primary.dark',
                                            color: 'primary.contrastText',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        } }>Start Time</TableCell>
                                        <TableCell align="left" sx={ {
                                            backgroundColor: 'primary.dark',
                                            color: 'primary.contrastText',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        } }>End Time</TableCell>
                                        <TableCell align="left" sx={ {
                                            backgroundColor: 'primary.dark',
                                            color: 'primary.contrastText',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        } }>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { results.map((result) => (
                                        <TableRow key={result.name}>
                                            <TableCell align="left">{result.name}</TableCell>
                                            <TableCell align="left">{result.capacity}</TableCell>
                                            <TableCell align="left">{format(parseISO(result.start_time),'h aaa')}</TableCell>
                                            <TableCell align="left">{format(parseISO(result.end_time), 'h aa')}</TableCell>
                                            <TableCell align="left"><Button onClick={() => handleDelete(result.id)} variant="contained">Delete</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};

export default Reserve;
