import { useState, useEffect } from 'react'

import { serverURL, getData, postData } from "../../services/fetchNodeServices";
import { Avatar, Grid, TextField, Button, Select, FormHelperText } from "@mui/material"
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2'
import Heading from "../../components/heading/heading";
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
export default function TableBooking() {
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var classes = useStyles();
    const edit = () => {
        alert('hello')
    }
    const handleSubmit= async()=>{
        var body={'restaurantid':restaurantid,
    'tableno':tableno, 'noofchair':noofChair,
'floor':floor}
var result=await postData('tablebooking/final_submit',body)
console.log(result.status)
if (result.status) {
    Swal.fire({
      icon: 'success',
      title: 'Table Registration',
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

    const [restaurantid, setRestaurantId] = useState('')
    const [tableno, setTableNo] = useState('')
    const [noofChair, setNoOfChair] = useState('')
    const [floor, setFloor] = useState('')
    useEffect(function(){
        setRestaurantId(admin.restaurantid)
    },[])
    return (<div className={classes.root} >
        <div className={classes.box} >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Heading title={'Table Registration'} myroute={'/dashboard/displaytable'}/>
                </Grid>
              
                <Grid item xs={10}>
                    <TextField disabled value={admin.restaurantid} fullWidth label="Restaurant Id" />
                </Grid>
                <Grid item xs={10} fullWidth>
                    <TextField onChange={(event) => setTableNo(event.target.value)} fullWidth  title={'Number of Table on floor'} label="Table Number" />
                </Grid>
                <Grid item xs={10}>
                    <TextField onChange={(event) => setNoOfChair(event.target.value)} fullWidth label="Number Of Chair" />
                </Grid>
                <Grid item xs={10} >
                    <FormControl fullWidth>
                        <InputLabel>Floor</InputLabel>
                        <Select label="floor" onChange={(event) => setFloor(event.target.value)}>


                        <MenuItem>-Select Catagory-</MenuItem>
                        <MenuItem value='1'>1</MenuItem>
                        <MenuItem value='2'>2</MenuItem>
                        <MenuItem value='3'>3</MenuItem>
                        <MenuItem value='open top'>open top</MenuItem>
                        <MenuItem value='Garden'> Garden</MenuItem>


                    </Select>

                </FormControl>
            </Grid>
            <Grid item xs={5}>
                <Button input hidden onClick={handleSubmit}fullWidth variant="contained">
                    Submit
                </Button>
            </Grid>
            <Grid item xs={5}>
                <Button fullWidth variant="contained">
                    Reset
                </Button>
            </Grid>
        </Grid>


    </div>
    </div >)
}


