import React from "react";

const Categories = ({ blog, onCategoryClick, activeCategory }) => {
  const categoryCounts = blog.reduce((acc, post) => {
    acc[post.cate] = (acc[post.cate] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="inner">
      <ul className="category-list">
        {["All", ...Object.keys(categoryCounts)].map((category, index) => (
          <li key={index}>
            <a
              href="#"
              className={category === activeCategory ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onCategoryClick(category);
              }}
            >
              <span className="left-content">{category}</span>
              <span className="count-text">
                {category === "All" ? blog.length : categoryCounts[category]}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
