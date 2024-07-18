import * as React from 'react';
import { useState, useEffect } from 'react'
import { serverURL, getData, postData } from "../../services/fetchNodeServices";
import { Avatar, Grid, TextField, Button, Select } from "@mui/material"
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



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

export default function WaiterTableInterface() {
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  var classes = useStyles()
  const [restaurantId, setrestaurantId] = useState('')
  const [waiterId, setWaiterId] = useState([])
  const [waiterName, setWaiterName] = useState('')
  const [Floor, setFloor] = useState('')
  const [FloorId, setFloorId] = useState([])
  const [Tableno, setTableNo] = useState('')
  const [TableId, setTableId] = useState([])
  const [date, setDate] = useState('')
  const fetchwaitername = async () => {
    var result = await postData('waiters/fetch_all_waiter',{restaurantid:admin.restaurantid})
    setWaiterId(result.data)

  }
  const fetchfloor = async () => {
    var result = await postData('tablebooking/fetch_all_floor',{restaurantid:admin.restaurantid})

    setFloorId(result.data)
    

  }
  const fetchtable = async () => {
    var result = await postData('tablebooking/fetch_all_table',{restaurantid:admin.restaurantid})

    setTableId(result.data)
    

  }
  const fillwaiter = () => {
    return waiterId.map((item) => {
      return <MenuItem value={item.waiterid}>{item.waitername}</MenuItem>
    })

  }
  const fillFloor = () => {
    return FloorId.map((item) => {
      return <MenuItem value={item.floor}>{item.floor}</MenuItem>
    })

  }
  const filltable = () => {
    return TableId.map((item) => {
      return <MenuItem value={item.tableid}>{item.tableno}</MenuItem>
    })

  }
  const handleDate=(event)=>{
    const m=String(Number(event.$M)+1);
    const d=String(event.$D);
    const y=String(event.$y);
    setDate(y+"-"+m+"-"+d);   
  }

  const handleSubmit=async()=>{
    var body={
      "restaurantid":restaurantId,
      'waiterid':waiterName,
      'floorno':Floor,
      'tablenoid':Tableno,
      'currentdate':date

    
      
    }
    var result=await postData('waitertable/final_submit',body)

    alert(result.status)
  }

  useEffect(function () {
    fetchwaitername()
    fetchfloor()
    fetchtable()
    setrestaurantId(admin.restaurantid)
  }, [])
  return (<div className={classes.root}>
    <div className={classes.box}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Heading title={"Waiter Registration"} myroute={'/dashboard/displayallwaitertable'} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled value={admin.restaurantid} fullWidth label="Restaurant Id" />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Waiter Name</InputLabel>
            <Select onChange={(event)=>{setWaiterName(event.target.value)}} label={"Category Name"}


            >
              <MenuItem>-Select Waiter-</MenuItem>
              {fillwaiter()}
            </Select>

          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Floor No</InputLabel>
            <Select onChange={(event)=>{setFloor(event.target.value)}} label={"Floor no"}

            >
              <MenuItem>-Select Floor-</MenuItem>
              {fillFloor()}

            </Select>

          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Table No</InputLabel>
            <Select  onChange={(event)=>{setTableNo(event.target.value)}} label={"Table no"}

            >
              <MenuItem>-Select Table No-</MenuItem>
              {filltable()}
            </Select>

          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider   dateAdapter={AdapterDayjs}>
            <DemoContainer   components={['DatePicker']}>
              <DatePicker   onChange={handleDate} label="Choose Date" />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>



        <Grid item xs={6}>
          <Button variant="contained" onClick={handleSubmit} fullWidth>Submit</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth>Reset</Button>
        </Grid>

      </Grid>
    </div>
  </div >)
}