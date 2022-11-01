import {
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import '../App.css';
import Context from '../context/contex';

const endpointDog = 'https://dog.ceo/api/breeds/image/random';
const endpointCat = 'https://api.thecatapi.com/v1/images/search';

export const requestApi = async (endpoint) => {
  if (!endpoint) throw new Error('Endpoint is required');

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Erro ao fazer a requisição: ${error.message}`);
  }
};

function Animal() {
  const {
    animalImg,
    setAnimalImg } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [animalName, setAnimalName] = useState('Cat');

  const handleAnimal = useCallback(async () => {
    let imgUrl = '';
    const endpoint = animalName.includes('Dog') ? endpointDog : endpointCat;
    setLoading(true);
    const data = await requestApi(endpoint);
    if (data) {
      imgUrl = data?.status === 'success'
        ? { name: 'DOG', image: data.message }
        : { name: 'CAT', image: (imgUrl = data[0].url) };
      setAnimalImg(imgUrl);
      setLoading(false);
      global.alert('successful request!');
    }
  }, [animalName, setAnimalImg]);

  useEffect(() => {
    handleAnimal();
  }, [handleAnimal, animalName]);

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
      <h1>{ JSON.parse(localStorage.getItem('user'))?.email || 'não existe email' }</h1>
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
                  role="heading"
                >
                  {animalImg.name}
                </Typography>
                <PetsIcon
                  color={ animalImg.name === 'DOG' ? 'info' : 'success' }
                />
              </Stack>
            </CardContent>
            <CardActions sx={ { paddingBottom: 5 } }>
              <FormControl sx={ { minWidth: 200, margin: 'auto' } }>
                <select
                  className="select-container"
                  value={ animalName }
                  onChange={ ({ target }) => setAnimalName(target.value) }
                >
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
                </select>
              </FormControl>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Animal;
