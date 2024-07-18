import React,{useState,useEffect} from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title'; 
import MaterialTable from "@material-table/core"
import { postData } from '../services/fetchNodeServices';
function preventDefault(event) {
  event.preventDefault();
}

export default function DepositeTable() {
    const [totalAmount,setTotalAmount]=useState([]);
    const getCurrentDate=()=>{
        const date=new Date();
        const cd=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        return cd; 
      }
      const getCurrentDateString=()=>{
        const date=new Date();
        const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const cd=d[date.getDay()]+","+m[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear()
        return cd; 
      }
    const fetchTotalAmount=async()=>{
        const result=await postData('billing/fetch_month_total',{todaysdate:getCurrentDate()})
        setTotalAmount(result.data)
        console.log('totalsale',totalAmount)
      }  
      useEffect(function(){ fetchTotalAmount()},[])
      function displayAll() {
        return (
          <MaterialTable
            
            columns={[
              { title: 'Number of Bills',render:rowData=><><div>{rowData.bill}</div></> },
             
              { title: 'Month', render:rowData=><><div>{rowData.month}</div></> },
              
              { title: 'Total Amount', render:rowData=><><div>{rowData.total}</div></> },    
            ]}
            data={totalAmount}  
            options={{
              paging:true,
              pageSize:1,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[1,3,5,7],    // rows selection options
            }}      
            
          />
        )
      }
  return (
    <React.Fragment>
       <Title>Sales Report</Title>
       
     {displayAll()}
     
    </React.Fragment>
  );
}
