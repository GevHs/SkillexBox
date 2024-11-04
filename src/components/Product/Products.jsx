import  './Products.css'
import  Card from '../Card/Card'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";

function  Products () {
   const {filteredItems} = useSelector(state => state.search);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
      if (filteredItems) {
         setLoading(false);
      }
   }, [filteredItems]);

   return (
      <section className='card-container'>
         {loading ? (
             <div className="spinner-container">
                <ClipLoader color="#36d7b7" size={50} />
             </div>
         ) : (
             filteredItems.length ? (
                 filteredItems.map((item) => (
                     <Card
                         key={item.id}
                         imageUrl={item.imageUrl}
                         name={item.name}
                         price={item.price}
                         id={item.id}
                         brand={item.brand}
                         rating={item.rating}
                     />
                 ))
             ) : (
                 <h3 className='no-products'>No products found</h3>
             )
         )}



      </section>
   )
}

export  default  Products
