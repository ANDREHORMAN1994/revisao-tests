import { Button, Card, CardActions,
  CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';

const endpointDog = 'https://dog.ceo/api/breeds/image/random';
const endpointCat = 'https://api.thecatapi.com/v1/images/search';

function App() {
  const [loading, setLoading] = useState(true);
  const [animal, setAnimal] = useState('');

  const requestApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  };

  const handleAnimal = useCallback(async (endpoint) => {
    let imgUrl = '';
    setLoading(true);
    const data = await requestApi(endpoint);
    imgUrl = data?.status === 'success'
      ? { name: 'Dog', image: data.message }
      : { name: 'Cat', image: imgUrl = data[0].url };
    setAnimal(imgUrl);
    setLoading(false);
  }, []);

  useEffect(() => {
    handleAnimal(endpointDog);
  }, [handleAnimal]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Grid container spacing={ 2 } sx={ { height: '100vh' } }>
      <Grid item xs={ 12 } sx={ { margin: 'auto' } }>
        <Card sx={ { maxWidth: 500, margin: 'auto' } }>
          <CardMedia
            component="img"
            height="400"
            image={ animal.image }
            alt="animal"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {animal.name}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
          </CardContent>
          <CardActions>
            <Stack direction="row" spacing={ 2 }>
              <Button
                variant="contained"
                color="error"
                startIcon={ <PetsIcon /> }
                onClick={ () => handleAnimal(endpointDog) }
              >
                DOGS
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={ <PetsIcon /> }
                onClick={ () => handleAnimal(endpointCat) }
              >
                CATS
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
