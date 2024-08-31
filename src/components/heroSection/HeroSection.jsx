import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";


const images = [
  { url: "https://i.postimg.cc/m2zHFNzS/hack-img3.jpg" },
  { url: "https://i.postimg.cc/52tGgqQs/hackimage-2.jpg" },
  { url: "https://im.indiatimes.in/content/2022/Feb/Sarojani-Devi-from-Rampurva-village-harvesting-carrot-adn-preparing-to-sale-this-in-market--DSC_0586-min_620b8e247f069.jpg" },
  { url: "https://i.postimg.cc/MT3nnvz4/hackimg10.jpg" },
  { url: "https://i.postimg.cc/gj5LTr5R/img-3.jpg" },
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
        width={1510}
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
