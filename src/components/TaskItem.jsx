import { useState } from 'react';

function TaskItem({ task, editTask, deleteTask, toggleComplete, lists, tags, addSubtask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDate, setEditedDate] = useState(task.date);
  const [editedList, setEditedList] = useState(task.list);
  const [editedTag, setEditedTag] = useState(task.tag);
  const [newSubtask, setNewSubtask] = useState('');

  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, { title: editedTitle, date: editedDate, list: editedList, tag: editedTag });
    }
    setIsEditing(!isEditing);
  };

  const handleAddSubtask = () => {
    if (newSubtask) {
      addSubtask(task.id, newSubtask);
      setNewSubtask('');
    }
  };

  const listColor = lists.find(l => l.name === task.list)?.color || 'gray-500';

  return (
    <li className={`flex items-center justify-between p-2 border-b ${task.completed ? 'line-through text-gray-500' : ''}`}>
      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleComplete(task.id)} 
          className="mr-2" 
        />
        {isEditing ? (
          <div className="flex flex-col">
            <input 
              type="text" 
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)} 
              className="p-1 border" 
            />
            <input 
              type="date" 
              value={editedDate} 
              onChange={(e) => setEditedDate(e.target.value)} 
              className="p-1 border mt-1" 
            />
            <select value={editedList} onChange={(e) => setEditedList(e.target.value)} className="p-1 border mt-1">
              {lists.map(list => <option key={list.name} value={list.name}>{list.name}</option>)}
            </select>
            <select value={editedTag} onChange={(e) => setEditedTag(e.target.value)} className="p-1 border mt-1">
              {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <input 
              type="text" 
              placeholder="Add subtask" 
              value={newSubtask} 
              onChange={(e) => setNewSubtask(e.target.value)} 
              className="p-1 border mt-1" 
            />
            <button onClick={handleAddSubtask} className="bg-green-500 text-white px-2 mt-1 rounded">Add Subtask</button>
          </div>
        ) : (
          <div>
            <span>{task.title}</span>
            <span className="ml-2 text-gray-500">Subtasks: {task.subtasks.length}</span>
            <span className="ml-2 text-gray-500">{task.date}</span>
            <span className={`ml-2 bg-${listColor}-100 text-${listColor}-700 px-1 rounded`}>{task.tag}</span>
          </div>
        )}
      </div>
      <div>
        <button onClick={handleEdit} className="text-blue-500 mr-2">{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;