import React from "react";

import Image from 'next/image'

const Roadmap = ({isMainPage}) => {
  return (
    <>
    {!isMainPage ? (
      <div
        className="slider-area slider-style-1 variation-default slider-bg-image slider-bg-shape"
      >
        <div className="container" style={{ height: '30vh', }}>
          <div className="row justify-content-center h-100">
              <div className="inner text-center mt--140 " >
              <h6 className="theme-gradient heading-major-mob" style={{ fontFamily: 'Outfit', fontSize: '25px', color: '#907EFF', fontWeight: '500', fontStyle: 'normal' }}>ROADMAP</h6>

              </div>  
          </div>
        </div>
     
      </div>
    ) : (
      <div
        className="slider-area slider-style-1 variation-default slider-bg-image slider-bg-shape"
      >
        <div className="container">
          <div className="row justify-content-center ">
              <div className=" text-center" >
                <h6 className="theme-gradient heading-major-mob" style={{ fontFamily: 'Outfit', fontSize: '25px', color: '#907EFF', fontWeight: '500', fontStyle: 'normal' }}>ROADMAP</h6>
              </div>  
          </div>
        </div>
     
      </div>
      )}
     
     <Image
  style={{
    objectFit: 'contain',
    marginTop: '-50px',
    width: '100%',
    height: '100%',
  }}
  src="/images/bg/Roadmap.svg"
  width={100} // Acts as a ratio
  height={4351} // Maintains aspect ratio
  alt="YES"
  loading="eager"
/>
    </>
  );
};

export default Roadmap;
