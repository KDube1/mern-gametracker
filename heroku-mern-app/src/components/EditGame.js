import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {  TextField, Button, Collapse, IconButton, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import NavBar from './NavBar'
import { useHistory } from 'react-router-dom';
export default function EditGame() {
    const history = useHistory();
    const [gameInfo, setGameInfo] = useState(history.location.state.gameInfo);
    const [postId, setPostId] = useState(history.location.state.id);
    const [user, setUser] = useState(gameInfo.username);
    const [game, setGame] = useState(gameInfo.game);
    const [hours, setHours] = useState(gameInfo.hours);
    const [system, setSystem] = useState(gameInfo.system);
    const [errorOpen, setErrorOpen] = useState(false);
    const [open, setOpen] = useState(false);
    function postGameUpdate() {
        if (isNaN(parseInt(hours)) || user.length < 3 || system === '' || game === '') {
            setErrorOpen(true);
        } else {
            let postObj = {
                username: user,
                game: game,
                hours: parseInt(hours),
                system: system
            }
            axios.post('/api/games/update/' + postId, postObj)
                .then(res => console.log(res.data));
            setOpen(true);
        }
    }
    return (
        <div>
            <NavBar/>
            <Typography variant="h2">Edit Game</Typography>
            <TextField
            style={{ marginTop: "25px" }}
            required
            label="Game"
            variant="outlined"
            defaultValue={game}
            onChange={(event) => setGame(event.target.value)}
        />
            <br />
            <TextField
                style={{ marginTop: "25px" }}
                required
                label="Hours"
                defaultValue={hours}
                variant="outlined"
                onChange={(event) => setHours(event.target.value)}
            />
            <br />
            <TextField
                style={{ marginTop: "25px" }}
                required
                defaultValue={system}
                label="System"
                variant="outlined"
                onChange={(event) => setSystem(event.target.value)}
            />
            <br />
            <Button variant="contained" color="primary" style={{ marginTop: "30px" }} onClick={() => { postGameUpdate() }}>
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
                    Game Updated!
        </Alert>
            </Collapse></div>



    )
}