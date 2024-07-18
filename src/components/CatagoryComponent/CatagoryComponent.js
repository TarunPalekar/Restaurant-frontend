import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { getData, serverURL, postData } from '../../services/fetchNodeServices';

import FoodComponent from '../FoodComponent/FoodComponent';

export default function CategoryComponent(props) {
  const [catagoryid, setcatagoryId]=useState('')
  const [listCategory, setListCategory] = useState([]);
  
  const [open, setOpen] = useState(false);
  var admin = JSON.parse(localStorage.getItem('ADMIN'))


  const fetchAllCatagory = async () => {
    var result = await postData('catagory/fetch_all_catagory', { restaurantid: admin.restaurantid })
    setListCategory(result.data)
    console.log("catagory",result.data)
  }
  const handleFoodListDialog=(cid)=>{
    setcatagoryId(cid)
   
    console.log("cata",catagoryid)
    setOpen(true)

  }
  useEffect(function () {
    fetchAllCatagory()


  }, []);
 
  const showCategoryList = () => {
    return listCategory.map((item) => {
      return (
        <div>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItemButton alignItems="flex-start" onClick={()=>handleFoodListDialog(item.catagoryid)} >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`${serverURL}/images/${item.icon}`} sx={{ width: 30, height: 30 }} />
              </ListItemAvatar >
              <ListItemText primary={item.catagoryname}


              />
            </ListItemButton>
            <Divider variant="inset" component="li" />
          </List>
        </div>)
    })

  }
  useEffect(function () {
 
  }, [])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {showCategoryList()}
      <FoodComponent categoryid={catagoryid} tableNo={props.tableNo} floorNo={props.floorNo} setOpen={setOpen} open={open} refresh={props.refresh} setRefresh={props.setRefresh}/>
    </Box>
  );
}
