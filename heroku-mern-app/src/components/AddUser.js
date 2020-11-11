import React, { useState } from 'react'
import axios from 'axios';
import NavBar from './NavBar'
import { Button, TextField, Collapse, IconButton,Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';


export default function AddUser() {

    function postUser(user) {
        let postObj = {
            username: user
        }
        if (user.length >= 3) {
            axios.post('/api/users/add', postObj)
                .then(res => console.log(res.data));
            setOpen(true);
            console.log(user);
        } else {
            setErrorOpen(true);
        }
    }
    const [userText, setUserText] = useState("");
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    return (
        <div>
            <NavBar />
            <br />

            <Typography variant = "h3">Add User</Typography>
            <TextField
                required
                id="outlined-required"
                label="Username"
                variant="outlined"
                onChange={(event) => setUserText(event.target.value)}
            />
            <br />
            <Button variant="contained" color="primary" style={{ marginTop: "30px" }} onClick={() => { postUser(userText) }}>
                Submit
            </Button>
            <Button variant="contained" color="default" style={{ marginTop: "30px" }} onClick={() => { window.location = '/' }}>
                Back
    </Button>

            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    User Added!
        </Alert>
            </Collapse>

            <Collapse in={errorOpen}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setErrorOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Error! Username must be at least 3 characters long
        </Alert>
            </Collapse>
        </div>
    );
}