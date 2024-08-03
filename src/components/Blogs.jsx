import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import PaginationComponent from "./PaginationComponent";
//import ReactPaginate from "react-paginate";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [keyword, setKeyword] = useState("");

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust as needed

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:8000/api/blogs");
    const result = await res.json();
    setBlogs(result.data);
    setItems(result.data);
  };

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const searchBlogs = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:8000/api/blogs?keyword=" + keyword
    );
    const result = await res.json();
    setBlogs(result.data);
  };

  const resetSearch = () => {
    fetchBlogs();
    setKeyword("");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center pt-5 ">
        <form onSubmit={(e) => searchBlogs(e)}>
          <div className="d-flex">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control"
              placeholder="Search Blogs"
            />
            <button className="btn btn-dark ms-2">Search</button>
            <button
              type="button"
              onClick={() => resetSearch()}
              className="btn btn-success ms-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Blogs</h4>
        <a href="/create" className="btn btn-dark">
          Create
        </a>
      </div>
      <div className="row">
        {currentItems &&
          currentItems.map((blog) => {
            return (
              <BlogCard
                blogs={blogs}
                setBlogs={setBlogs}
                blog={blog}
                key={blog.id}
              />
            );
          })}

        <PaginationComponent
          totalItems={items.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Blogs;
