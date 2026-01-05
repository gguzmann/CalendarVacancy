import { RegisterVacationsProps } from '@/utils/types';
import { RotateCcw, Trash2 } from 'lucide-react';

export const RegisterVacations = ({ savedRanges, onClearVacations, onDeleteRange }: RegisterVacationsProps) => {
    return (
        <div className="">
            <div className="flex justify-between items-center mb-4 ">
                <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Periodos guardados</h3>
                {savedRanges.length > 0 && onClearVacations && (
                    <button onClick={onClearVacations} className="px-4 py-1 text-sm rounded-md  text-red-600 hover:bg-red-200  dark:text-red-200 dark:hover:bg-red-800 transition-colors duration-200">
                        <RotateCcw />
                    </button>
                )}
            </div>

            {savedRanges.length === 0 ? (
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">No hay periodos guardados aun</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {savedRanges.map((range, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-medium">
                                    {range.from.toLocaleDateString('es-AR')} - {range.to.toLocaleDateString('es-AR')}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{range.days} Días tomados</p>
                            </div>
                            <button
                                onClick={() => onDeleteRange && onDeleteRange(index)}
                                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                                title="Eliminar período"
                                aria-label="Eliminar período de vacaciones">
                                <Trash2 className="text-red-500 h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
