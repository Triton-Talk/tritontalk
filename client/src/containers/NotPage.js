import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SplashPage.css';
import {Image, Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import image from '../assets/unhappyFace.jpg'


const NotPage = props => {
  
  const history = useHistory()

  const Optional_menu = (props.location.state && props.location.state.duplicate) ? 
  <div>
    <h1 style={{textAlign:"center"}}>You cannot open Library Walk from multiple tabs</h1>
  </div>:
  <div>
    <h1 style={{textAlign:"center"}}>The page you're on does not exist</h1>
    <Button  onClick={history.push('/')}>Go Back to Library Walk</Button>
  </div>;
  
  return (
    <div style={{justifyContent:'center', alignItems:'center', textAlign:'center'}}>
      <Image src={image} style={{display:"block", margin: "auto", width:200, height:200}}/>
      <h3 className="ErrorMessage" >Sorry!</h3>
      {Optional_menu}
      
    </div >
  )
}

export default NotPage;
