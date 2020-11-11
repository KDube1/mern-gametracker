import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#c5aa6a'
      }
    }
  });
export default function NavBar() {
    return (
        <div>
             <MuiThemeProvider theme={theme}>
            <AppBar color ="secondary" position="static">
                <Toolbar>
                    <Link  style={{ color:"black" }} to = "/">
                    <Typography variant="h6" style ={{marginRight:"20px"}}>GameTracker </Typography>
                    </Link>
                    <Link  style={{ color:"black"  }} to= "/add-user">
                    <Typography variant="h6"style ={{marginRight:"25x"}} >Add User </Typography>
                    </Link>
                    <Link  style={{ color:"black" }} to ="/add-game">
                    <Typography variant="h6" style ={{marginRight:"25px" , marginLeft:"25px"}}>Add Game Entry </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            </MuiThemeProvider>
        </div>

    );
}