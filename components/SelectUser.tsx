import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {useState} from "react";
import {UserContext} from '../lib/usercontext.ts';

export const SelectUser = (props) : JSX.Element => {

    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const handleChange = (event) => {
        setSelectedUserId(event.target.value);
        props.changeUser(event.target.value);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pick your user</InputLabel>
                <Select
                    id="select-user"
                    label="User"
                    value={selectedUserId}
                    onChange={handleChange}
                >
                    <MenuItem value={'1'}>user1</MenuItem>
                    <MenuItem value={'2'}>user2</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
};
