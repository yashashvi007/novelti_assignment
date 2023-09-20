import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select , 
  Autocomplete,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Form({data , isEdit , editIndex ,onClose , toggleRefresh}) {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    mobile: data?.mobile || '',
    address1: data?.address1 || '',
    address2: data?.address2 || '',
    state: data?.state || [],
    city: data?.city || '',
    country: data?.country || [],
    zipCode: data?.zipCode || '',
    countryCode : data?.countryCode || ''
  });

  const [countryCodes , setCountryCodes] = useState([])
  const [countries , setCountries] = useState([])
  const [authToken , setAuthToken] = useState('')
  const [states , setStates] = useState([])
  const [loading , setLoading] = useState(true)

  const [firstNameError , setFirstNameError] = useState('')
  const [lastNameError , setLastNameError] = useState('')
  const [emailError , setEmailError] = useState('')
  const [countryCodeError , setCountryCodeError] = useState('')
  const [mobileError , setMobileError] = useState('')
  const [addressError , setAddressError] = useState('')
  const [zipCodeError , setZipCodeError] = useState('')
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    if(name === "firstName"){
      handleFirstNameValidation(value.trim())
    }else if(name === "lastName"){
      handleLastNameValidation(value.trim())
    }else if(name === "email"){
      handleEmailValidation(value.trim())
    }else if(name === "mobile"){
      handleMobileValidation(value.trim())
    }else if(name === "address1"){
      handleAddressValidation(value.trim())
    }else if(name === "zipCode"){
      handleZipCodeValidation(value.trim())
    }
  };

  const handleCountryCodeChange = (e) => {
    setFormData({
      ...formData,
      countryCode: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(firstNameError !== '' || lastNameError !== '' || emailError !== '' || mobileError !== '' || addressError !== '' || zipCodeError !== ''){
      alert('Please do the required validation')
      return
    }
    
    const {firstName , lastName , email , mobile , address1 , address2 , city , country , countryCode , state , zipCode} = formData
    const newUser = {
      firstName,
      lastName , 
      email , 
      countryCode ,
      mobile  , 
      address1  , 
      address2 , 
      city , 
      country , 
      state , 
      zipCode
    }
    if(!isEdit){
      let users = [];
      const storedUsers = localStorage.getItem('users');
  
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }
  
      users.push(newUser);
  
  
      localStorage.setItem('users', JSON.stringify(users));
      navigate('/')
    }else {
      let users = [];
      const storedUsers = localStorage.getItem('users');
  
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }

      users[editIndex] = newUser
      localStorage.setItem('users' , JSON.stringify(users))
      toggleRefresh()
      onClose()
    }
    
  };


  const getToken =async () => {
    try {
      const tokenRes  =  await fetch('https://www.universal-tutorial.com/api/getaccesstoken' , {
        method : "GET" , 
        headers : {
          "Accept": "application/json",
          "api-token": "8CXYehSXMOoy9S2PW7Ovj4tUCb--rJ5OY9jKfWfV_JP8NkZFTLJMuiItc7BLLSIslMo",
            "user-email": "yashashvimaurya@gmail.com"
          }
      })

      const res =await tokenRes.json()
      setAuthToken(res.auth_token)
    } catch (error) {
      
    }
  }

  const getCountries =async () => {
    const res = await fetch('https://www.universal-tutorial.com/api/countries/', {
      method : "GET",
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      },
    })

    const data = await res.json()

    setCountryCodes(data.map(c => {return {label : c.country_short_name , value : '+' + c.country_phone_code }}))
    setCountries(data.map(c => c.country_name))
  }
  

  useEffect(()=> {
    const selectState = async () => {
     
      try {
        const res = await fetch(`https://www.universal-tutorial.com/api/states/${formData.country[formData.country.length -1]}` ,{
          method : "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json'
          },
        })
        const data = await res.json()
        setStates(data.map(s => s.state_name))
      } catch (error) {
        
      }
    }
    if(formData.country.length>0){
        selectState()
    }
   
  } , [formData.country.length])

  useEffect(()=> {
      if(authToken === ''){
        getToken()
      }
      if(authToken!==''){
        getCountries()
      }
  } , [authToken])

 

  const handleFirstNameValidation = (firstName)=> {
    
    if (firstName === '') {
      setFirstNameError('First Name is required');
    } else if (firstName.length < 5) {
      setFirstNameError('First Name must be at least 5 characters');
    } else {
      setFirstNameError('');
    }
  }

  const handleLastNameValidation = (lastName) => {
    
    if (lastName === '') {
      setLastNameError('Last Name is required');
    } else if (lastName.length < 5) {
      setLastNameError('Last Name must be at least 5 characters');
    } else {
      setLastNameError('');
    }
  }

  const handleEmailValidation = (email) => {
    
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  }

  const handleCountryCodeError = (code) => {
      if(code === ''){
        setCountryCodeError('Country code is required')
      }else {
        setCountryCodeError('')
      }
  }

  const handleMobileValidation = (mobile)=> {
    if(mobile === ''){
      setMobileError('Phone number is required')
    }else if(!(/^(?:\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4}|\(\d{3}\)\s?\d{3}[-\s]\d{4}|\(\d{3}\)\d{7})$/.test(mobile))){
      setMobileError('Invalid phone number')
    }else {
      setMobileError('')
    }
  }

  const handleAddressValidation = (address) => {
    if(address === ''){
      setAddressError('Address1 is mandatory')
    }else {
      setAddressError('')
    }
  }

  const handleZipCodeValidation = (zipcode) => {
    if(zipcode === ''){
      setZipCodeError('ZipCode is required')
    }else if(!(/^[0-9]+$/.test(zipcode))) {
      setZipCodeError('Zipcode is invalid')
    }else {
      setZipCodeError('')
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    if (name === 'firstName') {
      handleFirstNameValidation(value.trim())
    }else if(name === 'lastName'){
      handleLastNameValidation(value.trim())
    }else if(name === 'email'){
      handleEmailValidation(value.trim())
    }else if(name === 'countryCode'){
      handleCountryCodeError(value.trim())
    }else if(name === 'mobile'){
      handleMobileValidation(value.trim())
    }else if(name === 'address1'){
      handleAddressValidation(value.trim())
    }else if(name === 'zipCode'){
      handleZipCodeValidation(value.trim())
    }
  }



  return (
    <Container maxWidth="sm" style={{marginTop : 50}} >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.firstName}
              required
              onBlur={handleBlur}
              error={Boolean(firstNameError)} 
              helperText={firstNameError} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.lastName}
              required
              onBlur={handleBlur}
              error={Boolean(lastNameError)} 
              helperText={lastNameError} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Id"
              name="email"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.email}
              required
              onBlur={handleBlur}
              error={Boolean(emailError)} 
              helperText={emailError} 
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl variant="outlined" fullWidth  >
              <InputLabel>Country Code</InputLabel>
              <Select
                label="CountryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleCountryCodeChange}
                required
                onBlur={handleBlur}
                error={Boolean(countryCodeError)} 
                helperText={countryCodeError} 
              >
                {countryCodes.map((countryCode) => (
                  <MenuItem key={countryCode.value} value={countryCode.value}>
                    {countryCode.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Mobile No"
              name="mobile"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.mobile}
              required
              onBlur={handleBlur}
              error={Boolean(mobileError)} 
              helperText={mobileError} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address 1"
              name="address1"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.address1}
              required
              onBlur={handleBlur}
              error={Boolean(addressError)} 
              helperText={addressError} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address 2"
              name="address2"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.address2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <Autocomplete
                multiple={true}
                value={formData.country}
                onChange={(event , newValue)=> {
                    setFormData({
                      ...formData,
                      country : newValue
                    })
                }}
                id="country-select-demo"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'on', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
              <Autocomplete
                multiple={true}
                value={formData.state}
                onChange={(event , newValue)=> {
                  setFormData({
                    ...formData,
                    state : newValue
                  })
                }}
                id="country-select-demo"
                options={states}
                autoHighlight
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a state"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'on', 
                    }}
                  />
                )}
              />
            
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.city}
              required
            />
          </Grid>
        
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              name="zipCode"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={formData.zipCode}
              required
              onBlur={handleBlur}
              error={Boolean(zipCodeError)} 
              helperText={zipCodeError} 
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: '16px' }}
        >
          {isEdit ? "Save" : "Submit"}
        </Button>
      </form>
    </Container>
  );
}

export default Form;
