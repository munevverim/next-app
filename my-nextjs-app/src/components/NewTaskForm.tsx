import React, { useState } from 'react';

interface NewTaskFormProps {
  closeForm: () => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ closeForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Task ekleme işlemi burada yapılabilir
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
      <h2 className="mb-4 text-lg font-bold">New Task</h2>
      <div className="mb-4">
        <label className="block text-sm">Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Task</button>
      <button type="button" onClick={closeForm} className="w-full bg-gray-500 text-white p-2 rounded mt-2">Cancel</button>
    </form>
  );
};

export default NewTaskForm;

