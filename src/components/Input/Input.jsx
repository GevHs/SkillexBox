import  './Input.css'
import {generateRandomString} from '../../constat/random'

function Input({labelId, name ,handleChangeRadio , value , checked , all , type }){
  const inputId = generateRandomString(labelId)
  return (
      <div className='input-container'>
          <div className="checkbox-wrapper" >
              <input onChange={(e) => handleChangeRadio(e,type)}
                     value={value}
                     type="checkbox"
                     name={name}
                     id={inputId}
                     style={{ display: 'none' }}
                     checked={checked || all}
              />
              <label htmlFor={inputId} className="check">
                  <svg viewBox="0 0 18 18">
                      <path
                          d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z">
                      </path>
                      <polyline points="1 9 7 14 15 4"></polyline>
                  </svg>
              </label>
              <span className='checkbox-wrapper-name'>{name}</span>
          </div>
      </div>
  )
}

export  default  Input
