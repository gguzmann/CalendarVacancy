import { Settings } from 'lucide-react';
import { useState } from 'react';

export const Configuration = ({ daysWeek, setDaysWeek, countDaysInRange }: { daysWeek: number[]; setDaysWeek: (days: number[]) => void; countDaysInRange: () => number }) => {
    const [isOpen, setIsOpen] = useState(false);

    const disabledDayWeek = (day: number) => {
        let daysFilter: number[];
        if (daysWeek.includes(day)) {
            daysFilter = daysWeek.filter(d => d !== day);
        } else {
            daysFilter = [...daysWeek, day];
        }
        setDaysWeek(daysFilter);
        countDaysInRange();
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-full p-2 border rounded-lg  bg-gray-50">
                <Settings strokeWidth={1.5} />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-32 mt-1 max-h-60 overflow-auto border rounded-lg bg-white shadow-lg">
                    <div>
                        {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map((day, i) => {
                            // Map UI index to day number (1=Monday, 2=Tuesday, ..., 0/7=Sunday)
                            const dayNumber = i === 6 ? 0 : i + 1;

                            return (
                                <div key={i} className="flex items-center p-1 hover:bg-gray-100 cursor-pointer">
                                    <label className="w-full" htmlFor={day}>
                                        {day}
                                    </label>
                                    <input id={day} type="checkbox" className="w-5 h-5" onChange={() => disabledDayWeek(dayNumber)} checked={daysWeek.includes(dayNumber)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
