import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CalendarView from './components/CalendarView';

function App() {
  // Initialize tasks state with localStorage data or empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Failed to parse saved tasks:', error);
      return []; // Fallback to empty array if parsing fails
    }
  });

  const [selectedView, setSelectedView] = useState('Today');
  const [lists, setLists] = useState([{ name: 'Personal', color: 'pink-500' }, { name: 'Work', color: 'cyan-500' }, { name: 'List 1', color: 'yellow-500' }]);
  const [tags, setTags] = useState(['Tag 1', 'Tag 2']);
  const [searchTerm, setSearchTerm] = useState('');

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  // Filter tasks based on selected view and search term
  const filteredTasks = tasks.filter(task => {
    const matchesView = selectedView === 'Today'
      ? task.date === new Date().toISOString().split('T')[0]
      : true;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.subtasks && task.subtasks.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesView && matchesSearch;
  });

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false, subtasks: [] }]);
  };

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const addSubtask = (taskId, subtask) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, subtasks: [...task.subtasks, subtask] } : task));
  };

  const addList = (newList) => {
    const colors = ['pink-500', 'cyan-500', 'yellow-500'];
    const newColor = colors[lists.length % colors.length];
    setLists([...lists, { name: newList, color: newColor }]);
  };

  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar 
        selectedView={selectedView} 
        setSelectedView={setSelectedView} 
        lists={lists} 
        addList={addList} 
        tags={tags} 
        addTag={addTag} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {selectedView === 'Calendar' ? (
        <CalendarView tasks={tasks} />
      ) : (
        <MainContent 
          tasks={filteredTasks} 
          addTask={addTask} 
          editTask={editTask} 
          deleteTask={deleteTask} 
          toggleComplete={toggleComplete} 
          selectedView={selectedView} 
          lists={lists} 
          tags={tags} 
          addSubtask={addSubtask}
        />
      )}
    </div>
  );
}

export default App;