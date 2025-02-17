import React from "react";

class TaskList extends React.Component {
  render() {
    const taskList = [
      {
        id: 1,
        name: "吃饭",
        completed: true,
      },
      {
        id: 2,
        name: "睡觉",
        completed: false,
      },
      {
        id: 3,
        name: "敲代码",
        completed: false,
      },
    ];
    const unfinishedCount = taskList.filter((task) => !task.completed).length;
    return (
      <div>
        <h2>任务列表</h2>
        <h2>当前未完成任务数：{unfinishedCount}</h2>
        <div>
          {taskList.map((task) => {
            return (
              <div key={task.id}>
                <span style={{ color: task.completed ? "green" : "red" }}>
                  {task.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default TaskList;
