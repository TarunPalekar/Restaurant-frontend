import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rootDisplay: {
    width:"auto",
    height:"100vh",
    background:"#dfe4ea",
    display:"flex",
    flexDirection:'column',
    alignItems:"center",
    justifyContent:"center"
  },
  boxDisplay:{
    width:"95.6%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15,
    marginBlock:'20px',
    boxShadow:"0 0 15px #222",
  },
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});