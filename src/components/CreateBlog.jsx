import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000";

const CreateBlog = () => {
  const [html, setHtml] = useState("");
  const [imageId, setImageId] = useState("");

  function onChange(e) {
    setHtml(e.target.value);
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_URL}/api/save-temp-image/`, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);

    if (result.status == false) {
      alert(result.errors.image);
      e.target.value = null;
    }

    setImageId(result.image.id);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const newData = { ...data, description: html, image_id: imageId };

    console.log(newData);
    const res = await fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    });
    toast("blog added successfully");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Create Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg mb-5">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Title
              </label>
              <input
                type="text"
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="invalid-feedback">Title field is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Short Description
              </label>
              <textarea
                cols="30"
                rows="3"
                className={`form-control ${errors.author && "is-invalid"}`}
                {...register("short_des", { required: true })}
              />
              {errors.short_des && (
                <p className="invalid-feedback">
                  Short Description field is required
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Description
              </label>
              <Editor
                value={html}
                containerProps={{ style: { height: "200px" } }}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Image
              </label>
              <br />
              <input
                type="file"
                className="form-control"
                //{...register("image")}
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Author
              </label>
              <input
                type="text"
                className={`form-control ${errors.author && "is-invalid"}`}
                placeholder="Author"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <p className="invalid-feedback">Author field is required</p>
              )}
            </div>
            <div className="mb-3">
              <button className="btn btn-dark">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
