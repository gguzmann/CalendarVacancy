'use client';

import { DateRanges, Holiday, VacationRange } from '@/utils/types';
import { isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { LoadingSpinner } from './ui/LoadingSpinner';

import { useState } from 'react';

import { addMonths } from 'date-fns';

export function Calendar({
    holidays,
    selectedRange,
    daysWeek,
    loading,
    error,
    setSelectedRange,
    countDaysInRange,
    availableDays,
    usedDays,
    onSaveRange
}: {
    holidays: Holiday[];
    selectedRange: DateRanges;
    daysWeek: number[];
    loading: boolean;
    error: string | null;
    setSelectedRange: (range: DateRanges) => void;
    countDaysInRange: () => number;
    availableDays: number;
    usedDays: number;
    onSaveRange: (range: VacationRange) => void;
}) {
    const today = new Date();
    const nextMonth = addMonths(today, 1);

    const [month, setMonth] = useState(nextMonth);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-40">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const daysDisabled = (date: Date) => {
        return daysWeek.includes(date.getDay()) || holidays.some(feriado => isSameDay(parseISO(feriado.date), date));
    };

    const specialDay = holidays.map(d => new Date(d.date + ' 00:00:00'));

    const handleSaveRange = () => {
        if (selectedRange.from && selectedRange.to) {
            const daysCount = countDaysInRange();
            if (daysCount > 0 && daysCount <= availableDays - usedDays) {
                onSaveRange({
                    from: selectedRange.from,
                    to: selectedRange.to,
                    days: daysCount
                });
                // Clear selection after saving
                setSelectedRange({});
            }
        }
    };

    const remainingDays = availableDays - usedDays;
    const daysSelectedCount = countDaysInRange();
    const isOverLimit = daysSelectedCount > remainingDays;
    const canSave = selectedRange.from && selectedRange.to && daysSelectedCount > 0 && !isOverLimit;

    return (
        <>
            <div className="flex gap-5 justify-around">
                <span>Fecha de inicio: {selectedRange && selectedRange.from ? selectedRange.from?.toLocaleDateString() : 'dd/mm/yyyy'}</span>
                <span>Fecha de término: {selectedRange && selectedRange.to ? selectedRange.to?.toLocaleDateString() : 'dd/mm/yyyy'}</span>
            </div>

            <div className={`text-black ${isOverLimit ? 'bg-red-200 dark:bg-red-300' : 'bg-blue-200 dark:bg-green-200'} text-center rounded p-3 my-3 font-semibold`}>
                {isOverLimit ? (
                    <>
                        <p>Has excedido tu límite de vacaciones disponibles</p>
                        <p>
                            Días seleccionados: <span className="font-bold text-red-600">{daysSelectedCount}</span>
                        </p>
                        <p>
                            Días disponibles: <span className="font-bold text-green-600">{remainingDays}</span>
                        </p>
                    </>
                ) : (
                    <>
                        Estás solicitando <span className="font-bold text-green-500 dark:text-blue-500">{daysSelectedCount}</span> días hábiles de vacaciones
                    </>
                )}
            </div>

            <div className="flex justify-end mb-2">
                <button
                    onClick={() => setMonth(today)}
                    className="px-4 py-1 rounded-md text-sm bg-blue-200 dark:bg-green-200 hover:bg-gray-300  dark:hover:bg-gray-600 dark:text-black transition-colors duration-200 font-bold">
                    Hoy
                </button>
            </div>

            <DayPicker
                month={month}
                onMonthChange={setMonth}
                modifiers={{
                    special: specialDay
                }}
                modifiersClassNames={{
                    special: 'text-red-500 font-bold'
                }}
                modifiersStyles={{}}
                classNames={{
                    day: 'rounded-lg hover:bg-opacity-50 border-2 border-white dark:border-[#212121] transition-colors duration-200',
                    selected: 'border-transparent bg-blue-200 dark:bg-green-200 dark:text-black',
                    range_end: 'bg-blue-200 dark:bg-green-200',
                    range_middle: 'bg-blue-200 dark:bg-green-200',
                    range_start: 'bg-blue-200 dark:bg-green-200',
                    disabled: '!bg-gray-200 text-gray-500',
                    today: 'font-bold text-emerald-500',
                    chevron: 'fill-blue-300 dark:fill-green-200'
                }}
                locale={es}
                disabled={daysDisabled}
                numberOfMonths={2}
                mode="range"
                selected={selectedRange as DateRange}
                onSelect={range =>
                    setSelectedRange({
                        from: range?.from ?? undefined,
                        to: range?.to ?? undefined
                    })
                }
            />

            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleSaveRange}
                    disabled={!canSave}
                    className={`px-6 py-2 rounded-lg font-medium ${
                        canSave ? 'bg-blue-500 hover:bg-blue-600 dark:bg-green-500 dark:hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors duration-200`}>
                    Guardar Período de Vacaciones
                </button>
            </div>
        </>
    );
}
