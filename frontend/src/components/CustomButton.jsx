import { Button } from '@mui/material'

const CustomButton = ({
                          children,
                          variant = 'contained',
                          color = 'primary',
                          fullWidth = false,
                          size = 'medium',
                          sx = {},
                          ...rest
                      }) => {
    return (
        <Button
            variant={variant}
            color={color}
            fullWidth={fullWidth}
            size={size}
            sx={{
                textTransform: 'none',       // Keep original casing
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                py: 1.2,
                boxShadow: 'none',
                ...sx, // Allow custom overrides
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default CustomButton
