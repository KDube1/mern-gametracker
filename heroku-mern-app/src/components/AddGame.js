import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Select, FormControl, MenuItem, InputLabel, TextField, Button, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import NavBar from './NavBar'
export default function AddGame() {
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState('');
    const [game, setGame] = useState('');
    const [hours, setHours] = useState(0);
    const [system, setSystem] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        (async function getUsers() {
            let response = await axios.get('/api/users');
            response = response.data;

            let arr = [];
            for (let i = 0; i < response.length; i++) {
                arr.push(response[i].username);
            }

            setUserList(arr);
        })();

    }, []);

    function postGameEntry() {
        if (isNaN(parseInt(hours)) || user.length < 3 || system === '' || game === '') {
            setErrorOpen(true);
        } else {
            let postObj = {
                username: user,
                game: game,
                hours: parseInt(hours),
                system: system
            }
            axios.post('/api/games/add', postObj)
                .then(res => console.log(res.data));
            setOpen(true);
        }
    }

    return (
        <div>
            <NavBar />
            <br />
            <FormControl>
                <InputLabel >User</InputLabel>
                <Select
                    style={{ width: "100px" }}
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                >
                    {userList.map((username, index) => {
                        return (<MenuItem key={index} value={username}>{username}</MenuItem>);
                    })}
                </Select>
            </FormControl>
            <br />
            <TextField
                style={{ marginTop: "25px" }}
                required
                id="outlined-required"
                label="Game"
                variant="outlined"
                onChange={(event) => setGame(event.target.value)}
            />
            <br />
            <TextField
                style={{ marginTop: "25px" }}
                required
                id="outlined-required"
                label="Hours"
                variant="outlined"
                onChange={(event) => setHours(event.target.value)}
            />
            <br />
            <TextField
                style={{ marginTop: "25px" }}
                required
                id="outlined-required"
                label="System"
                variant="outlined"
                onChange={(event) => setSystem(event.target.value)}
            />
            <br />
            <Button variant="contained" color="primary" style={{ marginTop: "30px" }} onClick={() => { postGameEntry() }}>
                Submit
            </Button>
            <Button variant="contained" color="default" style={{ marginTop: "30px" }} onClick={() => { window.location = '/' }}>
                Back
             </Button>

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
                    Error! Invalid Input.
        </Alert>
            </Collapse>

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
                    Game Added!
        </Alert>
            </Collapse>
        </div>
    )
}