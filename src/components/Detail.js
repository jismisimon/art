import React from 'react';
import { useLocation } from 'react-router-dom'

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
function Detail(props) {
    const location = useLocation()
    
    console.log(location)
    const {data } = location.state;
    console.log(data)
    return (
        <Container maxWidth="xs">
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           {data.title}
          </Typography>
          <Typography variant="h5" component="div">
          
          
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">{data.artist_display}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"> {data.date_display}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"> {data.main_reference_number}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"> {data.dimensions}</Typography>
          <img src="data:image/gif;base64,R0lGODlhCAAFAPUAAMSSc8WUdsWVd8aVd8qef8SfhsughMaii8enj8igiMili8ykiM6okMmolMisl8mxnNCynsuzoM62o824p9G7qdG+rs6/s9K/sc7Bss7BtdPAsNHFttPEttHCuNHEudDFutPFutLFu9LIvtPIvtPJv9bJvdbKwNbNxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAIAAUAAAYlwAzpIxp5QpYJRVLhnEwdB4CwMGhKoIhCEBgwIJcN5oEoHBKNIAA7"
          style={{width:'100px',height:"100px"}}/>
        </CardContent>
        <CardActions>
        <Link to='/' state={{}}>
          <Button size="small">Back</Button>
          </Link>
        </CardActions>
      </Card>
      </Container>
    );
}
export default Detail;