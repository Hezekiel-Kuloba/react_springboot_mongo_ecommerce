import React from "react";
import CreateNewUser from "../authentication/create_new_user";
import UserProfile from "../authentication/get_user";
import UpdateUser from "../authentication/update_user";
import UserList from "../authentication/get_user";



const User = () => {
    return (
        <div style={{display:"flex" }}>

            <div style={{ marginRight: "50px" }}>
            <UserList/>
            </div>

            <div>
            <CreateNewUser/>
            <UpdateUser/>
            </div>
        </div>
    );
};

export default User;
