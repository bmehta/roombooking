import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { addHours, getHours } from 'date-fns'

const Reserve = () : JSX.Element => {

    const router = useRouter()

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [minEndTime, setMinEndTime] = useState<Date | null>(null);
    const [maxEndTime, setMaxEndTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [results, setResults] = useState< string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReserve = async (roomId) => {

        const response = await fetch('/api/reserve', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startTime,
                endTime,
                roomId,
                userId: 1
            })
        }).catch((error) => {
            setError(error.message);
            return;
        });
        router.push('/');
    };

    const handleSearch = async () => {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startTime
            })
        }).catch((error) => {
            setError(error.message)
            return;
        });

        const jsonResponse = await response.json();
        setResults(jsonResponse.data);
    };

    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid>
                    <Typography>Pick times to find rooms</Typography>
                </Grid>
                <Grid>
                    <TimePicker
                        label="Start Time"
                        value={startTime}
                        views={['hours']}
                        onChange={(newValue) => {
                            console.log('--');
                            console.log(newValue);
                            setMinEndTime(getHours(newValue) + 1);
                            setMaxEndTime(getHours(newValue) + 1);
                            setEndTime(addHours(newValue, 1));
                            console.log(minEndTime);
                            setStartTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
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
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </Grid>

                    <Grid>
                        { results && results.map((result) => (
                            <>
                                <div key={result.id}>{ result.name }</div>
                                <Button onClick={() => handleReserve(result.id)} variant="contained">Reserve</Button>
                            </>
                        )
                        )}
                        { results && !results.length && (
                            <div>No results found</div>
                        )}
                    </Grid>

            </LocalizationProvider>
        </Container>
    )
};

export default Reserve;
