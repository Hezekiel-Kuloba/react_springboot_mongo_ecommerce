import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <div style={{display:"flex", alignItems: "space-between" }}>
        <div>
      <Button
        className="authButton"
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        <Link style={{color: "white"}} to="/user">Users</Link>
      </Button>
      </div>
      <div>
      <Button
        className="authButton"
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        <Link style={{color: "white"}} to="/blogs">Blogs</Link>
      </Button>
      </div>
      <div>
      <Button
        className="authButton"
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        
        <Link style={{color: "white"}} to="/task">Tasks</Link>
      </Button>
      </div>
      <Button
        className="authButton"
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
