import { useState, useEffect } from 'react'
import { serverURL, getData, postData } from "../../services/fetchNodeServices";
import { Avatar, Grid, TextField, Button, Select, FormHelperText } from "@mui/material"
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Heading from "../../components/heading/heading";
import { FormatColorFill } from '@mui/icons-material';
const useStyles = makeStyles({
    root: {
        width: "80vw",
        height: "100vh",
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
        padding: 15
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default function Waiter() {
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var classes = useStyles();
    const handlephoto = (event) => {
        setFilePhoto({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('restaurantid', restaurantid)
        formData.append('waitername', waitername)
        formData.append('dob', dob)
        formData.append('gender', gender)
        formData.append('mobileno', mobileno)
        formData.append('emailid', emailid)
        formData.append('address', address)
        formData.append('picture', filephoto.bytes)
        var result=await postData('waiters/final_submit', formData)
        if (result.status) {
            Swal.fire({
              icon: 'success',
              title: 'Waiter registered',
              text: result.message,
              position: 'top-end',
              timer: 5000,
              showConfirmButton: false,
              toast: true
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: result.message,
              position: 'top-end',
              timer: 5000,
              showConfirmButton: false,
              toast: true
            })
          }

    }
    const [restaurantid, setRestaurantId] = useState('')
    const [waitername, setWaiterName] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [mobileno, setMobileNo] = useState('')
    const [emailid, setEmailId] = useState('')
    const [address, setAddress] = useState('')
    const [filephoto, setFilePhoto] = useState({ url: '', bytes: '' })
    useEffect(function(){
        setRestaurantId(admin.restaurantid)
    },[])
    return (<div className={classes.root}>
        <div className={classes.box}>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Heading title={'Waiter Registration'} myroute={'/dashboard/displayallwaiter'}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField disabled value={admin.restaurantid} fullWidth label="Restaurant Id" />
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(event) => setWaiterName(event.target.value)} fullWidth label="Waiter Name" />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <FormLabel>Gender </FormLabel>
                        <RadioGroup onClick={(event) => setGender(event.target.value)}
                            row
                        >
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setDob(event.target.value)} fullWidth label="Age" />
                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setMobileNo(event.target.value)} fullWidth label="mobile Number" />
                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setEmailId(event.target.value)} fullWidth label="Email Id" />
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(event) => setAddress(event.target.value)} fullWidth label="Address" />
                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
                        <input hidden onChange={handlephoto}
                            accept="image/*"
                            multiple type="file" />
                       Upload Picture
                    </Button>

                </Grid>
                <Grid item xs={4} className={classes.center}>
                    <Avatar
                        variant='rounded'
                        alt="Remy Sharp"
                        src={filephoto.url}
                        sx={{ width: 56, height: 56 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button input onClick={handleSubmit} hidden fullWidth variant="contained">
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