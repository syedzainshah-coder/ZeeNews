import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import "./style.css"
export class Navbar extends Component {
    
  handleClose=()=>{
    document.querySelector(".navbar .nav").style.left="-650px"
    document.querySelector(".closeBtn").style.display="none"
    document.querySelector(".navbar .nav").style.transition="all 1s "
    document.querySelector(".navbar .nav").style.transform="translateX(5px)" ;
    document.querySelector("body").style.backgroundColor="white"
   

  }
  handlehere=()=>{
    document.querySelector(".navbar .nav").style.left="-7px"
     document.querySelector(".closeBtn").style.display="block"
     document.querySelector(".closeBtn").style.position="absolute"
     document.querySelector(".closeBtn").style.left="172px";
     document.querySelector(".closeBtn").style.top="-11px";
     document.querySelector(".navbar .nav").style.transition="all 1s "
     document.querySelector(".navbar .nav").style.transform="translateX(5px)"
     document.querySelector("body").style.backgroundColor="rgba(10, 7, 7, 0.692)"

     
     
     
  }
    render() {

        return (
            <>
                <header className='shadow'>
                    <nav className='navbar navbar-dark bg-dark '>
                       <NavLink to="/"> <label htmlFor="" className='navbar-brand ms-5'>News App</label></NavLink>
                       <div>
                       <ul className='nav me-3'>
                   
                           <NavLink
                           onClick={this.handleClose}
                           id='firstNav'
                                to="/weather" className={({ isActive }) => {
                                    return isActive ? "nav-link text-danger" : "nav-link" 
                                }}   >
                                Weather
                            </NavLink>
                            <NavLink
                             onClick={this.handleClose}
                                to="/cricket" className={({ isActive }) => {
                                    return isActive ? " nav-link text-danger" : "nav-link "
                                }}   >
                                Cricket
                            </NavLink>
                            <NavLink
                             onClick={this.handleClose}
                                to="education" className={({ isActive }) => {
                                    return isActive ? " nav-link text-danger  " : "nav-link "
                                }}   >
                                Education
                            </NavLink>
                            <li className='nav-item '><label style={{ border: "none" }} onClick={()=>{
                                this.handleClose();
                                this.props.toggle();
                            } } className=' btn border-none text-light'>{this.props.mode}  </label></li>
                            <li className='nav-item'>        <button className=' btn text-danger     closeBtn' onClick={this.handleClose}><i class="fa-regular fa-circle-xmark"></i></button></li>
                   
                           
                             
                        </ul>
                        <button className=' btn text-light   menuBtn' onClick={this.handlehere}><i class="fa-solid fa-bars"></i></button>
                
                       </div>

                       
                    </nav>
                </header>
            </>
        )
    }
}

export default Navbar;
