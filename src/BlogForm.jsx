import React from "react";
import { useForm } from "react-hook-form";

const BlogForm = ({ blog, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: blog || { title: "", content: "", image: null },
  });

  const submitHandler = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    //console.log(formData);
    onSubmit(formData);
  };

  return (
    <div className="card border-0 shadow-lg mb-5">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="card-body">
          <div>
            <label className="form-label">Title</label>
            <input
              className="form-control"
              {...register("title", { required: true })}
            />
            {errors.title && <p>Title is required</p>}
          </div>
          <div>
            <label className="form-label">Content</label>
            <textarea
              cols="30"
              rows="3"
              className="form-control"
              {...register("content", { required: true })}
            ></textarea>
            {errors.content && <p>Content is required</p>}
          </div>
          <div>
            <label className="form-label">Image</label>
            <input
              className="form-control"
              type="file"
              {...register("image")}
            />
          </div>
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
