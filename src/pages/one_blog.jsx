import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAccessToken(user.token);
        fetchBlogById(user.token, id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [id]);

  const fetchBlogById = async (token, id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `http://profiletasks.sandbox.co.ke:8989/blog/get`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      } else {
        console.error("Error fetching blog:", response.status);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

 

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
      <h2 ><span >Blog Title: </span>{blog.title}</h2>
        <h2 style={{ }}><span>Blog Content: </span>{blog.content}</h2>
      {/* Add any other task details you want to display */}
    </div>
      {/* Add any other blog details you want to display */}
    </div>
  );
};

export default Blog;
