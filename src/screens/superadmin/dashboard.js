import { useState } from 'react';
import edit from "../../assets/edit.png"
import list from "../../assets/list.png"
import { Avatar, Paper, Grid, AppBar, Toolbar, Box, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FoodBooking from "../FoodBooking/FoodBooking"
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import RestaurantInterface from "../restaurant/restaurantInterface"
import DisplayAllRestaurant from "../restaurant/DisplayAllRestaurant"
import CatagoryInterface from '../restaurant/catagory';
import Heading from '../../components/heading/heading';
import DisplayAllCatagory from '../restaurant/DisplayAllCatagory';
import SubCatagoryInterface from '../restaurant/subcatagory';
import DisplaySubCatagory from '../restaurant/DisplaySubCatagory';
import TableBooking from '../restaurant/tablebooking';
import DisplayTableBook from '../restaurant/DisplayTableBook';
import Waiter from '../restaurant/waiters';
import DisplayAllWaiter from '../restaurant/DisplayAllWaiter';
import WaiterTableInterface from '../restaurant/WaiterTableinterface';
import DisplayAllWaiterTable from '../restaurant/DisplayAllWaiterTable';
import { Route, Routes, json,Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Edit, Update } from '@mui/icons-material';
import { serverURL } from '../../services/fetchNodeServices';
import AllSales from '../allsales/AllSales';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Summary from "./Summary";
import Chart from "../../components/DashboardComponent/Chart";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "60%",
    height: "auto",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  leftBarStyle: {
    padding: 5,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    margin: 10,


  },
  nameStyle: {
    fontFamily: 'Kanit',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 2

  },
  phoneStyle: {
    fontFamily: 'Kanit',
    fontSize: 12,
    fontWeight: 'bold',

    color: '#636e72'

  },
  emailStyle: {
    fontFamily: 'Kanit',
    fontSize: 12,
    fontWeight: 'bold',

    color: '#636e72'
  },
  menuStyle: {
    fontFamily: 'Kanit',
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'left',
    width: 250,



  },
  menuItemStyle: {
    fontFamily: 'Kanit',
    fontSize: 16,
    fontWeight: 'bold',

  }

});
export default function Dashboard(props) {

  var classes = useStyles()
  var navigate = useNavigate()
  var admin = JSON.parse(localStorage.getItem('ADMIN'))
  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginpage");
};
  console.log("admin", admin);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">

          <Typography variant="h6" color="inherit" component="div">
            Super Admin
          </Typography>

        </Toolbar>
      </AppBar>
      <Grid container spaces={3} >
        <Grid item xs={2}>
          <Paper className={classes.leftBarStyle}>
            <Avatar variant="circular" style={{ width: 80, height: 80 }} />
            <div className={classes.nameStyle}>{admin.ownername}</div>
            <div className={classes.emailStyle}>{admin.email}</div>
            <div className={classes.phoneStyle}>{admin.mobileno}</div>

            <div className={classes.menuStyle}>

              <List>
              <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/dashboard/summary')}>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                    </ListItemButton>
                  </ListItem>





                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard/displayallcatagory')}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Catagory List</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard/displaysubcatagory')}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>food Item list</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard/displaytable')}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>table list</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard/displayallwaiter')}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Waiter List</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard/displayallwaitertable')}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Waiter Table List</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/dashboard/foodbooking')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Billing</span>} />
                    </ListItemButton>
                  </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/dashboard/allsales')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
                    </ListItemButton>
                  </ListItem>


                <Divider variant='inset' />




                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                  </ListItemButton>
                </ListItem>




              </List>



            </div>

          </Paper>



        </Grid>
        <Grid item xs={10} style={{ padding: 25, background: "#dfe4ea", height: 'auto' }}>
          <Routes>


          <Route path="/" element={<Navigate to="/dashboard/Summary" replace={true} />}/>
            <Route element={<SubCatagoryInterface />} path='/subcatagoryinterface' />
            <Route element={<DisplaySubCatagory />} path='/displaysubcatagory' />
            <Route element={<DisplayAllCatagory />} path='/displayallcatagory' />
            <Route element={<TableBooking />} path='/tablebooking' />
            <Route element={<DisplayTableBook />} path='/displaytable' />
            <Route element={<RestaurantInterface />} path='/restaurantinterface' />
            <Route element={<DisplayAllRestaurant />} path='/displayallrestaurant' />
            <Route element={<CatagoryInterface />} path='/catagoryinterface' />
            <Route element={<Waiter />} path='/waiter' />
            <Route element={<DisplayAllWaiter />} path='/displayallwaiter' />
            <Route element={<WaiterTableInterface />} path='/waitertable' />
            <Route element={<DisplayAllWaiterTable />} path='/displayallwaitertable' />
            <Route element={<AllSales />} path='/allsales'/>
              <Route element={<Summary/>} path="/summary" />
              <Route element={<FoodBooking/>} path='/foodbooking'/>
          </Routes>
        </Grid>

      </Grid>
    </Box>
  )

}