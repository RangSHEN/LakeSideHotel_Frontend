import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Header = ({title}) => {
    
    // const images = [
    //     ("./assets/images/services-1.jpg"),
    //     ("./assets/images/services-2.jpg"),
    //     ("./assets/images/services-3.jpg")
    // ]
    //
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true
    // };
    
    return (
        // <Slider {...settings}>
        //     {images.map((image, index) => (
        //         <div key={index} className="header"  style={{ backgroundImage: `url(${image.default})` }}>
        //             <div className='overlay'></div>
        //             <div className='container'>
        //                 <h1 className='header-title text-center'>{title}</h1>
        //             </div>
        //         </div>
        //     ))}
        // </Slider>

        <header className='header'>
            <div className='overlay'></div>
            <div className='container'>
                <h1 className='header-title text-center'>{title}</h1>
            </div>
        </header>
    );
};

export default Header;
