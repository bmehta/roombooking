import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookOnline from '@mui/icons-material/BookOnline';
import CalendarMonth from '@mui/icons-material/CalendarMonth';

export const MainList = (props) : JSX.Element => {
    const userId = props.userid;
    const reserveLink = `reserve?userid=${userId}`;
    const myReservationsLink =`myreservations?userid=${userId}`;

    return (
        <Box sx={{ width: '100%' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href={reserveLink}>
                            <ListItemIcon>
                                <BookOnline/>
                            </ListItemIcon>
                            <ListItemText primary="Reserve a Room" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href={myReservationsLink}>
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
