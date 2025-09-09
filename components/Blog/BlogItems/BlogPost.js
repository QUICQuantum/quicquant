import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const BlogPost = ({ blogpost, isMainPage }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      {!isMainPage ? (
        // Outer format for when isMainPage is true
        <div className="inner">
          <ul>
            {blogpost.slice(0, 3).map((data) => (
              <li key={data.id}>
                <div className="list-blog-sm">
                  <div className="img">
                    <Image src={data.img} width={120} height={85} alt="Blog" />
                  </div>
                  <div className="content">
                    <Link className="d-block" href={`/blog-details/${data.id}`}>
                      {data.title}
                    </Link>
                    <span className="cate">{data.cate}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Inner format for when isMainPage is false
        <div className="inner" style={{ borderRadius: '5px' }}>
          <ul style={{ display: 'flex', padding: 0, listStyle: 'none', gap: '10px' }}>
            {blogpost.slice(0, 3).map((data, index) => (
              <li key={data.id} style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="list-blog-sm"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transition: 'background-color 0.3s ease',
                    background: hoveredIndex === index
                      ? 'linear-gradient(45deg, #815BF5, #cb97ff)'
                      : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    padding: '5px', // Reduced padding for thinner boxes
                    height: '100%',
                  }}
                >
                  <div className="img" style={{ flexShrink: 0 }}>
                    <Image
                      src={data.img}
                      alt="Blog"
                      width={120}
                      height={60}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="content" style={{ paddingLeft: '5px', flexGrow: 1 }}>
                    <Link
                      className="d-block"
                      style={{
                        fontSize: '14px', // Slightly reduced font size
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.4', // Reduced line height for less spacing between lines
                      }}
                      href={`/blog-details/${data.id}`}
                    >
                      {data.title.length > 50 ? `${data.title.slice(0, 50)}...` : data.title}
                    </Link>
                    <span
                      className="cate"
                      style={{
                        display: 'block',
                        marginTop: '3px', // Reduced margin for closer spacing
                        fontSize: '12px',
                        color: '#666',
                      }}
                    >
                      {data.cate}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BlogPost;