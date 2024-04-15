import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar({ onSave, onCancel }) {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        setCar({
            brand: '',
            model: '',
            color: '',
            fuel: '',
            modelYear: '',
            price: ''
        });
    };

    const handleSave = () => {
        console.log("Saving car:", car);
        onSave(car);
        setCar({
            brand: '',
            model: '',
            color: '',
            fuel: '',
            modelYear: '',
            price: ''
        });
        handleClose();
    };

    const handleCancel = () => {
        console.log("Tallennuksen peruutus");
        onCancel();
        handleClose();
    };


    const addCar = () => {
        onSave(car);
        handleClose();
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Add Car</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle> Add Car </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="brand"
                        value={car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="model"
                        value={car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="color"
                        value={car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="fuel"
                        value={car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="modelYear"
                        value={car.modelYear}
                        onChange={(e) => setCar({ ...car, modelYear: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="price"
                        value={car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                        variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={addCar}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
