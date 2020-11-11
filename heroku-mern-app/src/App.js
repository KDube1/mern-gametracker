import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import NavBar from './components/NavBar';
import { DataGrid } from '@material-ui/data-grid';
import { Typography} from '@material-ui/core';
function App() {
  const [gameData, setGameData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    (async function getGames() {
      let response = await axios.get('/api/games');
      response = response.data;
      console.log(response);
      let arr = []
      for (let i = 0; i < response.length; i++) {

        let tempObj = {
          id: i,
          game: '',
          hours: 0,
          system: '',
          username: ''
        }
        tempObj.id = response[i]._id
        tempObj.game = response[i].game;
        tempObj.hours = response[i].hours;
        tempObj.system = response[i].system;
        tempObj.username = response[i].username;

        arr.push(tempObj);
      }
      console.log(arr);
      setGameData(arr);
    })();

  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'game', headerName: 'Game', width: 200 },
    {
      field: 'hours',
      headerName: 'Hours',
      type: 'number',
      width: 90,
    },
    { field: 'system', headerName: 'System', width: 130 },
    { field: 'username', headerName: 'User', width: 130 }
  ];
  return (
    <div>
      <NavBar />
      <div style={{ height: "500px", width: '100%' }}>
        <DataGrid rows={gameData} columns={columns} pageSize={8} onCellClick={(params) => {
          history.push({pathname:'/edit/' + params.data.id, state: {gameInfo: params.data, id: params.data.id}});
        }}/>
      </div>
      <br/>
      <Typography variant = "h4">
      Click the rows to edit the entry!
      </Typography>
    </div>
  );
}

export default App;
