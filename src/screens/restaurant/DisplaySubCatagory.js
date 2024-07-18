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
        width: "80vw",
        height: "auto",
        background: "#dfe4ea",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    boxdisplay: {
        width: "96.5%",
        height: "auto",
        borderRadius: 10,
        background: "#fff",
        padding: 15,
    },
    centerdisplay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    root: {
        width: "80vw",
        height: "100vh",
        background: '#dfe4ea',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    box: {
        width: "90.5%",
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
export default function DisplaySubCatagory() {
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var navigate=useNavigate()
    var classes = useStyles();
    var [listfooditem, setListFoodItem] = useState([])
    const fetchAllFood = async () => {
        var result = await postData('subcatagory/fetch_all_fooditems',{restaurantid:admin.restaurantid})
        setListFoodItem(result.data)
       
    }

    useEffect(function () {
        fetchAllFood()
    }, [])
    function Dispalyall() {
        return (

            <MaterialTable
                title="Food Items"
                columns={[
                    {
                        title: 'Restaurant Id',
                        render: rowData => <div>{rowData.restaurantid}</div>
                    },
                    {
                        title: 'catagory Name',
                        render: rowData => <><div>{rowData.catagoryid}</div></>
                    },



                    {
                        title: 'Food Name',
                        render: rowData => <><div>{rowData.fooditemname}/{rowData.foodtype}</div></>
                    },
                    {
                        title: 'Ingredients',
                        render: rowData => <><div>{rowData.ingredients}</div></>
                    },
                    {
                        title: 'Price',
                        render: rowData => <><div>{rowData.price}/{rowData.offerprice}</div></>
                    },
                   {
                        title: 'Picture',
                        render: rowData => <><div><img src={`${serverURL}/images/${rowData.icon}`} style={{width: 50, height: 50, borderRadius: 10 }}/></div></>
                    }


                ]}
                data={listfooditem}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Catagory',
                        //onClick: (event, rowData) => { handleEdit(rowData) }
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
                         onClick: (event, rowData) => navigate('/dashboard/subcatagoryinterface')
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


                {Dispalyall()}
            </div>


        </div>)
}