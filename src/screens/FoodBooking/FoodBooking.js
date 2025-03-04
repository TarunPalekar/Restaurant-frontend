import { useEffect, useState } from 'react'
import { TextField, Grid, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import { useStyles } from "./FoodBookingCss";
import { getData, postData } from '../../services/fetchNodeServices';
import TableComponent from '../../components/TableComponenet/TableComponent';
import CategoryComponent from '../../components/CatagoryComponent/CatagoryComponent';
import TableCart from '../../components/TableCart/TableCart';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Reports from '../../components/Report/Reports';
import { Routes, Route } from 'react-router-dom';

export default function FoodBooking(props) {
  
 
  const classes = useStyles();
  var navigate = useNavigate();
  var admin = JSON.parse(localStorage.getItem('ADMIN'))
  const [currentDate, setCurrentDate] = useState('')
  const [waiter, setWaiter] = useState([]);
  const [waiterId, setWaiterId] = useState("");
  const [waiterName, setWaiterName] = useState("");
  const [floorNo, setFloorNo] = useState('')
  const [tableNo, setTableNo] = useState('')
  const [refresh, setRefresh] = useState(false)



  const getCurrentDate = () => {
    var date = new Date()
    var cd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    return cd
  }
  const getCurrentTime = () => {
    var time = new Date()
    var ct = time.getHours() + ":" + time.getMinutes()
    return ct

  }
  const fetchAllWaiter = async () => {
    const result = await postData('waiters/fetch_all_waiter', { restaurantid: admin.restaurantid });
    setWaiter(result.data);
  }

  useEffect(function () {
    setCurrentDate(getCurrentDate() + " " + getCurrentTime())
    fetchAllWaiter();

  }, [])

  const fillWaiter = () => {
    return waiter.map((item) => {
      return <MenuItem value={item.waiterid}>{item.waitername}</MenuItem>
    });
  }
  const handleWaiter = (event, value) => {
    // console.log("VVVVVALLLLUE",value.props.children)
    setWaiterName(value.props.children)
    setWaiterId(event.target.value)
  }
  return (<div className={classes.root}>
    <div className={classes.box}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField label="Current Date" value={currentDate} />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Waiter Name</InputLabel>
            <Select label={"Category Name"}

              onChange={handleWaiter}
              value={waiterId}>
              <MenuItem>-Select Waiter-</MenuItem>
              {fillWaiter()}
            </Select>

          </FormControl>
        </Grid>
        <Grid item xs={4} style={{color:'#273c75', textAlign:'right',fontFamily:'kanit',fontWeight:'bold',fontSize:34}}>
         {floorNo.length!=0?<>Floor No{floorNo}</>:<></>} {tableNo.length!=0?<>Table {tableNo}</>:<></>}
        </Grid>
      </Grid>

    </div>

    <div className={classes.box}>
      <Grid container space={1}>
        <Grid item xs={2}>
          <CategoryComponent tableNo={tableNo} floorNo={floorNo} refresh={refresh} setRefresh={setRefresh} />
        </Grid>
        <Grid item xs={5}>
          <TableComponent floorNo={floorNo} tableNo={tableNo} setFloorNo={setFloorNo} setTableNo={setTableNo} />
        </Grid>
        <Grid item xs={5}>
          <TableCart waiterName={waiterName} tableNo={`#${floorNo}${tableNo}`} refresh={refresh} setRefresh={setRefresh} />
          
        </Grid>
        
      </Grid>
    </div>
    
  </div>



  )


}