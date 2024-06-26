import React from "react";
import CreateNewTask from "../tasks/create_task";
import TaskList from "../tasks/get_all_tasks";

const Tasks = () => {
    return (
        <div>
            <CreateNewTask/>
            <TaskList/>
        </div>
    );
};

export default Tasks;
