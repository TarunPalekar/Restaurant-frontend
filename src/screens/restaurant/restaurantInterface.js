import { useState, useEffect } from 'react'

import { serverURL, getData, postData } from "../../services/fetchNodeServices";
import { Avatar, Grid, TextField, Button, Select, FormHelperText } from "@mui/material"
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2'
import Heading from "../../components/heading/heading";
const useStyles = makeStyles({
  root: {
    width: "80vw",
    height: "100%",
    background: '#dfe4ea',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  },
  box: {
    width: "96.5%",
    height: "auto",
    borderRadius: 10,
    background: '#fff',
  padding:'10px'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default function RestaurantInterface() {
  var classes = useStyles()
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [stateid, setStateId] = useState('')
  const [cityid, setCityId] = useState('')
  const [restaurantname, setRestaurantName] = useState('')
  const [ownername, setOwnerName] = useState('')
  const [phoneno, setPhoneNO] = useState('')
  const [mobileno, setMobileNO] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [url, setUrl] = useState('')
  const [fssaino, setFssaiNo] = useState('')
  const [gstno, setGstNo] = useState('')
  const [gsttype, setGstType] = useState('')
  const [fileshopact, setFileShopAct] = useState({ url: '', bytes: '' })
  const [filefssai, setFileFssai] = useState({ url: '', bytes: '' })
  const [filelogo, setFileLogo] = useState({ url: '', bytes: '' })
  const [resError, setResError] = useState({})
  const [password,setPassword]=useState('')
  const generatePassword=()=>
  {
     var pwd=parseInt((Math.random()*8999)+1000)
     return pwd
  }
  const handleError = (error, input, message) => {
    setResError(prevState => ({ ...prevState, [input]: { 'error': error, 'message': message } }))
    console.log('cc', resError)
  }
  const validation = () => {
    var submitRecord = true
    if (restaurantname.trim().length == 0) {
      handleError(true, "restaurantname", 'pls input restaurant name')
      submitRecord = false
    }
    if (ownername.trim().length == 0) {
      setResError((prevState) => ({ ...prevState, ownername: { error: true, message: 'Pls input owner Name' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!mobileno || !(/^[0-9]{10}$/).test(mobileno)) {
      setResError((prevState) => ({ ...prevState, mobileno: { error: true, message: 'Pls input correct number' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      setResError((prevState) => ({ ...prevState, email: { error: true, message: 'Pls input correct email' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!address) {
      setResError((prevState) => ({ ...prevState, address: { error: true, message: 'Pls input address' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!stateid) {
      setResError((prevState) => ({ ...prevState, stateid: { error: true, message: 'Pls select state' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!cityid) {
      setResError((prevState) => ({ ...prevState, cityid: { error: true, message: 'Pls select city' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!fssaino) {
      setResError((prevState) => ({ ...prevState, fssaino: { error: true, message: 'Pls input fssai number' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!gstno) {
      setResError((prevState) => ({ ...prevState, gstno: { error: true, message: 'Pls input gst number' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!gsttype) {
      setResError((prevState) => ({ ...prevState, gsttype: { error: true, message: 'Pls select type' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!filefssai.url) {
      handleError(true, 'filefssai', 'Pls upload file')
      submitRecord = false
    }
    if (!fileshopact.url) {
      handleError(true, 'fileshopact', 'Pls upload file')
      submitRecord = false
    }
    if (!filelogo.url) {
      handleError(true, 'file', 'Pls upload file')
      submitRecord = false
    }
    return submitRecord
  }
  const handleSubmit = async () => {
    var error = validation()
    console.log("After Submit:", resError)
    if (error) {
      var formData = new FormData()
      formData.append('restaurantname', restaurantname)
      formData.append('ownername', ownername)
      formData.append('phoneno', phoneno)
      formData.append('mobileno', mobileno)
      formData.append('email', email)
      formData.append('address', address)
      formData.append('url', url)
      formData.append('fssaino', fssaino)
      formData.append('gst', gstno)
      formData.append('gsttype', gsttype)
      formData.append('stateid', stateid)
      formData.append('cityid', cityid)
      formData.append('filefssai', filefssai.bytes)
      formData.append('fileshopact', fileshopact.bytes)
      formData.append('filelogo', filelogo.bytes)
      formData.append('password',generatePassword())
      var d = new Date()
      var cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      formData.append('createdat', cd)
      formData.append('updatedat', cd)
    
      var result = await postData('restaurants/final_submit', formData)
      if (result.status) {
        Swal.fire({
          icon: 'success',
          title: 'Restaurant Registration',
          text: result.message,
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message,
        })
      }
    }
  }
  const fetchAllCities = async (stateid) => {
    var body = { stateid: stateid }
    var result = await postData('statecity/fetch_all_cities', body)
    console.log(result)
    setCities(result.data)

  }
  const handleStateChange = (event) => {
    setStateId(event.target.value)
    fetchAllCities(event.target.value)
  }
  const fetchAllStates = async () => {
    var result = await getData('statecity/fetch_all_states')
    console.log(result.data)
    setStates(result.data)
  }
  useEffect(function () {
    fetchAllStates()
  }, [])
  const handleFssai = (event) => {
    setFileFssai({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }
  const handleShopAct = (event) => {
    setFileShopAct({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }
  const handleLogo = (event) => {
    setFileLogo({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }
  const fillState = () => {
    return states.map((item) => {
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>
    })
  }
  const fillCities = () => {
    return cities.map((item) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
    })
  }
  return (<div className={classes.root} >
    <div className={classes.box}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Heading title={"Restaurant Register"} myroute={'/admindashboard/displayallrestaurant'}/>
        </Grid>
        <Grid item xs={6}>
          <TextField onFocus={() => handleError(false, restaurantname, '')}
            error={resError?.restaurantname?.error}
            label="Restaurant Name"
            fullWidth
            helperText={resError?.restaurantname?.message} onChange={(event) => setRestaurantName(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onFocus={() => { handleError(false, ownername, '') }} onChange={(event) => setOwnerName(event.target.value)} label="Owner Name" fullWidth
            error={resError?.ownername?.error}
            helperText={resError?.ownername?.message} />
        </Grid>
        <Grid item xs={4}>
          <TextField onChange={(event) => setPhoneNO(event.target.value)} label="Phone Number" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onFocus={() => { handleError(false, mobileno, '') }} onChange={(event) => setMobileNO(event.target.value)} label="Mobile Number" fullWidth
            error={resError?.mobileno?.error}
            helperText={resError?.mobileno?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onFocus={() => { handleError(false, email, '') }} onChange={(event) => setEmail(event.target.value)} label="Email Address" fullWidth
            error={resError?.email?.error}
            helperText={resError?.email?.message} />
        </Grid>
        <Grid item xs={12}>
          <TextField onFocus={() => handleError(false, address, '')}
            error={resError?.address?.error} onChange={(event) => setAddress(event.target.value)} label="Address" fullWidth
            helperText={resError?.address?.message} />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>States</InputLabel>
            <Select label="States" value={stateid} onFocus={() => handleError(false, stateid, '')}
              error={resError?.stateid?.error}
              onChange={handleStateChange}>
              <MenuItem>-Select State-</MenuItem>
              {fillState()}
            </Select>
            <FormHelperText style={{ color: 'red' }}>{resError?.stateid?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select label="City" value={cityid} onFocus={() => handleError(false, cityid, '')}
              error={resError?.cityid?.error} onChange={(event) => setCityId(event.target.value)}>
              <MenuItem>-Select City-</MenuItem>
              {fillCities()}
            </Select>
            <FormHelperText style={{ color: 'red' }}>{resError?.cityid?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField onChange={(event) => setUrl(event.target.value)} label="URL" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField onFocus={() => handleError(false, fssaino, '')}
            error={resError?.fssaino?.error}
            helperText={resError?.fssaino?.message} onChange={(event) => setFssaiNo(event.target.value)} label="Fssai Number" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField onFocus={() => handleError(false, gstno, '')}
            error={resError?.gstno?.error}
            helperText={resError?.gstno?.message} onChange={(event) => setGstNo(event.target.value)} label="GST Number" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>GST Type</InputLabel>
            <Select label="GST Type"
              onFocus={() => handleError(false, gsttype, '')}
              error={resError?.gsttype?.error}
              onChange={(event) => setGstType(event.target.value)}>
              <MenuItem>-Select Gst Type-</MenuItem>
              <MenuItem value="5">5 Star</MenuItem>
              <MenuItem value="0">Other</MenuItem>
            </Select>
            <FormHelperText style={{ color: 'red' }}>{resError?.gsttype?.message} </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
            <input onFocus={() => handleError(false, filefssai, '')}
              error={resError?.filefssai?.error} onChange={handleFssai} hidden
              accept="image/*"
              multiple type="file" />
            Upload Fssai
          </Button>
          {resError?.filefssai?.error ? <div style={{ color: 'red', fontSize: '0.8rem', margin: 5 }}>{resError?.filefssai?.message}</div> : <></>}
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
            <input onChange={handleShopAct} hidden
              accept="image/*"
              multiple type="file" />
            Upload Shop Act
          </Button>
          {resError?.fileshopact?.error ? <div style={{ color: 'red', fontSize: '0.8rem', margin: 5 }}>{resError?.fileshopact?.message}</div> : <></>}
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
            <input onChange={handleLogo} hidden
              accept="image/*"
              multiple type="file" />
            Upload Logo
          </Button>
          {resError?.filelogo?.error ? <div style={{ color: 'red', fontSize: '0.8rem', margin: 5 }}>{resError?.filelogo?.message}</div> : <></>}
        </Grid>
        <Grid item xs={4} className={classes.center}>
          <Avatar
            variant='rounded'
            alt="Remy Sharp"
            src={filefssai.url}
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
        <Grid item xs={4} className={classes.center}>
          <Avatar
            variant='rounded'
            alt="Remy Sharp"
            src={fileshopact.url}
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
        <Grid item xs={4} className={classes.center}>
          <Avatar
            variant='rounded'
            alt="Remy Sharp"
            src={filelogo.url}
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button input hidden onClick={handleSubmit} fullWidth variant="contained">
            Submit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained">
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  </div>)
}