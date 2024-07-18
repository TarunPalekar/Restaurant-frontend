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
export default function SubCatagoryInterface() {
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const classes = useStyles();
    const [catagoryname, setCatagoryName] = useState([])
    const [restaurantid, setRestaurantId] = useState('')
    const [catagoryid, setCatagoryId] = useState('')

    const [fooditemname, setFoodItemName] = useState('')
    const [foodtype, setFoodType] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [price, setPrice] = useState('')
    const [offerprice, setOfferPrice] = useState('')
    const [fileicon, setFileIcon] = useState({ url: '', bytes: '' })

    const fetchAllCatagory = async () => {
        var result = await getData('subcatagory/fetch_all_catagory')
        console.log(result.data)
        setCatagoryName(result.data)

    }
    const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('restaurantid',restaurantid)
        formData.append('catagoryid', catagoryid)
        formData.append('fooditemname',fooditemname)
        formData.append('foodtype',foodtype)
        formData.append('ingredients',ingredients)
        formData.append('price',price)
        formData.append('offerprice',offerprice)
        formData.append('icon',fileicon.bytes)
        var result=await postData('subcatagory/final_submit',formData)
        console.log(formData.data)
        if (result.status) {
            Swal.fire({
              icon: 'success',
              title: 'Food Item registered',
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
    const handleIcon=(event)=>
    {
        setFileIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const fillAllCatagory=()=>{

        return catagoryname.map((item)=>{
            return <MenuItem value={item.catagoryid}>{item.catagoryname}</MenuItem>
        })
    }
    useEffect(function(){
        setRestaurantId(admin.restaurantid)
        fetchAllCatagory()
    },[])


    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading title={"Restaurant Register"} myroute={'/dashboard/displaysubcatagory'} />
                </Grid>
                <Grid item xs={6}>
                    <TextField  disabled value={admin.restaurantid} fullWidth label="Restaurant Id" />
                </Grid>
                <Grid item xs={4} >
                    <FormControl fullWidth>
                        <InputLabel>Catagory</InputLabel>
                        <Select label="catagory" onChange={(event)=>setCatagoryId(event.target.value)}>

                        
                            <MenuItem>-Select Catagory-</MenuItem>
                            {fillAllCatagory()}

                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(event) => setFoodItemName(event.target.value)} fullWidth label="Food Name" />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <FormLabel>Type </FormLabel>
                        <RadioGroup   onChange={(event)=>setFoodType(event.target.value)}
                            row
                            >
                            <FormControlLabel value="Veg" control={<Radio />} label="Veg" />
                            <FormControlLabel value="Non veg" control={<Radio />} label="Non Veg" />

                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(event) => setIngredients(event.target.value)} fullWidth label="Ingredients" />
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(event) => setPrice(event.target.value)} fullWidth label="Price" />

                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(event) => setOfferPrice(event.target.value)} fullWidth label="Offer Price" />

                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
                        <input hidden onChange={handleIcon}
                            accept="image/*"
                            multiple type="file" />
                        Upload Icon
                    </Button>

                </Grid>
                <Grid item xs={4} className={classes.center}>
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
    </div >)
}