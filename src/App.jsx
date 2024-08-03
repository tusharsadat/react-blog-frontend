import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogForm from "./BlogForm";
import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import BlogDetail from "./components/BlogDetail";
import EditBlog from "./components/EditBlog";

const API_URL = "http://localhost:8000";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/animalblogs`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const createBlog = (formData) => {
    fetch(`${API_URL}/api/animalblogs`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((newBlog) => {
        setBlogs([...blogs, newBlog]);
        setCurrentBlog(null);
        console.log(blogs);
      })
      .catch((error) => console.error("Error:", error));
  };

  const updateBlog = (formData) => {
    fetch(`${API_URL}/api/animalblogs/${currentBlog.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((updatedBlog) => {
        setBlogs(
          blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        );
        setCurrentBlog(null);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
  };

  return (
    <>
      <div className="bg-dark text-center py-2 shadow-lg">
        <h1 className="text-white">News Blog App</h1>
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route
          path="/blog-form"
          element={
            <BlogForm
              blog={currentBlog}
              onSubmit={currentBlog ? updateBlog : createBlog}
            />
          }
        />
        <Route
          path="/bloglist"
          element={<BlogList blogs={blogs} onEdit={handleEdit} />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
