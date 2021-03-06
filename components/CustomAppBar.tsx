import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const CustomAppBar = (props) : JSX.Element => {
    const userId = props.userId;
    const homeLink = userId ? `/?userid=${userId}` : '/';
    return (
        <Box sx={{ flexGrow: 1, marginBottom: 5, marginTop: 5 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        COLA Day Room Reservations!
                    </Typography>
                    <Link href={homeLink} color="inherit">Home</Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
