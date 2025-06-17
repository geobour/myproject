import { Box, Typography } from '@mui/material'

const Footer = () => (
    <Box
        component="footer"
        sx={{
            p: 2,
            backgroundColor: '#f5f5f5',
            textAlign: 'center',
        }}
    >
        <Typography variant="body2">© 2025 MyProject</Typography>
    </Box>
)

export default Footer
