import { useState } from 'react';

export default function Modal({
    isOpen,
    onClose,
    onSave,
    newTask,
    setNewTask,
}) {
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!newTask.project) newErrors.project = 'Project is required';
        if (!newTask.type) newErrors.type = 'Type of work is required';
        if (!newTask.description) newErrors.description = 'Task description is required';
        if (!newTask.hours || newTask.hours <= 0) newErrors.hours = 'Hours must be greater than 0';
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            onSave();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-80 md:max-w-120 lg:max-w-1/2 rounded-lg shadow-lg p-6 relative">
                <h2 className="text-md font-semibold mb-4">Add New Entry</h2>
                <hr className="mb-4 border-gray-300" />
                <label className="block text-sm mb-1 font-semibold">Select Project *</label>
                <select
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    className="w-3/5 text-sm text-gray-400 border rounded-lg px-3 py-2 mb-1"
                >
                    <option value="">Project Name</option>
                    <option value="Project A">Project A</option>
                    <option value="Project B">Project B</option>
                </select>
                {errors.project && <p className="text-red-500 text-xs mb-2">{errors.project}</p>}

                <label className="block text-sm mb-1 mt-4 font-semibold">Type of Work *</label>
                <select
                    value={newTask.type}
                    onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                    className="w-3/5 text-sm text-gray-400 border rounded-lg px-3 py-2 mb-1"
                >
                    <option value="">Type of work</option>
                    <option value="Bug fixes">Bug fixes</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Testing">Testing</option>
                </select>
                {errors.type && <p className="text-red-500 text-xs mb-2">{errors.type}</p>}

                <label className="block text-sm mb-1 mt-4 font-semibold">Task description *</label>
                <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Write text here..."
                    rows={4}
                    className="w-full text-sm text-gray-400 border rounded-lg px-3 py-2 resize-none"
                />
                <p className="text-xs text-gray-400">A note for extra info</p>
                {errors.description && <p className="text-red-500 text-xs mb-2">{errors.description}</p>}

                <label className="block text-sm font-semibold mb-1 mt-4">Hours *</label>
                <div className="flex items-center gap-2 mb-1">
                    <button
                        onClick={() =>
                            setNewTask((prev) => ({ ...prev, hours: Math.max(0, prev.hours - 1) }))
                        }
                        className="px-3 py-1 bg-gray-200 text-sm font-bold border border-gray-300"
                    >
                        −
                    </button>
                    <span className="text-sm text-gray-400">{newTask.hours}</span>
                    <button
                        onClick={() =>
                            setNewTask((prev) => ({ ...prev, hours: Math.min(12, prev.hours + 1) }))
                        }
                        className="px-3 py-1 bg-gray-200 text-sm font-bold border border-gray-300"
                    >
                        +
                    </button>
                </div>

                {errors.hours && <p className="text-red-500 text-xs mb-4">{errors.hours}</p>}

                <hr className="my-4 border-gray-200" />
                
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 bg-blue-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Add entry
                    </button>
                    <button
                        onClick={onClose}
                        className="w-1/2 border border-gray-300 text-sm text-gray-800 px-4 py-2 rounded-lg hover:text-black hover:border-gray-500"
                    >
                        Cancel
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 cursor-pointer text-gray-400 hover:text-black text-xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
