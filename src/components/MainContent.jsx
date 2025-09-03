import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

function MainContent({ tasks, addTask, editTask, deleteTask, toggleComplete, selectedView, lists, tags, addSubtask }) {
  return (
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{selectedView} <span className="text-gray-500">{tasks.length}</span></h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add New Task</button>
      </div>
      
      <AddTaskForm addTask={addTask} lists={lists} tags={tags} />
      
      <ul>
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            editTask={editTask} 
            deleteTask={deleteTask} 
            toggleComplete={toggleComplete} 
            lists={lists} 
            tags={tags} 
            addSubtask={addSubtask}
          />
        ))}
      </ul>
    </div>
  );
}

export default MainContent;