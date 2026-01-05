export const DaysInput = ({ availableDays, setAvailableDays }: { availableDays: number; setAvailableDays: (days: number) => void }) => {
    return (
        <div className="flex items-center gap-3">
            <label htmlFor="availableDays" className=" text-gray-700 dark:text-gray-300 ">
                Vacaciones disponibles
            </label>
            <div className="flex items-center gap-3">
                <input
                    id="availableDays"
                    type="number"
                    min="0"
                    value={availableDays}
                    onChange={e => setAvailableDays(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <span className=" text-gray-700 dark:text-gray-300">dias</span>
            </div>
        </div>
    );
};
