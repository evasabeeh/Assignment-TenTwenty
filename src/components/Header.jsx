import { ChevronDown } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white">
            <div className="flex items-center gap-4 md:gap-6">
                <div className="text-xl font-semibold text-black">ticktock</div>
                <nav className="text-sm font-semibold">Timesheets</nav>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                John Doe
                <ChevronDown size={16} />
            </div>
        </header>
    );
}