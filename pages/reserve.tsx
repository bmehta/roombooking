import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { addHours, getHours } from 'date-fns'
import { CustomAppBar} from "../components/CustomAppBar";

const Reserve = () : JSX.Element => {

    const router = useRouter();
    const userId = router.query.userid;

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [minEndTime, setMinEndTime] = useState<Date | null>(null);
    const [maxEndTime, setMaxEndTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [results, setResults] = useState< string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReserve = async (roomId) => {

        try {
            const response = await fetch('/api/reservation', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startTime,
                    endTime,
                    roomId,
                    userId
                })
            });
            if (response.status === 200) {
                router.push(`/myreservations?userid=${userId}`);
                return;
            } else {
                setError(response.error);
            }
        } catch(error) {
            setError(error.message);
            return;
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startTime
                })
            });
            if (response.status === 200) {
                const jsonResponse = await response.json();
                setResults(jsonResponse.data);
            } else {
                setError(error.message);
                return;
            }

        } catch (error) {
            setError(error.message);
            return;
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Grid container spacing={1}>
                    <CustomAppBar userId={router.query.userid}/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid item xs={12}>
                            <Typography>Pick times to find rooms</Typography>
                        </Grid>
                        <Grid item xs={2}>

                                <TimePicker
                                    label="Start Time"
                                    value={startTime}
                                    views={['hours']}
                                    sx={ {
                                        marginRight: '100px'
                                    }}
                                    onChange={(newValue) => {
                                        setMinEndTime(getHours(newValue) + 1);
                                        setMaxEndTime(getHours(newValue) + 1);
                                        setEndTime(addHours(newValue, 1));
                                        setStartTime(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                        </Grid>
                        <Grid item xs={2}>

                                <TimePicker
                                    label="End Time"
                                    value={endTime}
                                    minTime = {new Date(0,0,0, minEndTime)}
                                    maxTime = {new Date(0,0,0, maxEndTime)}
                                    views={['hours']}
                                    onChange={(newValue) => {
                                        setEndTime(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                        </Grid>
                        <Grid item xs={2}>
                                <Button variant="contained" onClick={handleSearch}>Search</Button>
                        </Grid>

                        <Grid item xs={12}>
                            { results && !results.length && (
                                <div>No results found</div>
                            )}
                            { results && results.length > 0 &&
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right" sx={ {
                                                    backgroundColor: 'primary.dark',
                                                    color: 'primary.contrastText',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold'
                                                } }>Name</TableCell>
                                                <TableCell align="right" sx={ {
                                                    backgroundColor: 'primary.dark',
                                                    color: 'primary.contrastText',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold'
                                                } }>Capacity</TableCell>
                                                <TableCell align="right" sx={ {
                                                    backgroundColor: 'primary.dark',
                                                    color: 'primary.contrastText',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold'
                                                } }>Reserve</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            { results.map((result) => (
                                                <TableRow key={result.name}>
                                                    <TableCell>{result.name}</TableCell>
                                                    <TableCell align="right">{result.capacity}</TableCell>
                                                    <TableCell align="right"><Button onClick={() => handleReserve(result.id)} variant="contained">Reserve</Button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </Grid>

                    </LocalizationProvider>
                </Grid>
            </Container>
        </Box>
    )
};

export default Reserve;
