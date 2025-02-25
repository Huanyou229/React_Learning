import PropTypes from "prop-types";
const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <div>
      <h2>任务列表</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name} {task.completed && "✔️"}
            <button onClick={() => onComplete(index)}>完成</button>
            <button onClick={() => onDelete(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default TaskList;
