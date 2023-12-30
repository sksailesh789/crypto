import React from 'react'

const cryptobox = (props) => {
  return (
    <div className='crypto_wrap flex justify-between'>
        <div className="image_wrap">
            <img className="img-fluid" src={`${IMAGE_BASE}${each.image[0].path}`} />
        </div>
        <div className='crypto_name'>{props.name}</div>
        <div className='crypto_Point'>{props.point}</div>
        <button onClick={() => showBuyDialog(each)}>Buy</button>
    </div>
  )
}

export default cryptobox