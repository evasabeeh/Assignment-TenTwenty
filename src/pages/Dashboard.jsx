import { useEffect, useState } from 'react';
import { getSessionToken } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import Header from '../components/Header';
import { fakeFetch } from '../mockServer';

export default function TimesheetDashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Fetch the data 

    useEffect(() => {
        async function fetchData() {
            try {
                const token = getSessionToken();
                const res = await fakeFetch('/api/timesheets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error('Failed to fetch');
                const result = await res.json();
                setData(result);
            } catch (err) {
                setError('Failed to load timesheets');
            }
        }

        fetchData();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-100 text-green-700";
            case "INCOMPLETE":
                return "bg-yellow-100 text-yellow-800";
            case "MISSING":
                return "bg-pink-100 text-pink-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Filter logic
    
    const filterByDate = (entry) => {
        if (!dateFilter) return true;
        if (dateFilter === 'this-week') return entry.week === 3;
        if (dateFilter === 'last-week') return entry.week === 2;
        if (dateFilter === 'this-month') return [3,4].includes(entry.week);
        if (dateFilter === 'last-month') return [1,2].includes(entry.week);
        return true;
    };

    const filterByStatus = (entry) => {
        if (!statusFilter) return true;
        return entry.status.toLowerCase() === statusFilter;
    };

    const filteredData = data.filter(entry => filterByDate(entry) && filterByStatus(entry));

    return (
        <div className="min-h-screen bg-[#f9f9f9]">
            <Header />
            <main className="max-w-5xl mx-auto mt-4 px-4">
                <div className="bg-white shadow rounded-md px-6 py-4">
                    <h2 className="text-xl font-bold mb-4">Your Timesheets</h2>
                    <div className="flex gap-4 mb-6">
                        <div className="flex flex-col">
                            <select
                                className="text-xs border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-400 min-w-[140px]"
                                value={dateFilter}
                                onChange={e => setDateFilter(e.target.value)}
                            >
                                <option value="">Date Range</option>
                                <option value="this-week">This Week</option>
                                <option value="last-week">Last Week</option>
                                <option value="this-month">This Month</option>
                                <option value="last-month">Last Month</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <select
                                className="text-xs border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-400 min-w-[120px]"
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                            >
                                <option value="">Status</option>
                                <option value="completed">Completed</option>
                                <option value="incomplete">Incomplete</option>
                                <option value="missing">Missing</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto rounded-xl shadow">
                        <table className="w-full text-xs text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="pl-4 py-4 border-b border-gray-200 cursor-pointer hover:text-gray-700 w-28">
                                        <div className="flex items-center gap-4">
                                            WEEK #
                                            <ArrowDown size={12} />
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 border-b border-gray-200 cursor-pointer hover:text-gray-700">
                                        <div className="flex items-center gap-4">
                                            DATE
                                            <ArrowDown size={12} />
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 border-b border-gray-200 cursor-pointer hover:text-gray-700">
                                        <div className="flex items-center gap-4">
                                            STATUS
                                            <ArrowDown size={12} />
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 border-b border-gray-200 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((entry, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-t hover:bg-gray-50 cursor-pointer"
                                        onClick={() => navigate(`/timesheet/${entry.week}`)}
                                    >
                                        <td className="bg-gray-50 pl-4 py-4 border-b border-gray-200">
                                            {entry.week}
                                        </td>
                                        <td className="text-gray-500 px-4 py-4 border-b border-gray-200">{entry.date}</td>
                                        <td className="px-4 py-4 border-b border-gray-200">
                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusClass(entry.status)}`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 border-b border-gray-200 text-right">
                                            <Link
                                                to={`/timesheet/${entry.week}`}
                                                className="text-blue-600 hover:underline text-sm"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {entry.action}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 my-2">
                        <div className="flex items-center gap-2">
                            <select className="text-xs border border-gray-300 bg-gray-100 rounded px-2 py-1">
                                <option value="5">5 per page</option>
                                <option value="10">10 per page</option>
                                <option value="20">20 per page</option>
                            </select>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-1 border rounded-md border-gray-200">
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                Previous
                            </button>
                            
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                1
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                2
                            </button>
                            <button className="px-2 py-1 text-xs text-blue-600 bg-gray-100 border-r border-gray-200">
                                3
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                4
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                5
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                6
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                7
                            </button>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                8
                            </button>
                            <span className="px-2 text-xs text-gray-500">...</span>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-l border-r border-gray-200">
                                99
                            </button>

                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700">
                                Next
                            </button>
                        </div>

                        <div className="flex md:hidden items-center gap-1 border rounded-md border-gray-200">
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                Previous
                            </button>
                            
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                1
                            </button>
                            <button className="px-2 py-1 text-xs text-blue-600 bg-gray-100 border-r border-gray-200">
                                3
                            </button>
                            <span className="px-2 text-xs text-gray-500">...</span>
                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 border-r border-gray-200">
                                99
                            </button>

                            <button className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700">
                                Next
                            </button>
                        </div>
                    </div>
                </div >

                <div className="mt-4 bg-white py-6 px-6 rounded-md shadow text-center text-xs text-gray-500">
                    © 2024 tentwenty. All rights reserved.
                </div>
            </main >
        </div >
    );
}