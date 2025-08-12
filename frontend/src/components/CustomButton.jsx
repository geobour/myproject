import { Button } from '@mui/material';

const CustomButton = ({
                          children,
                          variant = 'contained',
                          color = 'primary', // can be a theme color or a CSS color string
                          fullWidth = false,
                          size = 'medium',
                          sx = {},
                          ...rest
                      }) => {
    // Detect if color is one of MUI's default palette keys or a custom color string (like hex or rgb)
    const isCustomColor = !['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'].includes(color);

    // Compose sx override if custom color is passed
    const customColorStyles = isCustomColor
        ? variant === 'contained'
            ? {
                bgcolor: color,
                color: '#fff',
                '&:hover': {
                    bgcolor: color, // you could darken this if you want
                    opacity: 0.9,
                },
            }
            : variant === 'outlined'
                ? {
                    color: color,
                    borderColor: color,
                    '&:hover': {
                        bgcolor: color,
                        color: '#fff',
                        borderColor: color,
                    },
                }
                : {
                    color: color,
                    '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.1)',
                    },
                }
        : {};

    return (
        <Button
            variant={variant}
            color={isCustomColor ? undefined : color} // pass undefined if custom color
            fullWidth={fullWidth}
            size={size}
            sx={{
                textTransform: 'none', // Keep original casing
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                py: 1.2,
                boxShadow: 'none',
                ...customColorStyles, // apply custom color styles
                ...sx, // allow overrides from props
            }}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
