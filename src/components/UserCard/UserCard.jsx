import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActions
} from '@mui/material';
import styled from '@emotion/styled';

const useStyles = styled((theme) => ({
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
}));


function UserCard({firstName , lastName , email ,countryCode , mobile , country , state , city , address1 , address2 , zipCode , deleteUser, editUser , i}) {
    const classes = useStyles()
  return (
    <Card 
     variant="outlined"
     key={i}
     className={classes.card}    
 >
<CardContent>
 <Typography variant="h5" component="div">
   User Information
 </Typography>
 <Grid container spacing={2}>
   <Grid item xs={3}>
     <Typography variant="body1">First Name:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{firstName}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Last Name:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{lastName}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Email:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{email}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Country Code:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{countryCode}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Mobile:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{mobile}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Address 1:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{address1}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Address 2:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{address2}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">City:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{city}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Country:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{country.join(", ")}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">State:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{state.join(", ")}</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">Zip Code:</Typography>
   </Grid>
   <Grid item xs={3}>
     <Typography variant="body1">{zipCode}</Typography>
   </Grid>
 </Grid>
</CardContent>
<CardActions>
 <Button size="small" onClick={() => editUser(i) } >
   Edit
 </Button>
 <Button size="small" onClick={()=>deleteUser(i)} >
   Delete
 </Button>
</CardActions>
</Card>
  )
}

export default UserCard