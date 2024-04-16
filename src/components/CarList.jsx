
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import EditCar from "./EditCar";
import AddCar from "./AddCar";

export default function CarList() {
    //States
    const [cars, setCars] = useState([]);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackmessage, setSnackMessage] = useState("");

    //Colum Definitions for AGGrid
    const columnDefs = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'modelYear' },
        { field: 'price' },
        {
            // cell renderer for delete button
            headerName: '',
            cellRenderer: params => (
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params.data)}
                >
                    Delete
                </Button>
            ),
            width: 120
        },
        // cell renderer for edit button and using editCar component
        {
            headerName: '',
            cellRenderer: params => (
                <EditCar car={params.data} onSave={updateCar} onCancel={handleCancel} />
            ),
            width: 120
        }
    ];

    useEffect(() => {
        getCars();
    }, []);

    // getCars function
    const getCars = () => {
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars")
            .then(response => response.json())
            .then(responseData => {
                setCars(responseData._embedded.cars);
            })
            .catch(error => console.error(error));
    };

    // updateCar function
    const updateCar = (updatedCar) => {
        fetch(updatedCar._links.car.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCar)
        })
            .then(response => {
                if (response.ok) {
                    setSnackMessage("The car was updated successfully!");
                    setOpenSnackBar(true);
                    getCars();
                } else {
                    window.alert("Something went wrong with saving");
                }
            })
            .catch(error => console.error(error));
    };

    // Function to delete car
    const deleteCar = (car) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            fetch(car._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setSnackMessage("The car was deleted successfully!");
                        setOpenSnackBar(true);
                        getCars();
                    } else {
                        window.alert("Something went wrong with deleting");
                    }
                })
                .catch(error => console.error(error));
        }
    };

    // Saving new car
    const handleSave = (newCar) => {
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
            .then(response => {
                if (response.ok) {
                    setSnackMessage("The car was saved successfully!");
                    setOpenSnackBar(true);
                    getCars();
                } else {
                    window.alert("Something went wrong with saving");
                }
            })
            .catch(error => console.error(error));
    };

    const handleCancel = () => {

    };

    return (
        <>
            <AddCar onSave={handleSave} onCancel={handleCancel} />
            <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackBar(false)}
                message={snackmessage}
            />
        </>
    );
}
