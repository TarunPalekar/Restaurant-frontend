import {useEffect,useState} from "react"

import { ListItemText, Paper } from "@mui/material"
import { postData } from "../../services/fetchNodeServices"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
export default  function TableComponent(props)
{   var navigate=useNavigate()
   var admin=JSON.parse(localStorage.getItem('ADMIN'))
   const [floor,setFloor]=useState([])
   const [table,setTable]=useState([])
   const [selectedFloor,setSelectedFloor]=useState(-1)
  
   var foodOrder=useSelector((state)=>state.orderData)
   var foodList=[]
   function calculate(tn)
{   // alert(tn)
    var cart=foodOrder[tn]
    //console.log(tn,cart)
  if(cart!=undefined)
  {foodList=Object.values(cart)
  
  var totalAmount=foodList.reduce(calculateTotal,0)
  var totalOffer=foodList.reduce(calculateTotalOffer,0)
  return(totalAmount-totalOffer)
  }
  else
  {return 0}
}

  function calculateTotal(item1,item2){
  return item1+(item2.price*item2.qty)
  }
  function calculateTotalOffer(item1,item2){
    var price=item2.offerprice>0?item2.price*item2.qty:0
    return item1+(price-(item2.offerprice*item2.qty))
  }








      const fetchAllFloor=async()=>{
         const result=await postData('tablebooking/fetch_all_floor',{restaurantid:admin.restaurantid});
         setFloor(result.data);
      }
      const fetchAllTable=async(fn,i)=>{
         props.setTableNo('')
        props.setFloorNo(fn)
         const result=await postData('tablebooking/fetch_all_table_by_floor',{restaurantid:admin.restaurantid,floor:fn});
         setTable(result.data);
         setSelectedFloor(i)
      }
     
      const handleTableClick=(item)=>{
    
          props.setTableNo(item.tableno)


      }
      const showTable=()=>{
         return table.map((item)=>{
            return(<Paper onClick={()=>handleTableClick(item)} elevation={3} style={{borderRadius:5,width:80,height:80,display:'flex',justifyContent:'center',alignItems:'center',padding:5,margin:8,background:'#d35400',flexDirection:'column',cursor:'pointer'}}>
               <div style={{fontFamily:'kanit',fontWeight:'bold',fontSize:16,color:'#fff',padding:2}}>Table {item.tableno}</div>
               <div style={{fontFamily:'kanit',fontWeight:'600',fontSize:10,color:'#fff',padding:2}}>Chairs {item.noofchairs}</div>
               <div style={{fontFamily:'kanit',fontWeight:'bold',fontSize:16,color:'#fff',padding:2}}>&#8377; {calculate(`#${props.floorNo}${item.tableno}`)}</div>
      
            </Paper>)
            })
      
      }



     const showFloor=()=>{
     return floor.map((item,i)=>{
      return(<Paper onClick={()=>fetchAllTable(item.floor,i)} elevation={3} style={{borderRadius:5,width:80,height:80,display:'flex',justifyContent:'center',alignItems:'center',padding:5,margin:8,background:i==selectedFloor?'#27ae60':'#7bed9f',cursor:'pointer'}}>
         <div style={{fontFamily:'kanit',fontWeight:'bold',fontSize:16,color:'#fff',padding:2}}>{item.floor}</div>

      </Paper>)

     })

     }
useEffect(function(){
   fetchAllFloor()
},[])
   
   return(
   <div style={{display:'flex',flexDirection:'column',padding:5}}>
   <div style={{display:'flex',flexWrap:'wrap',marginBottom:10}}>
     {showFloor()}

   </div>
   <div style={{display:'flex',flexWrap:'wrap'}}>
     {showTable()}

   </div>

   </div>
   
   )
}