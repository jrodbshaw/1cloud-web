import React, { useState } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function ErrorSnackbar() {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open}>
                <SnackbarContent
                    style={{ backgroundColor: "green" }}
                    message="Check your inbox to reset your password"
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                    role="alertdialog"
                />
            </Snackbar>
        </div>
    );
}