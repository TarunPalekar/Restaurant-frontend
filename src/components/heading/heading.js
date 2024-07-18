
import logo from '../../assets/logo.png'
import list from '../../assets/list.png'
import { useNavigate } from 'react-router-dom'
export default function Heading({ title, myroute }) {
    var navigate=useNavigate()
    return (
        <div style={{
            fontFamily: 'Kanit',
            fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: 1,
            display: 'flex',

            alignItems: 'center',
            flexDirection: 'row'
        }}>

            <img src={logo} width="60px" />
            <div>{title}</div>
            <img src={ list}  style={{paddingLeft:'650px'}} width="30px" onClick={()=>{navigate(`${myroute}`)}} />

        </div>




    )
}