
import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar({ car, onSave, onCancel }) {
    const [open, setOpen] = useState(false);
    const [editedCar, setEditedCar] = useState(car);

    const handleClickOpen = () => {
        setEditedCar(car);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        onSave(editedCar);
        handleClose();
    };

    const handleCancel = () => {
        onCancel();
        handleClose();
    };

    const handleInputChange = (e, field) => {
        setEditedCar(prevCar => ({
            ...prevCar,
            [field]: e.target.value
        }));
    };

    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Brand"
                        value={editedCar.brand}
                        onChange={(e) => handleInputChange(e, 'brand')}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="Model"
                        value={editedCar.model}
                        onChange={(e) => handleInputChange(e, 'model')}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="Color"
                        value={editedCar.color}
                        onChange={(e) => handleInputChange(e, 'color')}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="Fuel"
                        value={editedCar.fuel}
                        onChange={(e) => handleInputChange(e, 'fuel')}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="Model Year"
                        value={editedCar.modelYear}
                        onChange={(e) => handleInputChange(e, 'modelYear')}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="Price"
                        value={editedCar.price}
                        onChange={(e) => handleInputChange(e, 'price')}
                        variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Update</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
