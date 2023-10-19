import React, {} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";


function Modal({ open, onClose, component: Component, rowDetails, PathName, modalPurpose }) {
    

    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <DialogTitle>{modalPurpose === 'update' ? 'Update' : 'Add'}</DialogTitle>
                    </Grid>
                    <Grid item xs={4}>
                        <DialogActions>
                            <Button onClick={onClose}>Close</Button>
                        </DialogActions>
                    </Grid>
                </Grid>
                <DialogContent sx={{ width: '100%', marginLeft: '0% !important' }}>

                    <Component row={rowDetails} PathName={PathName} />
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default Modal;

