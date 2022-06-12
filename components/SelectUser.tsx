import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";

export const SelectUser = (props) : JSX.Element => {

    const userId = props.userId? props.userId : '';
    const [selectedUserId, setSelectedUserId] = useState<string>(userId);

    useEffect(() => {
        setSelectedUserId(props.userId);
    }, [props.userId]);

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
