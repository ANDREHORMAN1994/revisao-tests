import {
  Autocomplete,
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';

const endpointDog = 'https://dog.ceo/api/breeds/image/random';
const endpointCat = 'https://api.thecatapi.com/v1/images/search';

function App() {
  const [loading, setLoading] = useState(false);
  const [animalImg, setAnimalImg] = useState('');

  const requestApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  };

  const handleAnimal = useCallback(async (value) => {
    let imgUrl = '';
    const endpoint = value.includes('Dog') ? endpointDog : endpointCat;
    setLoading(true);
    const data = await requestApi(endpoint);
    imgUrl = data?.status === 'success'
      ? { name: 'DOG', image: data.message }
      : { name: 'CAT', image: (imgUrl = data[0].url) };
    setAnimalImg(imgUrl);
    setLoading(false);
    global.alert('successful request!');
  }, []);

  useEffect(() => {
    handleAnimal(endpointDog);
  }, [handleAnimal]);

  return loading ? (
    <Backdrop
      sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
      open={ loading }
    >
      <CircularProgress color="inherit" />
      <h1>Loading...</h1>
    </Backdrop>
  ) : (
    <div>
      <Typography
        gutterBottom
        variant="h2"
        component="header"
        align="center"
        sx={ { background: animalImg.name === 'DOG' ? '#0088d1' : '#2f7c31',
          color: 'white',
          margin: 0,
          fontWeight: 600 } }
      >
        DOGS VS CATS
      </Typography>
      <Grid container sx={ { height: '100vh', background: '#e5e5e5' } }>
        <Grid item xs={ 12 } sx={ { margin: 'auto' } }>
          <Card sx={ { maxWidth: 500, margin: 'auto' } }>
            <CardMedia
              component="img"
              height="400"
              image={ animalImg.image }
              alt="animalImg"
            />
            <CardContent>
              <Stack direction="row" spacing={ 2 } justifyContent="center">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="p"
                  align="center"
                  fontWeight="600"
                >
                  {animalImg.name}
                </Typography>
                <PetsIcon
                  color={ animalImg.name === 'DOG' ? 'info' : 'success' }
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Stack
                direction="row"
                justifyContent="center"
                width="100vw"
                paddingBottom={ 5 }
              >
                <Autocomplete
                  disablePortal
                  id="select-animals"
                  options={ ['Cat', 'Dog'] }
                  onChange={ (_, value) => handleAnimal(value) }
                  sx={ { width: 300 } }
                  renderInput={ (params) => (
                    <TextField { ...params } label="Dog or Cat" />
                  ) }
                />
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
