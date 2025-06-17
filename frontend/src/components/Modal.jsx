import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

const Modal = ({ open, onClose, title, children, actions }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"       // max width limit (adjustable)
            fullWidth           // take full width up to maxWidth
            scroll="paper"      // scroll if content too tall
        >
            {title && <DialogTitle>{title}</DialogTitle>}

            <DialogContent dividers>
                {children}
            </DialogContent>

            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    )
}

export default Modal
