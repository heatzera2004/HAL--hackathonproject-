import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { url: "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { url: "https://images.pexels.com/photos/51947/tuscany-grape-field-nature-51947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { url: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { url: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  // { url: "images/6.jpg" },
  // { url: "images/7.jpg" },
];

const HeroSection = () => {
  return (
    // <div>
    //     <img className='w-[1600px] h-[500px]' src='https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''></img>
    // </div>
    <div>
      <SimpleImageSlider
        width={1550}
        height={500}
        images={images}
        showBullets={true}
        showNavs={true}
        slideDuration={0.5}
        autoPlay={true}
      />
    </div>

  )
}

export default HeroSection
