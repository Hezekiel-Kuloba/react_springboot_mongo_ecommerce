import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAccessToken(user.token);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    let timeout;

    const searchBlogs = async () => {
      if (!accessToken) return;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(
          "http://profiletasks.sandbox.co.ke:8989/blog/search",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              text: searchText,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error("Error fetching blogs:", response.status);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchBlogs();
    }, 500);

    return () => clearTimeout(timeout);
  }, [accessToken, searchText]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!accessToken) return;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(
          "http://profiletasks.sandbox.co.ke:8989/blog/get-all",
          {
            method: "POST",
            headers: headers,
          }
        );
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error("Error fetching blogs:", response.status);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [accessToken]);

  const handleDeleteBlog = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `http://profiletasks.sandbox.co.ke:8989/blog/delete`,
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              id: id,
            }),
        }
      );

      if (response.ok) {
        console.log("Blog deleted successfully");
        navigate("/blogs"); // Redirect to the blog list page
      } else {
        console.error("Error deleting blog:", response.status);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleViewBlog = (id) => {
    navigate(`/one_blog/${id}`);
  };

  const handleUpdateBlog = (id) => {
    navigate(`/blog_update/${id}`);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <h1>Blog List</h1>
      <TextField
      type="text"
      placeholder="Search blogs..."
      value={searchText}
      onChange={handleSearch}
      />
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <button onClick={() => handleViewBlog(blog.id)}>View Blog</button>
            <button onClick={() => handleDeleteBlog(blog.id)}>Delete Blog</button>
            <button onClick={() => handleUpdateBlog(blog.id)}>Update Blog</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
