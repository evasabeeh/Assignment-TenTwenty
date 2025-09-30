//This is all dummy data to feed API

const mockUser = {
    email: 'test@gmail.com',
    password: 'test1234',
    token: 'mock-session-token'
};

const timesheets = [
    { week: 1, date: '1 - 5 Jan 2024', status: 'COMPLETED', action: 'View' },
    { week: 2, date: '8 - 12 Jan 2024', status: 'COMPLETED', action: 'View' },
    { week: 3, date: '15 - 19 Jan 2024', status: 'INCOMPLETE', action: 'Update' },
    { week: 4, date: '22 - 26 Jan 2024', status: 'COMPLETED', action: 'View' },
    { week: 5, date: '28 Jan - 1 Feb 2024', status: 'MISSING', action: 'Create' },
];

const weekDetails = {
    1: [
        {
            date: 'Jan 01', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 02', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 03', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 04', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        { date: 'Jan 05', hours: 8, tasks: [] },
    ],
    2: [
        {
            date: 'Jan 08', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 09', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 10', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 11', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        { date: 'Jan 12', hours: 8, tasks: [] },
    ],
    3: [
        {
            date: 'Jan 15', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 16', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 17', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 18', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        { date: 'Jan 19', hours: 8, tasks: [] },
    ],
    4: [
        {
            date: 'Jan 21', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 22', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 23', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        {
            date: 'Jan 24', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        { date: 'Jan 25', hours: 8, tasks: [] },
    ],
    5: [
        {
            date: 'Jan 28', hours: 8, tasks: [
            ]
        },
        {
            date: 'Jan 29', hours: 8, tasks: [
            ]
        },
        {
            date: 'Jan 30', hours: 8, tasks: [
            ]
        },
        {
            date: 'Jan 31', hours: 8, tasks: [
                { task: 'Homepage Development', hours: 4, project: 'Project Name' },
            ]
        },
        { date: 'Feb 01', hours: 8, tasks: [] },
    ],
};

// These are API dummy endpoints and function to stimulate calls

export function fakeFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const token = options.headers?.Authorization?.split(' ')[1];

            if (url.endsWith('/api/login')) {
                const { email, password } = JSON.parse(options.body);
                if (email === mockUser.email && password === mockUser.password) {
                    resolve({ ok: true, json: () => Promise.resolve({ token: mockUser.token }) });
                } else {
                    reject({ ok: false, status: 401, message: 'Invalid credentials' });
                }
            } 
            else if (url.endsWith('/api/timesheets')) {
                if (token === mockUser.token) {
                    resolve({ ok: true, json: () => Promise.resolve(timesheets) });
                } else {
                    reject({ ok: false, status: 403, message: 'Unauthorized' });
                }
            } 
            else if (url.startsWith('/api/timesheet-details/')) {
                const week = url.split('/').pop();
                if (token === mockUser.token) {
                    resolve({ ok: true, json: () => Promise.resolve(weekDetails[week] || []) });
                } else {
                    reject({ ok: false, status: 403, message: 'Unauthorized' });
                }
            } 
            else {
                reject({ ok: false, status: 404, message: 'Not found' });
            }
        }, 500);
    });
}