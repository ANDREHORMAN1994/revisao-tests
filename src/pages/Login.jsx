import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Card, CardActions,
  CardContent, Divider, Fab, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import PetsIcon from '@mui/icons-material/Pets';
import { Stack } from '@mui/system';
import NavigationIcon from '@mui/icons-material/Navigation';

function Login() {
  const history = useHistory();
  return (
    <Box
      component="form"
      sx={ {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: grey[300],
      } }
      noValidate
      autoComplete="off"
    >
      <Card
        sx={ {
          width: '500px',
          height: '50vh',
          margin: 'auto',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          padding: 5,
        } }
      >
        <Stack
          divider={ <Divider orientation="vertical" flexItem /> }
          direction="row"
          justifyContent="center"
          spacing={ 2 }
        >
          <Typography
            color="#1876D1"
            fontWeight="600"
            variant="h4"
            gutterBottom
          >
            PETS
          </Typography>
          <PetsIcon color="success" sx={ { fontSize: 40 } } />
        </Stack>
        <CardContent
          sx={ {
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'space-evenly',
            height: '50%',
          } }
        >
          <TextField
            id="email"
            label="Email"
            variant="standard"
            inputProps={ { style: { fontSize: 20 } } }
            InputLabelProps={ { style: { fontSize: 20 } } }
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            inputProps={ { style: { fontSize: 20 } } }
            InputLabelProps={ { style: { fontSize: 20 } } }
          />
        </CardContent>
        <CardActions>
          <Fab
            onClick={ () => {
              localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));
              history.push('/animal');
            } }
            variant="extended"
            color="primary"
            aria-label="Login"
            size="large"
            sx={ { margin: 'auto',
              padding: '30px 45px',
              fontSize: '20px',
              fontWeight: 600 } }
          >
            <NavigationIcon sx={ { mr: 1 } } />
            Login
          </Fab>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Login;
