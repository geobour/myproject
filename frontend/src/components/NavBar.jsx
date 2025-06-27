import {Drawer, List, ListItem, ListItemText} from '@mui/material'
import {Link} from 'react-router-dom'

const navItems = [
    {text: 'Dashboard', path: '/'},
    {text: 'About', path: '/about'},
    {text: 'Users', path: '/users'},
]

const NavBar = () => (
    <Drawer
        variant="permanent"
        sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: 240, boxSizing: 'border-box'},
        }}
    >
        <List>
            {navItems.map(({text, path}) => (
                <ListItem
                    button
                    key={text}
                    component={Link}
                    to={path}
                    sx={{textDecoration: 'none', color: 'inherit'}}
                >
                    <ListItemText primary={text}/>
                </ListItem>
            ))}
        </List>
    </Drawer>
)

export default NavBar
