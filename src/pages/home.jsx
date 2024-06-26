import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <Link to="/sign_in">Users</Link>
            <Link to="/sign_in">Tasks</Link>
            <Link to="/sign_in">Blogs</Link>
        </div>
    );
};

export default Home;
