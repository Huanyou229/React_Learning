import { useState } from "react";
import TaskList from "./TaskList";
const TaskPage = () => {
  const [tasks, setTasks] = useState([
    { name: "学习 React", completed: false },
    { name: "完成作业", completed: false },
  ]);
  const [taskName, setTaskName] = useState("");
  const handleAddTask = () => {
    if (taskName) {
      setTasks([...tasks, { name: taskName, completed: false }]);
      setTaskName("");
    }
  };
  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  return (
    <div>
      <h1>任务管理</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="输⼊⼀个新任务"
      />
      <button onClick={handleAddTask}>添加</button>
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};
export default TaskPage;
