import { useState } from "react";

// 定义一个TodoList组件
const TodoList = () => {
  // 使用useState钩子，定义一个todos状态，初始值为空数组
  const [todos, setTodos] = useState([]);
  // 使用useState钩子，定义一个newTodo状态，初始值为空字符串
  const [newTodo, setNewTodo] = useState("");

  // 定义一个handleAddTodo函数，用于添加待办事项
  const handleAddTodo = () => {
    // 将新添加的待办事项添加到todos数组中
    setTodos([...todos, { text: newTodo, completed: false }]);
    // 清空newTodo状态
    setNewTodo("");
  };

  // 定义一个handleToggleCompleted函数，用于切换待办事项的完成状态
  const handleToggleCompleted = (index) => {
    // 创建一个新的todos数组
    const newTodos = [...todos];
    // 切换对应索引的待办事项的完成状态
    newTodos[index].completed = !newTodos[index].completed;
    // 更新todos状态
    setTodos(newTodos);
  };

  // 返回一个包含输入框、按钮和待办事项列表的div元素
  return (
    <div>
      {/* 输入框，用于输入新的待办事项 */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="请输入待办事项"
      />
      {/* 添加按钮，点击后添加新的待办事项 */}
      <button onClick={handleAddTodo}>添加待办</button>
      {/* 待办事项列表 */}
      <ul style={{ listStyleType: "none" }}>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(index)}
            />
            {todo.completed ? <del>{todo.text}</del> : todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 导出TodoList组件
export default TodoList;
