import { useState, useEffect } from 'react'
import { serverURL, getData, postData } from "../../services/fetchNodeServices";
import { Avatar, Grid, TextField, Button, Select, FormHelperText } from "@mui/material"
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MaterialTable from "@material-table/core"
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
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        width: "80vw",
        height: "80vh",
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
export default function DisplayAllWaiterTable(){

    var navigate=useNavigate()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var classes=useStyles()
    const [listwaitertable, setListWaiterTable]=useState([]);
    const fetchAllWaiterTable=async()=>{
        var result=await getData('waitertable/fetch_all_waitertable')
        setListWaiterTable(result.data)
        console.log(result.data)
    }
    useEffect(function(){
        fetchAllWaiterTable()
    },[])
    function DisplayAll() {
        return (
    
          <MaterialTable
            title="Waiter Table List"
            columns={[
              {
                title: 'Restaurant Id',
                render: rowData => <div>{rowData.restaurantid}</div>
              },
              {
                title: 'Waiter Name',
                render: rowData => <><div>{rowData.waitername}</div></>
              },
    
    
    
              {
                title: 'Table Number',
                render: rowData => <div>{rowData.tableno}</div>
              },
              {
                title: 'Floor',
                render: rowData => <div>{rowData.floor}</div>
              },
              {
                title: 'Date',
                render: rowData => <div>{rowData.currentdate}</div>
              },
    
    
    
    
            ]}
            data={listwaitertable}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Catagory',
               // onClick: (event, rowData) => { handleEdit(rowData) }
              },
              {
                icon: 'delete',
                tooltip: 'Delete Catagory',
               // onClick: (event, rowData) => { handleDelete(rowData) }
              },
              {
                icon: 'add',
                tooltip: 'Add Catagory',
                isFreeAction: true,
                 onClick: (event, rowData) => navigate('/dashboard/waitertable')
              }
    
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
        )
      }
    return(<div className={classes.root}>
        <div className={classes.box}>
            {DisplayAll()}
        </div>
    </div>)
}