import { useState } from 'react';

function Sidebar({ selectedView, setSelectedView, lists, addList, tags, addTag, searchTerm, setSearchTerm }) {
  const [newList, setNewList] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleAddList = () => {
    if (newList) {
      const colors = ['pink-500', 'cyan-500', 'yellow-500'];
      const newColor = colors[lists.length % colors.length];
      addList({ name: newList, color: newColor });
      setNewList('');
    }
  };

  const handleAddTag = () => {
    if (newTag) {
      addTag(newTag);
      setNewTag('');
    }
  };

  return (
    <div className="w-full md:w-64 bg-white p-4 border-r border-gray-200 overflow-y-auto">
      <input 
        type="text" 
        placeholder="Search" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="w-full mb-4 p-2 border rounded" 
      />
      
      <h3 className="font-bold mb-2">TASKS</h3>
      <ul className="mb-4">
        <li className={`cursor-pointer ${selectedView === 'Upcoming' ? 'text-blue-500' : ''}`} onClick={() => setSelectedView('Upcoming')}>Upcoming <span className="text-gray-500">12</span></li>
        <li className={`cursor-pointer ${selectedView === 'Today' ? 'text-blue-500' : ''}`} onClick={() => setSelectedView('Today')}>Today <span className="text-gray-500">5</span></li>
        <li className={`cursor-pointer ${selectedView === 'Calendar' ? 'text-blue-500' : ''}`} onClick={() => setSelectedView('Calendar')}>Calendar</li>
        <li className={`cursor-pointer ${selectedView === 'Sticky Wall' ? 'text-blue-500' : ''}`} onClick={() => setSelectedView('Sticky Wall')}>Sticky Wall</li>
      </ul>
      
      <h3 className="font-bold mb-2">LISTS</h3>
      <ul className="mb-4">
        {lists.map((list) => (
          <li key={list.name} className="cursor-pointer">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 bg-${list.color}`}></span>
            {list.name} <span className="text-gray-500">3</span>
          </li>
        ))}
        <div className="flex mt-2">
          <input 
            type="text" 
            placeholder="Add New List" 
            value={newList} 
            onChange={(e) => setNewList(e.target.value)} 
            className="flex-grow p-1 border rounded-l" 
          />
          <button onClick={handleAddList} className="bg-blue-500 text-white px-2 rounded-r">+</button>
        </div>
      </ul>
      
      <h3 className="font-bold mb-2">TAGS</h3>
      <ul className="mb-4">
        {tags.map((tag, index) => (
          <li key={index} className="cursor-pointer bg-cyan-100 text-cyan-700 inline-block mr-2 mb-2 px-2 rounded">{tag}</li>
        ))}
        <div className="flex mt-2">
          <input 
            type="text" 
            placeholder="Add Tag" 
            value={newTag} 
            onChange={(e) => setNewTag(e.target.value)} 
            className="flex-grow p-1 border rounded-l" 
          />
          <button onClick={handleAddTag} className="bg-blue-500 text-white px-2 rounded-r">+</button>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;