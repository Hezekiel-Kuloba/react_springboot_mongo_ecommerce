import React from "react";
import CreateNewBlog from "../blogs/create_new_blog";
import BlogList from "../blogs/get_all_blogs";

const Blogs = () => {
    return (
        <div>
            <CreateNewBlog/>
            <BlogList/>
        </div>
    );
};

export default Blogs;
