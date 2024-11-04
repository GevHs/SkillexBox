import './Sidebar.css'
import Category from "../../components/Category/Category";
import Price from "../../components/Price/Price";
import Brand from "../../components/Brand/Brand";
import Rating from "../../components/Raiting/Raiting";

function  Sidebar (){

     return (
         <>
          <div className='Sidebar'>
              <div className='logo-container'>
                   <h1 className='logo-container-txt'>Skillex</h1>
              </div>
              <Category/>
              <Price />
              <Rating />
              <Brand />
          </div>
         </>
     )
}


export  default  Sidebar
