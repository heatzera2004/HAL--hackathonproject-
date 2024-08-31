import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "https://www.agriculture-strategies.eu/wp-content/uploads/2018/07/person-690245_1920.jpg" },
  { url: "https://diplomatist.com/wp-content/uploads/2020/08/agri.jpg" },
  { url: "https://im.indiatimes.in/content/2022/Feb/Sarojani-Devi-from-Rampurva-village-harvesting-carrot-adn-preparing-to-sale-this-in-market--DSC_0586-min_620b8e247f069.jpg" },
  { url: "https://media.istockphoto.com/id/600694968/photo/women-farmer-talking-on-smart-phone.jpg?s=612x612&w=0&k=20&c=7HFpiNLGFIf4uuXGsJWwhhL5u7T0pZIXIXbAGUdZWcU=" },
  { url: "https://www.taropumps.com/media/2001/agronomist-with-farmer-at-cotton-field.jpg" },
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
