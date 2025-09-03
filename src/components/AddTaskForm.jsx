import { useState } from 'react';

function AddTaskForm({ addTask, lists, tags }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [selectedList, setSelectedList] = useState(lists[0]?.name || '');
  const [selectedTag, setSelectedTag] = useState(tags[0] || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      addTask({ title, date, list: selectedList, tag: selectedTag });
      setTitle('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col md:flex-row gap-2">
      <input 
        type="text" 
        placeholder="Task title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="flex-grow p-2 border rounded" 
        required 
      />
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        className="p-2 border rounded" 
      />
      <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)} className="p-2 border rounded">
        {lists.map(list => <option key={list.name} value={list.name}>{list.name}</option>)}
      </select>
      <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="p-2 border rounded">
        {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}

export default AddTaskForm;