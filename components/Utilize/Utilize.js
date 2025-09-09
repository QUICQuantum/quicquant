import React from "react";

import BlogItem from "@/components/Blog/BlogItem";

import { useAppContext } from "@/context/DataContext";
const Utilize = () => {
  const { blogs } = useAppContext();
  return (
    <div className="container" >
            <div className="row h-100" style={{ height: "60vh" , marginBottom:'15%'}}>
              <div className="col-lg-12">
                <div className="inner  mt--140">
                  <h1
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "20px",
                      color: "#8171E7",
                      fontWeight: "300",
                      fontStyle: "normal",
                    }}
                  >
                    LEARN
                  </h1>
                  <h1
                    className="title display-one heading-large-mob"
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "64px",
                      fontWeight: "500",
                      fontStyle: "normal",
                    }}
                  >
                    Welcome to the <br />{" "}
                    <span className="theme-gradient"> Future of Quantum </span>
                  </h1>
                  <p className="theme-mini-text text-mob">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s,
                     when an unknown printer took a galley of type and
                    scrambled it to make a type
                   specimen book. It has survived not only five
                    centuries.
                  </p>
                </div>
              </div>

              <div className="position-absolute end-0 z-n1 w-auto">
                <div style={{background: 'linear-gradient(0deg, rgba(2,7,27,0) 50%, rgba(2,7,27,1) 100%)', position:'absolute', zIndex:'1' ,width: "1001px",
                    height: "563px",}}> </div>
                <div style={{background: ' linear-gradient(180deg, rgba(2,7,27,0) 50%, rgba(2,7,27,1) 100%)', position:'absolute', zIndex:'1' ,width: "1001px",
                    height: "563px",}}> </div>
                <div style={{background: ' linear-gradient(90deg, rgba(2,7,27,0) 50%, rgba(2,7,27,1) 100%)', position:'absolute', zIndex:'1' ,width: "1001px",
                    height: "563px",}}> </div>
                <div style={{background: ' linear-gradient(-90deg, rgba(2,7,27,0) 0%, rgba(2,7,27,1) 100%)', position:'absolute', zIndex:'1' ,width: "1001px",
                    height: "563px",}}> </div>
          
              <video
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                className=""
                style={{
                  position: "unset !important",
                  width: "1001px",
                  height: "563px",
                  aspectRatio: "1001/563",
                }}
              >
                <source src="/videos/learn-bg.webm" type="video/webm" />
                <source src="/videos/learn-bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>


              </div>
            </div>
            <div className="row row--30">
            <div className="col-lg-12">
          {/* Pass filtered blog posts to BlogItem */}
               <BlogItem blog={blogs} isLearn={true}/>
              </div>
            </div>
          </div>
  );
};

export default Utilize;
