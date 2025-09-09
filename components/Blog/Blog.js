import React, { useState } from "react";

import BlogItem from "./BlogItem";
import { useAppContext } from "@/context/DataContext";


const Blog = () => {
  const { blogs } = useAppContext();
  return (
    <>
      <div className="rainbow-blog-area rainbow-section-gap">
        <div className="container">
          <div className="row row--30">
            <div className="col-lg-12">
              <BlogItem
                blog={blogs}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Blog;