import React from 'react'
import './header.css';

const Header = () => {
  return (
    <header>
        <div className='header-wrapper'>
            <div className='parking-img-text'>
                <div className='text'>
                    <h1>Parking</h1>
                </div>
                <div className='img-box'>
                    <img className='parking-image' src={require('../../parking_image/car_parking.png')} alt="car_parking" />
                </div>
                <div className='text'>
                    <h1>Management</h1>
                </div>
            </div>
        </div>
    </header>
  )
})

export default Header;
