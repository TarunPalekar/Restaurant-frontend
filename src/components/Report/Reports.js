import { Button, Divider } from '@mui/material';
import { useState, useEffect, useNavigate } from 'react';
import { TextField, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { postData, getData } from '../../services/fetchNodeServices';






export default function Reports() {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('')
    const [data, setData] = useState([]);
    const [open, setOpen] = useState('false')


    var x = []

    const handlesubmit = async () => {
        var body = { fromdate: fromDate, todate: toDate }
        const result = await postData('billing/report', body)

    setData(result.data)
        console.log(data)




    }






    const getCurrentDate = () => {
        var date = new Date()
        var cd = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        return cd
    }



    const ShowData = () => {
     <div>data</div>
    }



    const handleFromDate = (event) => {
        const m = String(Number(event.$M) + 1);
        const d = String(event.$D);
        const y = String(event.$y);
        setFromDate(y + "-" + m + "-" + d);

    }
    const handleToDate = (event) => {
        const m = String(Number(event.$M) + 1);
        const d = String(event.$D);
        const y = String(event.$y);
        setToDate(y + "-" + m + "-" + d);
    }

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#dfe4ea', width: '100vw', height: '100vh' }}>
        <div style={{ background: '#fff', width: '80vw', height: '90vh' }}>

            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={5} style={{ paddingLeft: '180px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}  >
                        <DemoContainer components={['DatePicker']}  >
                            <DatePicker label="From Date" onChange={handleFromDate} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={5} style={{ paddingLeft: '100px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label="To Date" onChange={handleToDate} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2} style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={() => handlesubmit()} >view</Button>
                </Grid>
                <Divider variant='middle' />

                <Grid item xs={12}>
                    {ShowData()}
                </Grid>

            </Grid>



        </div>
    </div>)
}