import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core"
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { getData, serverURL, postData } from '../../services/fetchNodeServices';
import { Avatar, Grid, TextField, Button, Select, FormHelperText } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2'
import Heading from "../../components/heading/heading";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
    root: {
        width: "80vw",
        height: "100vh",
        background: '#dfe4ea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rootDisplay: {
        width: "96.5%",
        height: "auto",
        background: '#dfe4ea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: "60%",
        height: "auto",
        borderRadius: 10,
        background: '#fff',
        padding: 15
    },
    boxdisplay: {
        width: "auto",
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
export default function DisplayTableBook() {
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var navigate=useNavigate()
    var classes = useStyles();
    const [listtable, setListTable] = useState([])
    const [open, setOpen] = useState('')
    const [restaurantid, setRestaurantId] = useState('')
    const [tableno, setTableNo] = useState('')
    const [tableid, setTableid] = useState('')
    const [noofChair, setNoOfChair] = useState('')
    const[floor, setFloor]=useState('')
    const handleclose=()=>{
        setOpen(false)
     }

    const fetchAllTable = async () => {
        var result = await postData('tablebooking/fetch_all_table',{restaurantid:admin.restaurantid})
        setListTable(result.data)
        console.log(result.data)
    }
    const handleEdit = (rowData) => {
        setRestaurantId(rowData.restaurantid)
        setTableNo(rowData.tableno)
        setNoOfChair(rowData.noofchair)
        setFloor(rowData.floor)
        setTableid(rowData.tableid)
      
        setOpen(true)
    }
 const handlesubmit=async()=>{
    var body={'restaurantid':restaurantid,
'tableno':tableno, 'noofchair':noofChair, 'floor':floor, tableid:tableid}
var result= await postData('tablebooking/update_table', body)
if (result.status) {
    Swal.fire({
      icon: 'success',
      title: 'Catagory Registration',
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
fetchAllTable()
handleclose()

 }
 

    useEffect(function () {
        fetchAllTable()
    }, [])
    const showDataForEdit = () => {
        return (
            <Dialog
                maxWidth={'xs'}

                open={open}>
                <DialogContent  >
                    {showData()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlesubmit} >Edit</Button>
                    <Button onClick={handleclose}>Close</Button>
                </DialogActions>

            </Dialog>

        )
    }



    const showData = () => {

        return (<div >
            <div  >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Heading title={'Table Registration'} />
                    </Grid>

                    <Grid item xs={10}>
                        <TextField value={restaurantid} onChange={(event) => setRestaurantId(event.target.value)} fullWidth label="Restaurant Id" />
                    </Grid>
                    <Grid item xs={10} fullWidth>
                        <TextField value={tableno} onChange={(event) => setTableNo(event.target.value)} fullWidth label="Table Number" />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField value={noofChair} onChange={(event) => setNoOfChair(event.target.value)} fullWidth label="Number Of Chair" />
                    </Grid>
                    <Grid item xs={10} >
                        <FormControl fullWidth>
                            <InputLabel  >Floor</InputLabel>
                            <Select label="floor" value={floor} onChange={(event) => setFloor(event.target.value)}>


                                <MenuItem>-Select Catagory-</MenuItem>
                                <MenuItem value='1'>1</MenuItem>
                                <MenuItem value='2'>2</MenuItem>
                                <MenuItem value='3'>3</MenuItem>
                                <MenuItem value='open top'>open top</MenuItem>
                                <MenuItem value='Garden'> Garden</MenuItem>


                            </Select>

                        </FormControl>
                    </Grid>
                </Grid>
            </div></div>

        )
    }

    function DisplayAll() {
        return (

            <MaterialTable
                title="Table List"
                columns={[
                    {
                        title: 'Restaurantid',
                        render: rowData => <><div>{rowData.restaurantid}</div></>
                    },
                    {
                        title: 'Table Number',
                        render: rowData => <><div>{rowData.tableno}</div></>
                    },
                    {
                        title: 'Number Of Chair',
                        render: rowData => <><div>{rowData.noofchair}</div></>
                    },
                    {
                        title: 'Floor',
                        render: rowData => <><div>{rowData.floor}</div></>
                    },



                ]}
                data={listtable}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Restaurant',
                        onClick: (event, rowData) => { handleEdit(rowData) }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Restaurant',
                        //onClick: (event, rowData) => { handleDelete(rowData) }
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Restaurant',
                        isFreeAction: true,
                       onClick: (event, rowData) => navigate('/dashboard/tablebooking')
                    }

                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />
        )
    }


    return (<div className={classes.root}>
        <div className={classes.box}>
            {DisplayAll()}
            {showDataForEdit()}
        </div>
    </div>)
}