import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

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
        window.location.reload();
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
      <h2 style={{ color: "#3B71CA" }}>Create New Blog</h2>

      <TextField
        type="text"
        placeholder="Search blogs..."
        value={searchText}
        onChange={handleSearch}
        style={{ width: "450px", marginBottom: "16px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>Title</TableSortLabel>
              </TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.content}</TableCell>
                <TableCell>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => handleViewBlog(blog.id)}
                  >
                    View
                  </button>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </button>
                  <button onClick={() => handleUpdateBlog(blog.id)}>
                    Update
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
