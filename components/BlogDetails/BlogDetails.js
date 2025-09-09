import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import BlogUpdateStatus from "../BlogUpdateStatus/BlogUpdateStatus";
import Image from "next/image";

const SingleBlog = () => {
  const router = useRouter();
  const postId = parseInt(router.query.blogId); // Get blogId from the query
  const [blogPost, setBlogPost] = useState(null); // State to store the fetched blog post
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    if (!postId) return; // Wait until postId is available

    // Fetch the blog post from the API
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/getpost?postId=${postId}`); // Pass postId to the API
        if (!response.ok) {
          throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }

        const data = await response.json();
        setBlogPost(data.blog); // Set the fetched blog post
      } catch (error) {
        console.error("Error fetching blog post:", error);
        router.push("/blog"); // Redirect to blog list if fetching fails
      } finally {
        setLoading(false); // Turn off loading spinner
      }
    };

    fetchBlogPost();
  }, [postId, router]);

  const formatDate = (dateString) => {
    return DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_MED); // Format date as needed
  };

  return (
    <>
      <div className="rainbow-blog-section rainbow-section-gap-big bg-color-1">
        <div className="container">
          <div className="row row--30">
            <div className="col-lg-8">
              <div className="rainbow-blog-details-area">
                <div className="post-page-banner">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="content text-center">
                          <div className="thumbnail">
                            <Image
                              className="w-100 radius"
                              src={blogPost?.img}
                              width={790}
                              height={445}
                              alt={`Image for ${blogPost?.title}`}
                            />
                          </div>
                          <ul className="rainbow-meta-list">
                            {blogPost?.date && (
                                <li>
                                  <i className="feather-calendar me-2"></i>
                                  {formatDate(blogPost.date)}
                                </li>
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog-details-content pt--40">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="content">
                          {loading ? (
                            <div style={{ textAlign: "center", padding: "20px" }}>
                              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                                Loading Blog Post...
                              </p>
                            </div>
                          ) : !blogPost ? (
                            <p>Blog post not found. Redirecting...</p> // Handle missing blog post case
                          ) : (
                            <>
                              <h2 className="title">{blogPost.title}</h2>
                              <div
                                className="blog-description"
                                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 mt_md--40 mt_sm--40"
              style={{ padding: 0 }}
            >
              <aside
                className="rainbow-sidebar"
                style={{ margin: 0, width: "100%" }}
              >
                <div className="form-group container inner text-center">
                  <div className="theme-gradient">
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "bolder",
                        letterSpacing: "3px",
                        borderBottom: "1px solid #fff3",
                        paddingBottom: "10px",
                      }}
                    >
                      NEWS TIMER
                    </h3>
                  </div>
                  <BlogUpdateStatus isBlogDetails={true} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;