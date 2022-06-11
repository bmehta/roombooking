import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookOnline from '@mui/icons-material/BookOnline';
import CalendarMonth from '@mui/icons-material/CalendarMonth';

export const MainList = () : JSX.Element => {
    return (
        <Box sx={{ width: '100%' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="reserve">
                            <ListItemIcon>
                                <BookOnline/>
                            </ListItemIcon>
                            <ListItemText primary="Reserve a Room" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="myreservations">
                            <ListItemIcon>
                                <CalendarMonth/>
                            </ListItemIcon>
                            <ListItemText primary="My Reservations" />
                        </ListItemButton>
                    </ListItem>
                </List>
        </Box>
    )
};
