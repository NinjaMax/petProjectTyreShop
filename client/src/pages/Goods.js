import React from 'react';
import { Add, Remove } from '@mui/icons-material';
import Announcement from '../components/Announcement';
import '../css/Goods.css';
                      
const Goods = () => {
    return (
    
    <div>
        
            <Announcement />
                <div className ='wrapper'>
                    <h1 className='title'>YOUR BAG</h1>
        <div className='top'>
          <button className='topButton'>CONTINUE SHOPPING</button>
          <div className='topTexts'>
            <span className='topText'>Shopping Bag(2)</span>
            <span className='topText'>Your Wishlist (0)</span>
          </div>
          <button className='topButton' type="filled">CHECKOUT NOW</button>
        </div>
        <div className='bottom'>
          <div className='info'>
            <div className='product'>
              <div className='productDetail'>
                <img className='image' alt='productOne' src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                <div className='details'>
                  <span name='productName'>
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </span>
                  <span name='productId'>
                    <b>ID:</b> 93813718293
                  </span>
                  <div className='productColor' color="black" />
                  <span name='productSize'>
                    <b>Size:</b> 37.5
                  </span>
                </div>
              </div>
              <div className='priceDetail'>
                <div className='productAmountContainer'>
                  <Add />
                  <div className='productAmount'>2</div>
                  <Remove />
                </div>
                <div className='productPrice'>$ 30</div>
              </div>
            </div>
            <hr className='hr'/>
            <div className='product'>
              <div className='productDetail'>
                <img className='image' alt='productTwo' src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                <div className='details'>
                  <span name='productName'>
                    <b>Product:</b> HAKURA T-SHIRT
                  </span>
                  <span name='productId'>
                    <b>ID:</b> 93813718293
                  </span>
                  <div className='productColor' color="gray" />
                  <span name='productSize'>
                    <b>Size:</b> M
                  </span>
                </div>
              </div>
              <div className='priceDetail'>
                <div className='productAmountContainer'>
                  <Add />
                  <div className='productAmount'>1</div>
                  <Remove />
                </div>
                <div className='productPrice'>$ 20</div>
              </div>
            </div>
          </div>
          <div className='summary'>
            <h1 className='summaryTitle'>ORDER SUMMARY</h1>
            <div className='summaryItem'>
              <span name='summaryItemText'>Subtotal</span>
              <span name='summaryItemPrice'>$ 80</span>
            </div>
            <div className='summaryItem'>
              <span name='summaryItemText'>Estimated Shipping</span>
              <span name='summaryItemPrice'>$ 5.90</span>
            </div>
            <div className='summaryItem'>
              <span name='summaryItemText'>Shipping Discount</span>
              <span name='summaryItemPrice'>$ -5.90</span>
            </div>
            <div className='summaryItem' type="total">
              <span name='summaryItemText'>Total</span>
              <span name='summaryItemPrice'>$ 80</span>
            </div>
            <button className='button'>CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      
    </div>
    );
};

export default Goods;