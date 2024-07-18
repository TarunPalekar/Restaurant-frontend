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

const useStyles = makeStyles({

  center: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  },
  rootdisplay: {
    width: "100%",
    height: "auto",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxdisplay: {
    width: "96.5%",
    height: "100%",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
  },
  centerdisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function DisplayAllRestaurant() {
  var classes = useStyles();
  const [listRestaurant, setListRestaurant] = useState([])
  const [open, setOpen] = useState('')
  const FetchAllRestaurant = async () => {
    var result = await getData('restaurants/fetch_all_restaurant')
    setListRestaurant(result.data)
  }
  const [states, setStates] = useState([])
  const [restaurantId, setRestaurantId] = useState("");
  const [cities, setCities] = useState([])
  const [stateid, setStateId] = useState('')
  const [cityid, setCityId] = useState('')
  const [restaurantname, setRestaurantName] = useState('')
  const [ownername, setOwnerName] = useState('')
  const [phoneno, setPhoneNO] = useState('')
  const [mobileno, setMobileNO] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [url, setUrl] = useState('')
  const [fssaino, setFssaiNo] = useState('')
  const [gst, setGstNo] = useState('')
  const [gsttype, setGstType] = useState('')
  const [btnStatus, setbtnStatus] = useState({ 'fssai': false, 'shopAct': false, 'logo': false })
  const [fileshopact, setFileShopAct] = useState({ url: '', bytes: '' })
  const [filefssai, setFileFssai] = useState({ url: '', bytes: '' })
  const [filelogo, setFileLogo] = useState({ url: '', bytes: '' })
  const [tempFile, setTempFile] = useState({ fssai: '', shopAct: '', logo: '' })
  const [resError, setResError] = useState({})
  const handleError = (error, input, message) => {
    setResError(prevState => ({ ...prevState, [input]: { 'error': error, 'message': message } }))
    console.log('cc', resError)
  }
  const validation = () => {
    var submitRecord = true
    if (restaurantname.trim().length == 0) {
      handleError(true, "restaurantname", 'pls input restaurant name')
      submitRecord = false
    }
    if (ownername.trim().length == 0) {
      setResError((prevState) => ({ ...prevState, ownername: { error: true, message: 'Pls input owner Name' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!mobileno || !(/^[0-9]{10}$/).test(mobileno)) {
      setResError((prevState) => ({ ...prevState, mobileno: { error: true, message: 'Pls input correct number' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      setResError((prevState) => ({ ...prevState, email: { error: true, message: 'Pls input correct email' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!address) {
      setResError((prevState) => ({ ...prevState, address: { error: true, message: 'Pls input address' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!stateid) {
      setResError((prevState) => ({ ...prevState, stateid: { error: true, message: 'Pls select state' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!cityid) {
      setResError((prevState) => ({ ...prevState, cityid: { error: true, message: 'Pls select city' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!fssaino) {
      setResError((prevState) => ({ ...prevState, fssaino: { error: true, message: 'Pls input fssai number' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!gst) {
      setResError((prevState) => ({ ...prevState, gstno: { error: true, message: 'Pls input gst number' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!gsttype) {
      setResError((prevState) => ({ ...prevState, gsttype: { error: true, message: 'Pls select type' } }))
      console.log(resError)
      submitRecord = false
    }
    if (!filefssai.url) {
      handleError(true, 'filefssai', 'Pls upload file')
      submitRecord = false
    }
    if (!fileshopact.url) {
      handleError(true, 'fileshopact', 'Pls upload file')
      submitRecord = false
    }
    if (!filelogo.url) {
      handleError(true, 'file', 'Pls upload file')
      submitRecord = false
    }
    return submitRecord
  }
  const handleSubmit = async () => {

    var error = validation()
    console.log("After Submit:", resError)
    if (error) {

      var d = new Date()
      var cd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      var body = {
        'restaurantname': restaurantname, 'ownername': ownername, 'phoneno': phoneno,
        'email': email, 'mobileno': mobileno, 'address': address, 'stateid': stateid,
        'cityid': cityid, 'url': url, 'fssaino': fssaino, 'gst': gst, 'gsttype': gsttype,
        'updatedat': cd, restaurantid: restaurantId
      }

      var result = await postData('restaurants/restaurant_edit_data', body)
      if (result.status) {
        Swal.fire({
          icon: 'success',
          title: 'Restaurant Registration',
          text: result.message,
          position: 'top-end',
          timer: 5000,
          showConfirmButton: false,
          toast: true

        })
        { FetchAllRestaurant() }
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
  }
  const fetchAllCities = async (stateid) => {
    var body = { stateid: stateid }
    var result = await postData('statecity/fetch_all_cities', body)
    console.log(result)
    setCities(result.data)

  }
  const handleStateChange = (event) => {
    setStateId(event.target.value)
    fetchAllCities(event.target.value)
  }
  const fetchAllStates = async () => {
    var result = await getData('statecity/fetch_all_states')
    console.log(result.data)
    setStates(result.data)
  }
  useEffect(function () {
    fetchAllStates()
  }, [])
  const handleFssai = (event) => {
    setFileFssai({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setbtnStatus((prev) => ({ ...prev, fssai: true }))
  }
  const handleShopAct = (event) => {
    setFileShopAct({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setbtnStatus((prev) => ({ ...prev, shopAct: true }))
  }
  const handleLogo = (event) => {
    setFileLogo({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setbtnStatus((prev) => ({ ...prev, logo: true }))

  }
  const fillState = () => {
    return states.map((item) => {
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>
    })
  }
  const fillCities = () => {
    return cities.map((item) => {
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
    })
  }
  const handleDelete = async (rowData) => {

    Swal.fire({
      title: "Do you want to delete the restaurant",
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        var body = { 'restaurantid': rowData.restaurantid }
        console.log(body)
        var result = await postData('restaurants/restaurant_delete', body)
        if (result.status) {
          Swal.fire('Deleted!', '', result.message)
          FetchAllRestaurant()
        }
        else
          Swal.fire('Fail!', '', result.message)

      }
      else if (result.isDenied) {
        Swal.fire('Restaurant not Delete', '', 'info')
      }
    })








  }


  ////////////////////////
  useEffect(function () {
    FetchAllRestaurant()
  }, [])

  const handleEdit = (rowData) => {
    fetchAllCities(rowData.stateid)
    setRestaurantName(rowData.restaurantname)
    setRestaurantId(rowData.restaurantid)
    setOwnerName(rowData.ownername)
    setPhoneNO(rowData.phoneno)
    setMobileNO(rowData.mobileno)
    setEmail(rowData.email)
    setStateId(rowData.stateid)
    setCityId(rowData.cityid)
    setAddress(rowData.address)
    setUrl(rowData.url)
    setFssaiNo(rowData.fssaino)
    setGstNo(rowData.gst)
    setGstType(rowData.gsttype)
    setFileFssai({ url: `${serverURL}/images/${rowData.filefssai}`, bytes: '' })
    setFileShopAct({ url: `${serverURL}/images/${rowData.fileshopact}`, bytes: '' })
    setFileLogo({ url: `${serverURL}/images/${rowData.filelogo}`, bytes: '' })
    setTempFile({ fssai: `${serverURL}/images/${rowData.filefssai}`, shopAct: `${serverURL}/images/${rowData.fileshopact}`, logo: `${serverURL}/images/${rowData.filelogo}` })

    setOpen(true)

  }
  const handleDialogClose = () => {
    setOpen(false)
  }
  const handleCancel = (imgStatus) => {
   var status=imgStatus
    if (status == 1) {
      setbtnStatus ((prev) => ({ ...prev, fssai: false }))
      setFileFssai({ url: tempFile.fssai, bytes: '' })

    }
    else if (status == 2) {
      setbtnStatus ((prev) => ({ ...prev, shopAct: false }))
      setFileShopAct({ url: tempFile.shopAct, bytes: '' })

    }
    else if (status == 3) {
      setbtnStatus ((prev) => ({ ...prev, logo: false }))
      setFileLogo({ url: tempFile.logo, bytes: '' })

    }

  


}
const editImage = async (imgStatus) => {



}
const editDeleteButton = (imgStatus) => {
  return (
    <div>
      <Button onClick={() => editImage(imgStatus)}>Edit</Button>
      <Button onClick={() => handleCancel(imgStatus)}>cancel</Button>
    </div>
  )
}
const showData = () => {

  return (<div className={classes.root} >
    <div className={classes.box}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Heading title={"Restaurant Register"} />
        </Grid>
        <Grid item xs={6}>
          <TextField onFocus={() => handleError(false, restaurantname, '')}
            error={resError?.restaurantname?.error}
            label="Restaurant Name"
            value={restaurantname}
            fullWidth
            helperText={resError?.restaurantname?.message} onChange={(event) => setRestaurantName(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onFocus={() => { handleError(false, ownername, '') }} onChange={(event) => setOwnerName(event.target.value)} label="Owner Name" fullWidth
            error={resError?.ownername?.error}
            value={ownername}
            helperText={resError?.ownername?.message} />
        </Grid>
        <Grid item xs={4}>
          <TextField onChange={(event) => setPhoneNO(event.target.value)} label="Phone Number" fullWidth value={phoneno} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onFocus={() => { handleError(false, mobileno, '') }} onChange={(event) => setMobileNO(event.target.value)} value={mobileno} label="Mobile Number" fullWidth
            error={resError?.mobileno?.error}

            helperText={resError?.mobileno?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onFocus={() => { handleError(false, email, '') }} onChange={(event) => setEmail(event.target.value)} value={email} label="Email Address" fullWidth
            error={resError?.email?.error}
            helperText={resError?.email?.message} />
        </Grid>
        <Grid item xs={12}>
          <TextField onFocus={() => handleError(false, address, '')}
            error={resError?.address?.error} onChange={(event) => setAddress(event.target.value)} value={address} label="Address" fullWidth
            helperText={resError?.address?.message} />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>States</InputLabel>
            <Select label="States" value={stateid} onFocus={() => handleError(false, stateid, '')}
              error={resError?.stateid?.error}
              onChange={handleStateChange}>
              <MenuItem>-Select State-</MenuItem>
              {fillState()}
            </Select>
            <FormHelperText style={{ color: 'red' }}>{resError?.stateid?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select value={cityid} label="City" onFocus={() => handleError(false, cityid, '')}
              error={resError?.cityid?.error} onChange={(event) => setCityId(event.target.value)}>
              <MenuItem>-Select City-</MenuItem>
              {fillCities()}
            </Select>
            <FormHelperText style={{ color: 'red' }}>{resError?.cityid?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField onChange={(event) => setUrl(event.target.value)} value={url} label="URL" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField onFocus={() => handleError(false, fssaino, '')}
            error={resError?.fssaino?.error}
            helperText={resError?.fssaino?.message} value={fssaino} onChange={(event) => setFssaiNo(event.target.value)} label="Fssai Number" fullWidth />
        </Grid>
        <Grid item xs={4} >
          <TextField onFocus={() => handleError(false, gst, '')}

            error={resError?.gst?.error}
            helperText={resError?.gst?.message} onChange={(event) => setGstNo(event.target.value)} value={gst} label="GST Number" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>GST Type</InputLabel>
            <Select label="GST Type"
              value={gsttype}
              onFocus={() => handleError(false, gsttype, '')}
              error={resError?.gsttype?.error}
              onChange={(event) => setGstType(event.target.value)}>
              <MenuItem>-Select Gst Type-</MenuItem>
              <MenuItem value="5 star">5 Star</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <FormHelperText style={{ color: 'red' }}>{resError?.gsttype?.message} </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
            <input onFocus={() => handleError(false, filefssai, '')}

              error={resError?.filefssai?.error} onChange={handleFssai} hidden
              accept="image/*"
              multiple type="file" />
            Upload Fssai
          </Button>
          {resError?.filefssai?.error ? <div style={{ color: 'red', fontSize: '0.8rem', margin: 5 }}>{resError?.filefssai?.message}</div> : <></>}
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
            <input onChange={handleShopAct} hidden
              accept="image/*"
              multiple type="file" />
            Upload Shop Act
          </Button>
          {resError?.fileshopact?.error ? <div style={{ color: 'red', fontSize: '0.8rem', margin: 5 }}>{resError?.fileshopact?.message}</div> : <></>}
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth component="label" variant="contained" endIcon={<UploadFile />}>
            <input onChange={handleLogo} hidden
              accept="image/*"
              multiple type="file" />
            Upload Logo
          </Button>
          {resError?.filelogo?.error ? <div style={{ color: 'red', fontSize: '0.8rem', margin: 5 }}>{resError?.filelogo?.message}</div> : <></>}
        </Grid>
        <Grid item xs={4} className={classes.center}>
          <Avatar
            variant='rounded'
            alt="Remy Sharp"
            src={filefssai.url}
            sx={{ width: 56, height: 56 }}
          />
          <div>{btnStatus.fssai ? editDeleteButton(1) : <></>}</div>
        </Grid>
        <Grid item xs={4} className={classes.center}>
          <Avatar
            variant='rounded'
            alt="Remy Sharp"
            src={fileshopact.url}
            sx={{ width: 56, height: 56 }}
          />
          <div>{btnStatus.shopAct ? editDeleteButton(2) : <></>}</div>
        </Grid>
        <Grid item xs={4} className={classes.center}>
          <Avatar
            variant='rounded'
            alt="Remy Sharp"
            src={filelogo.url}
            sx={{ width: 56, height: 56 }}
          />
          <div>{btnStatus.logo ? editDeleteButton(3) : <></>}</div>
        </Grid>

      </Grid>

    </div>
  </div>)
}
const showDataForEdit = () => {
  return (
    <Dialog
      maxWidth={'lg'}

      open={open}>
      <DialogContent  >
        {showData()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Edit</Button>
        <Button onClick={handleDialogClose}>Close</Button>
      </DialogActions>

    </Dialog>

  )


}

useEffect(function () {
  FetchAllRestaurant()
}, [])

function DisplayAll() {
  return (

    <MaterialTable
      title="Restaurant List"
      columns={[
        {
          title: 'Restaurant',
          render: rowData => <><div>{rowData.restaurantname}</div><div>{rowData.ownername}</div></>
        },
        {
          title: 'Address',
          render: rowData => <><div>{rowData.address}</div><div>{rowData.cityid},{rowData.stateid}</div></>
        },
        {
          title: 'Contact',
          render: rowData => <><div>{rowData.phoneno}</div><div>{rowData.mobileno}</div><div>{rowData.email}</div></>
        },
        {
          title: 'Documents',
          render: rowData => <><div>SA:{rowData.gstno}/{rowData.gsttype}</div><div>Fssai:{rowData.fssaino}</div></>
        },
        {
          title: 'Website',
          render: rowData => <div><a href='{rowData.url}'>Visit</a></div>
        },
        {
          title: 'Logo',
          render: rowData => <div><img src={`${serverURL}/images/${rowData.filelogo}`} style={{ width: 50, height: 50, borderRadius: 10 }} /></div>
        },


      ]}
      data={listRestaurant}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Restaurant',
          onClick: (event, rowData) => { handleEdit(rowData) }
        },
        {
          icon: 'delete',
          tooltip: 'Delete Restaurant',
          onClick: (event, rowData) => { handleDelete(rowData) }
        },
        {
          
        }

      ]}
    />
  )
}


return (



  <div className={classes.rootdisplay}>
    <div className={classes.boxdisplay}>
      {DisplayAll()}
    </div>
    {showDataForEdit()}
  </div>
)

}