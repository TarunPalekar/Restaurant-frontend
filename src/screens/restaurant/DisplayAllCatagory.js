import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core"
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { getData, serverURL, postData } from '../../services/fetchNodeServices';
import { Avatar, Grid, TextField, Button, Select, FormHelperText, listClasses } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadFile from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2'
import Heading from "../../components/heading/heading";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  rootdisplay: {
    width: "100vw",
    height: "auto",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  boxdisplay: {

    height: "auto",
    borderRadius: 10,
    background: "#fff",
    
  },
  centerdisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    width: "80vw",
    height: "auto",
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
})

export default function DisplayAllCatagory() {
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  var navigate=useNavigate()
  var classes = useStyles();
  const [listCatagory, setListCatagory] = useState([])

  const [restaurantid, setRestaurantId] = useState('')
  const [catagoryname, setCatagoryName] = useState('')
  const [btnStatus, setbtnStatus] = useState('')
  const [catagoryid, setCatagoryId] = useState('')
  const [open, setOpen] = useState('')
  const[tempRes, setTempRes]=useState('')
  const [temp, setTemp] = useState({ url: '', bytes: '' })
  const [fileicon, setFileIcon] = useState({ url: '', bytes: '' })
 
  
  const fetchAllCatagory = async () => {
    var result = await postData('catagory/fetch_all_catagory',{restaurantid:admin.restaurantid})
 
    setListCatagory(result.data)

  }
  const handleIcon = (event) => {
    setFileIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setbtnStatus(true)

  }
  const handleCancel = (imgStatus) => {
    if (imgStatus == 1) {
      setFileIcon({ url: temp.url, bytes: '' })
      setbtnStatus(false)
    }

  }
  const handlepicEdit= async(imgStatus)=>{
    if(imgStatus==1)
    { setbtnStatus(false)
      var formData=new FormData()
      formData.append('catagoryid',catagoryid)
      formData.append('icon', fileicon.bytes)
      var result=await postData('catagory/catagory_edit_icon',formData)
      if(result.status)
      {
        Swal.fire({
          icon: 'success',
          title: 'icon changed',
          text: result.message,
          position:'top-end',
          timer: 5000,
          showConfirmButton: false,
          toast:true
          
        })
        
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message,
          position:'top-end',
          timer: 5000,
          showConfirmButton: false,
          toast:true
        })
       
      }

    }

  }
  const editDeleteButton = (imgStatus) => {

    return (
      <div>
        <Button onClick={()=>handlepicEdit(imgStatus)}>Edit</Button>
        <Button onClick={() => handleCancel(imgStatus)}>cancel</Button>
      </div>
    )



  }

  const handleDelete = async (rowData) => {

    Swal.fire({
      title: "Do you want to delete the Catagory",
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        var body = { 'catagoryid': rowData.catagoryid }
        console.log(body)
        var result = await postData('catagory/catagory_delete', body)
        if (result.status) {
          Swal.fire('Deleted!', '', result.message)
          fetchAllCatagory()
        }
        else
          Swal.fire('Fail!', '', result.message)

      }
      else if (result.isDenied) {
        Swal.fire('Restaurant not Delete', '', 'info')
      }
    })








  }
  const handleClose = () => {
    setOpen(false);
    setbtnStatus(false)
    fetchAllCatagory()
  }



  const handleSubmit = async () => {

    var body = { 'restaurantid': restaurantid, 'catagoryname': catagoryname, catagoryid: catagoryid }

    var result = await postData('catagory/catagory_edit', body)

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
    fetchAllCatagory()
    handleClose()

  }
  const handleEdit = (rowData) => {
    setRestaurantId(rowData.restaurantid)
    setCatagoryName(rowData.catagoryname)
    setCatagoryId(rowData.catagoryid)
    setFileIcon({ url: `${serverURL}/images/${rowData.icon}`, bytes: '' })
    setTemp({ url: `${serverURL}/images/${rowData.icon}`, bytes: '' })

    setOpen(true)
  }





  useEffect(function () {
    fetchAllCatagory()
  }, [])

  const showData = () => {
    return (<div className={classes.rootdispaly}>
      <div className={classes.boxdisplay}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Heading title={"Restaurant Register"} />
          </Grid>
          <Grid item xs={12}>
            <TextField  disabled value={restaurantid} fullWidth label="Restaurant Id" />
          </Grid>
          <Grid item xs={12}>
            <TextField value={catagoryname} onChange={(event) => setCatagoryName(event.target.value)} fullWidth label="Catagory Name" />

          </Grid>
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row' }}>

            <Button fullWidth component='label' variant='contained' endIcon={<UploadFile />}>
              < input hidden onChange={handleIcon}
                accept="image/*"
                multiple type="file"

              />

              Upload Logo
            </Button>
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: '100px' }}>
            <Avatar
              variant='rounded'
              alt="Remy Sharp"
              src={fileicon.url}
              sx={{ width: 56, height: 56 }}
            />
            <div>{btnStatus ? editDeleteButton(1) : <></>}</div>
          </Grid>




        </Grid>
      </div>

    </div>)
  }



  const showDataForEdit = () => {
    return (
      <Dialog
        maxWidth={'xs'}
        open={open}>
        <DialogContent>
          {showData()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Edit</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>

      </Dialog>

    )

  }



  function DisplayAll() {
    return (

      <MaterialTable
        title="Catagory List"
        columns={[
          {
            title: 'Restaurant Id',
            render: rowData => <div>{rowData.restaurantid}</div>
          },
          {
            title: 'catagory Name',
            render: rowData => <><div>{rowData.catagoryname}</div></>
          },



          {
            title: 'Logo',
            render: rowData => <div><img src={`${serverURL}/images/${rowData.icon}`} style={{ width: 50, height: 50, borderRadius: 10 }} /></div>
          },


        ]}
        data={listCatagory}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Catagory',
            onClick: (event, rowData) => { handleEdit(rowData) }
          },
          {
            icon: 'delete',
            tooltip: 'Delete Catagory',
            onClick: (event, rowData) => { handleDelete(rowData) }
          },
          {
            icon: 'add',
            tooltip: 'Add Catagory',
            isFreeAction: true,
             onClick: (event, rowData) => navigate('/dashboard/catagoryinterface')
          }

        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    )
  }


  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {DisplayAll()}
      </div>
      {showDataForEdit()}


    </div>
  )
}
