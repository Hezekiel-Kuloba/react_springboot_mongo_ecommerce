import React from "react";
import CreateNewUser from "../authentication/create_new_user";
import UserProfile from "../authentication/get_user";
import UpdateUser from "../authentication/update_user";
import UserList from "../authentication/get_user";



const User = () => {
    return (
        <div>
            <CreateNewUser/>
            <UserProfile/>
            <UpdateUser/>
            <UserList/>
            <button onClick={() => handleUpdateUser(blog.id)}>Update User</button>
        </div>
    );
};

export default User;
