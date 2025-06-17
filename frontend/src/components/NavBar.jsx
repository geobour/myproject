import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material'

const NavBar = () => (
    <Drawer
        variant="permanent"
        sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
    >
        <List>
            {['Home', 'About', 'Users'].map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    </Drawer>
)

export default NavBar
