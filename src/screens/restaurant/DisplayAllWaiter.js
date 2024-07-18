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
        height: "100vh",
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
export default function DisplayAllWaiter() {
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var navigate=useNavigate()

    const [listwaiter, setListWaiter] = useState([])

    const fetchAllWaiter = async () => {
        var result = await postData('waiters/fetch_all_waiter',{restaurantid:admin.restaurantid})

        setListWaiter(result.data)
    }
    useEffect(function () {
        fetchAllWaiter()
    }, [])
    function DisplayAll() {
        return (

            <MaterialTable
                title="Waiter List"
                columns={[
                    {
                        title: 'Restaurant Id',
                        render: rowData => <div>{rowData.restaurantid}</div>
                    },
                    {
                        title: 'Waiter Name',
                        render: rowData => <><div>{rowData.waitername}/{rowData.gender}</div></>
                    },



                    {
                        title: 'Age',
                        render: rowData => <div> {rowData.dob}</div>
                    },
                    {
                        title: 'Contact',
                        render: rowData => <><div>{rowData.mobileno}/{rowData.emailid}</div></>
                    },
                    {
                        title: 'Address',
                        render: rowData => <><div>{rowData.address}</div></>

                    },
                    {
                        title: 'Photo',
                        render: rowData => <><div><img src={`${serverURL}/images/${rowData.picture}` }  style={{width: 50, height: 50, borderRadius: 10 }}/></div></>

                    }


                ]}
                data={listwaiter}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Waiter',

                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Waiter',

                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Catagory',
                        isFreeAction: true,
                         onClick: (event, rowData) => navigate('/dashboard/waiter')
                    }

                ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />
        )
    }

    var classes = useStyles()
    return (<div className={classes.root}>
        <div className={classes.box}>
           { DisplayAll()}


        </div>
    </div>)
}