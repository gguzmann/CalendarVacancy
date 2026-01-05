'use client';

import { Calendar } from '@/components/Calendar';
import { RegisterVacations } from '@/components/RegisterVacations';
import { Configuration } from '@/components/ui/Configuration';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { ToogleButton } from '@/components/ui/ToogleButton';
import { useHolidays } from '@/hooks/useHolidays';
import { Country, DateRanges, VacationRange } from '@/utils/types';
import { eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { useState } from 'react';

export default function Home() {
    const [selectedCountry, setSelectedCountry] = useState<Country>({
        code: 'CL',
        name: 'Chile',
        flag: '/flags/cl.webp'
    });
    const [selectedRange, setSelectedRange] = useState<DateRanges>({});
    const [daysWeek, setDaysWeek] = useState([0, 6]);
    const [availableDays, setAvailableDays] = useState(0);
    const [savedRanges, setSavedRanges] = useState<VacationRange[]>([]);

    const { holidays, loading, error } = useHolidays({ year: 2025, countryCode: selectedCountry.code });

    /**
     * Handles changes in the selected country.
     * Resets selected range and non-working days.
     * @param country - The newly selected country object.
     */
    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        setSelectedRange({});
        setDaysWeek([0, 6]);
    };

    /**
     * Counts the number of valid working days within the selected date range.
     * Excludes non-working days (daysWeek) and public holidays.
     * @returns The count of valid vacation days in the selected range.
     */
    const countDaysInRange = () => {
        if (selectedRange?.from && selectedRange?.to) {
            const daysInRange = eachDayOfInterval({
                start: selectedRange.from,
                end: selectedRange.to
            });

            const validDays = daysInRange.filter(day => !daysWeek.includes(day.getDay()) && !holidays.some(holiday => isSameDay(parseISO(holiday.date), day)));
            return validDays.length;
        }
        return 0;
    };

    /**
     * Adds a new vacation range to the saved list.
     * @param range - The vacation range object to save.
     */
    const handleSaveRange = (range: VacationRange) => {
        setSavedRanges(prev => [...prev, range]);
    };

    /**
     * Clears all saved vacation ranges.
     */
    const clearSavedRanges = () => {
        setSavedRanges([]);
    };

    /**
     * Deletes a specific saved vacation range by its index.
     * @param index - The index of the range to delete.
     */
    const handleDeleteRange = (index: number) => {
        setSavedRanges(prev => prev.filter((_, i) => i !== index));
    };

    /**
     * Calculates the total number of days used across all saved vacation ranges.
     * @returns The total number of used vacation days.
     */
    const calculateUsedDays = () => {
        return savedRanges.reduce((total, range) => total + range.days, 0);
    };

    const usedDays = calculateUsedDays();

    return (
        <>
            <header className="flex justify-between items-center bg-white dark:bg-[#212121] transition-colors duration-200 px-4 sm:px-6 py-3">
                <div className="flex gap-4 items-center">
                    <Configuration daysWeek={daysWeek} setDaysWeek={setDaysWeek} countDaysInRange={countDaysInRange} />
                    <CountrySelect value={selectedCountry} onChange={handleCountryChange} />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex">
                    <span className="text-2xl sm:text-4xl font-bold ">🏝️</span>
                    <h1 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300 dark:from-green-300 dark:to-white whitespace-nowrap">
                        Vacancy Planner
                    </h1>
                </div>

                <ToogleButton />
            </header>

            <main className="flex flex-col items-center min-h-screen p-4 sm:p-8 pt-10 bg-white dark:bg-[#1c1c1c] transition-colors duration-200 font-[family-name:var(--font-geist-sans)]">
                <div className="flex flex-col justify-between items-center mb-4 ">
                    {/* <h2 className="text-2xl font-bold text-blue-600 dark:text-green-300">Resumen de plan</h2> */}
                    <div className="flex justify-between mb-6 p-4 gap-2 bg-blue-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-center">
                            <h3 className="text-sm text-gray-500 dark:text-gray-400">Días disponibles</h3>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={availableDays}
                                    onChange={e => {
                                        const value = parseInt(e.target.value, 10);
                                        if (e.target.value === '' || (!isNaN(value) && value >= 0)) {
                                            setAvailableDays(e.target.value === '' ? 0 : value);
                                        }
                                    }}
                                    className="text-2xl font-bold text-blue-600 dark:text-green-300 text-center w-20 p-1 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 rounded
                                        focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-green-400"
                                    aria-label="Días disponibles"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm text-gray-500 dark:text-gray-400">Días usados</h3>
                            <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{usedDays}</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm text-gray-500 dark:text-gray-400">Días restantes</h3>
                            <p className="text-2xl font-bold text-blue-600 dark:text-green-300">{availableDays - usedDays}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl">
                    <div className="md:col-span-2 dark:text-white bg-white dark:bg-[#212121] p-4 rounded-lg shadow">
                        <Calendar
                            holidays={holidays}
                            selectedRange={selectedRange}
                            daysWeek={daysWeek}
                            loading={loading}
                            error={error}
                            setSelectedRange={setSelectedRange}
                            countDaysInRange={countDaysInRange}
                            availableDays={availableDays}
                            usedDays={usedDays}
                            onSaveRange={handleSaveRange}
                        />
                    </div>
                    <div className="md:col-span-1 bg-white dark:bg-[#212121] p-4 rounded-lg shadow flex flex-col">
                        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
                            <RegisterVacations savedRanges={savedRanges} availableDays={availableDays} usedDays={usedDays} onClearVacations={clearSavedRanges} onDeleteRange={handleDeleteRange} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
