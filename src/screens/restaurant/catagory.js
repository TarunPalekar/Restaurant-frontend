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
    justifyContent: 'center',
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
 


 export default function CatagoryInterface(){
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const classes=useStyles();
    const [restaurantid, setRestaurantId]=useState('')  
    const[catagoryname, setCatagoryName]=useState('')
    const[fileicon, setFileIcon]=useState({url:'', bytes:''})
    const handleIcon=(event)=>{
        setFileIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
       
    }
    const handleSubmit= async()=>{
     
        var formData=new FormData()
        formData.append('restaurantid',restaurantid ) 
        formData.append('catagoryname', catagoryname)
        formData.append('icon', fileicon.bytes)
       
        var result=await postData('catagory/catagory_submit', formData)
       
        console.log(result.status)
        if (result.status) {
            Swal.fire({
              icon: 'success',
              title: 'Catagory Registration',
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
useEffect(function(){
  console.log(admin)
  setRestaurantId(admin.restaurantid)
},[])

    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Heading title={"Restaurant Register"} myroute={'/dashboard/displayallcatagory'}/>
        </Grid>
        <Grid item xs={12}>
            <TextField   value={admin.restaurantid}
          disabled fullWidth label="Restaurant Id"/>
        </Grid>
        <Grid item xs={12}>
            <TextField onChange={(event)=>setCatagoryName(event.target.value)} fullWidth label="Catagory Name"/>

        </Grid>
        <Grid item xs={4}  style={{display:'flex', flexDirection:'row'}}>
          
         <Button  fullWidth component='label' variant='contained' endIcon={<UploadFile/>}>
               < input hidden  onChange={handleIcon}
                accept="image/*"
                multiple type="file"
                
               />

                Upload Logo
            </Button>
           </Grid>
           <Grid item xs={6} style={{paddingLeft:'100px'}}>
           <Avatar
            variant='rounded'
            alt="Remy Sharp"
            src={fileicon.url}
            
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