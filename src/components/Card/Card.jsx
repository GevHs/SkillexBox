import './Card.css'
import { FaHeart } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";

function Card({name , brand , rating , price , id , imageUrl}){
  return (
    <>
      <div key={id} className='card'>
          <img  className='card-img' src={imageUrl}  alt={'img'}/>
          <p className='card-name'>{name}</p>
          <p className='card-brand-name'>{brand}</p>
          <div className='card-rating'>
              <div
                    className="card-stars"
                    style={{'--rating': rating}}
                    aria-label={`Rating of this product is ${rating} out of 5.`}
              />
            <sub className='card-rating-total'>
               <b> {rating} </b>
            </sub>
          </div>
          <div className='card-footer'>
            <p>{price}</p>
            <div className='card-footer-icon'>
              <FaHeart color={'red'} />
              <SlBasket />
            </div>
          </div>
      </div>

    </>
  )
}

export  default  Card
