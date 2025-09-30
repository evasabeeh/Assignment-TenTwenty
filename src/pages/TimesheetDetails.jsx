import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionToken } from '../utils/auth';
import { fakeFetch } from '../mockServer';
import Modal from '../components/Modal';
import Header from '../components/Header';

export default function WeeklyTimesheetPage() {
    const { week } = useParams();
    const [openMenuKey, setOpenMenuKey] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [newTask, setNewTask] = useState({
        project: '',
        type: '',
        description: '',
        hours: 0,
    });

    // Fetch data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getSessionToken();
                const res = await fakeFetch(`/api/timesheet-details/${week}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                const formatted = {};
                data.forEach((entry) => {
                    formatted[entry.date] = entry.tasks;
                });
                setTasksByDay(formatted);
            } catch (err) {
            }
        };

        fetchData();
    }, [week]);

    // Add new task

    const handleSaveTask = () => {
        if (selectedDay && newTask.project && newTask.description && newTask.hours > 0) {
            const taskToAdd = {
                task: newTask.description,
                project: newTask.project,
                hours: newTask.hours,
            };

            setTasksByDay((prev) => ({
                ...prev,
                [selectedDay]: [...(prev[selectedDay] || []), taskToAdd],
            }));

            setIsModalOpen(false);
        } else {
            alert("Please fill all fields and add at least 1 hour.");
        }
    };

    // Delete a task

    const handleDelete = (day, idx) => {
        setTasksByDay((prev) => {
            const updatedDayTasks = [...prev[day]];
            updatedDayTasks.splice(idx, 1);
            return {
                ...prev,
                [day]: updatedDayTasks,
            };
        });
        setOpenMenuKey(null);
    };

    // Hour progress
    
    const calculateTotalHours = () => {
        let total = 0;
        Object.values(tasksByDay).forEach((tasks) => {
            tasks.forEach((task) => {
                total += task.hours;
            });
        });
        return total;
    };

    const totalHours = calculateTotalHours();
    const totalCapacity = 40;
    const cappedHours = Math.min(totalHours, totalCapacity);
    const progressPercent = Math.min((totalHours / totalCapacity) * 100, 100);

    return (
        <div className="min-h-screen bg-[#f9f9f9]">

            <Header />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                selectedDay={selectedDay}
                newTask={newTask}
                setNewTask={setNewTask}
            />

            <main className="max-w-5xl mx-auto mt-4 px-4">
                <div className="bg-white shadow rounded-md px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg md:text-xl font-bold">This week’s timesheet</h2>
                        <div className="text-sm text-gray-600 flex flex-col items-end">
                            <span className="mb-1">{cappedHours}/{totalCapacity} hrs</span>
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-300"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">21 - 26 January, 2024</p>

                    {Object.keys(tasksByDay).map((day) => (
                        <div key={day} className="mb-6">
                            <div className="flex items-start gap-2 md:gap-4">
                                <div className="w-16 md:w-20 pt-2 text-xs md:text-sm font-bold text-gray-700">{day}</div>

                                <div className="flex-1 space-y-2">
                                    {tasksByDay[day].map((entry, idx) => {
                                        const taskKey = `${day}-${idx}`;
                                        return (
                                            <div
                                                key={taskKey}
                                                className="relative flex items-center justify-between border border-gray-200 rounded-md p-2"
                                            >
                                                <div className="text-xs md:text-sm text-gray-800">{entry.task}</div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-xs text-gray-400">{entry.hours} hrs</div>
                                                    <div className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800">
                                                        {entry.project}
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            setOpenMenuKey((prev) => (prev === taskKey ? null : taskKey))
                                                        }
                                                        className="cursor-pointer text-xs text-gray-400"
                                                    >
                                                        •••
                                                    </button>
                                                </div>

                                                {openMenuKey === taskKey && (
                                                    <div className="absolute right-2 top-10 bg-white border border-gray-200 shadow-md rounded-md text-xs md:text-sm z-10 w-28">
                                                        <button
                                                            onClick={() => {
                                                                console.log(`Edit ${taskKey}`);
                                                                setOpenMenuKey(null);
                                                            }}
                                                            className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100 text-left"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(day, idx)}
                                                            className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    <button
                                        className="w-full border border-dashed text-gray-500 hover:bg-blue-100 hover:text-blue-800 text-xs md:text-sm font-medium py-2 rounded-md transition"
                                        onClick={() => {
                                            setSelectedDay(day);
                                            setNewTask({ project: '', type: '', description: '', hours: 0 });
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        + Add new task
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 mb-6 bg-white py-6 px-6 rounded-md shadow text-center text-xs text-gray-500">
                    © 2024 tentwenty. All rights reserved.
                </div>
            </main>
        </div>
    );
}
