import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { DateTime } from "luxon"; // Import luxon

const BlogItem = ({ blog, isLearn }) => {
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(blog.length / postsPerPage);

  // Function to change the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to truncate the description
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  // Function to format the date
  const formatDate = (dateString) => {
    return DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_MED); // Example: Jan 5, 2025
  };

  // Get the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blog.slice(indexOfFirstPost, indexOfLastPost);

  // Get the first post separately
  const firstPost = currentPosts[0];
  const otherPosts = currentPosts.slice(1);

  return (
    <>
      <div className="row mt_dec--30">
        <div className="col-lg-12">
          <div className="row row--15">
            {isLearn ? (
              // When isLearn is true, display all posts in the same format as firstPost
              currentPosts.map((data) => (
                <div className="col-lg-12 mt--60" key={data.id}>
                  <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                    <div
                      className="inner row"
                      style={{
                        padding: 0,
                        justifySelf: "center",
                      }}
                    >
                      <div className="icon col-lg-7" style={{ padding: 0 }}>
                        <Image
                          src={data.img}
                          width={600}
                          height={480}
                          alt="Blog Image"
                          style={{
                            borderRadius: "var(--radius-big)",
                            margin: "1px",
                            width: "100%",
                            maxHeight: "400px",
                          }}
                        />
                      </div>
                      <div className="description col-lg-5 m-auto" style={{ padding: "30px" }}>
                        <h5 className="title" style={{ fontFamily: "Outfit", fontSize: "40px" }}>
                        <Link className="truncate-text3" href={`/blog-details/${data.id}`}>{truncateText(data.title, 50)}</Link>
                        </h5>
                        <p className="desc">{truncateText(data.thumbnail_desc, 200)}</p>
                        <Link href={`/blog-details/${data.id}`} className="button outline" style={{ marginRight: "65%" }}>
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
              ))
            ) : (
              // When isLearn is false, display firstPost separately
              <>
                {firstPost && (
                  <div className="slide-single-layout" key={firstPost.id}>
                    <div className="rainbow-box-card card-style-default aiwave-service-default has-bg-shaped">
                      <div
                        className="inner row"
                        style={{
                          background: "url(../images/bg/news-bg.svg)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover, contain",
                          padding: 0,
                          justifySelf: "center",
                        }}
                      >
                        <div className="icon col-lg-6" style={{ padding: 0 }}>
                          <Image
                            src={firstPost.img}
                            width={600}
                            height={480}
                            alt="Blog Image"
                            style={{
                              borderRadius: "var(--radius-big) var(--radius-big) 0 0",
                              margin: "1px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                        <div className="description col-lg-6 container-inner-padding" style={{ padding: "80px" }}>
                          <h5 className="title heading-major-mob" style={{ fontFamily: "Outfit", fontSize: "40px" }}>
                          <Link className="truncate-text3" href={`/blog-details/${firstPost.id}`}>{truncateText(firstPost.title, 50)}</Link>
                          </h5>
                          <p className="desc heading-small-mob">{truncateText(firstPost.thumbnail_desc, 200)}</p>
                          <Link href={`/blog-details/${firstPost.id}`} className="button outline" style={{ marginLeft: "65%" }}>
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
                )}

                {otherPosts.map((data) => (
                  <div className="col-lg-4 news-card mt--60" key={data.id}>
                    <div
                      className="rainbow-card undefined"
                      style={{
                        maxWidth: "370px",
                        maxHeight: "112px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        background: "none",
                      }}
                    >
                      <div className="thumbnail" style={{ flexShrink: 0 }}>
                        <Link className="image" href={`/blog-details/${data.id}`}>
                          <Image style={{ borderRadius: "10px", width: "237px", height: "112px" }} src={data.thumbnail_img} width={237} height={112} alt="Blog Image" />
                        </Link>
                      </div>
                      <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "15px", flexGrow: 1, padding: "" }}>
                        <h4 className="title" style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "12px", fontWeight: "500", margin: "0 0 2px 0" }}>
                          <Link className="truncate-text3" href={`/blog-details/${data.id}`}>{truncateText(data.title, 50)}</Link>
                        </h4>
                        <p className="description" style={{ color: "rgba(255, 255, 255, 0.40)", fontFamily: "Satoshi-Regular", fontSize: "6px", fontWeight: "400", margin: "0" }}>
                          {truncateText(data.thumbnail_desc, 100)}
                        </p>
                        <Link className="btn-read-more border-transparent" href={`/blog-details/${data.id}`} style={{ color: "#907EFF", fontFamily: "Satoshi-Regular", fontSize: "7px", fontWeight: "500", textDecoration: "underline" }}>
                          <span>
                            Read More <i className="fa-sharp fa-regular fa-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="col-lg-12 text-center">
          <div className="rainbow-pagination text-center mt--60">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`custom-page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => handlePageChange(index + 1)} style={{ margin: "auto" }}>
                  <a style={{ borderTop: "1px solid rgba(255, 255, 255, 0.333)",    borderColor: "transparent", backdropFilter: "blur(30px)", backgroundColor: "rgb(10, 16, 41)" }} className="page-link" href="#">
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
