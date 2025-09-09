import Link from "next/link";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { useAppContext } from "@/context/DataContext";

const NewsItem = () => {
  const { blogs } = useAppContext();
  const blogpost = blogs || [];

    // Function to truncate the description
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 581,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <div className="container" >
        <div className="row">
          <div className="col-md-12">
            <Slider
              {...settings}
              className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-gradient-arrows"
            >
              {blogpost.slice(0, 3).map((data, index) => (
                  <div className="slide-single-layout" key={index}>
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                      <div className="inner row" style={{background:'url(../images/bg/news-bg.svg)',backgroundRepeat: "no-repeat", backgroundSize: "cover, contain0", padding: 0, justifySelf: "center"}}>
                        <div className="icon col-lg-6" style={{padding: 0}}>
                          <Image
                            src={data.img}
                            width={600}
                            height={480}
                            alt="Servece Icon"
                            style={{borderRadius:" var(--radius-big) 0 0 var(--radius-big)", margin:"1px", width:"100%", height:"100%"}}
                          />
                        </div>
                        <div className="description col-lg-6 container-inner-padding" style={{padding:'80px', maxWidth:'600px', maxHeight:'480px'}}>
                          <h5 className="title heading-major-mob" style={{fontFamily:'Outfit', fontSize:'40px'}}>{truncateText(data.title, 50)} {/* Limit to 100 characters */}</h5>
                          <p className="desc text-mob">{truncateText(data.thumbnail_desc, 200)} {/* Limit to 100 characters */}</p>
                          <Link href={`/blog-details/${data.id}`} className='button outline' style={{marginLeft:'65%'}}>
                                <span className="buttonText">Learn More</span>
                                    <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/94a0775eeaca818df61204beaa6b1e52b6977a3313a418d2c728b214e1c3bbdd?placeholderIfAbsent=true&apiKey=b2b7a680e9304c35b0ce6ab9f24b57f9"
                                    alt=""
                                    className="buttonIcon"
                                    />
                                </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
