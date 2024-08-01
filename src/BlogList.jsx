import React from "react";

const API_URL = "http://localhost:8000";

const BlogList = ({ blogs, onEdit }) => {
  console.log(blogs);
  const deleteBlog = (id) => {
    fetch(`${API_URL}/api/animalblogs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>

          {blog.image && (
            <img src={`${API_URL}/storage/${blog.image}`} alt={blog.title} />
          )}
          <button onClick={() => onEdit(blog)}>Edit</button>
          <button onClick={() => deleteBlog(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
