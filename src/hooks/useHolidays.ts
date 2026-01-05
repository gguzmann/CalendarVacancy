import { Holiday, HolidayParams } from '@/utils/types';
import { useEffect, useState } from 'react';
import { feriadosArg2025, feriadosChile2025, feriadosMexico2025 } from '../utils/holidays';

export function useHolidays({ year, countryCode }: HolidayParams) {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        try {
            let selectedHolidays: Holiday[] = [];

            switch (countryCode) {
                case 'CL':
                    selectedHolidays = feriadosChile2025;
                    break;
                case 'AR':
                    selectedHolidays = feriadosArg2025;
                    break;
                case 'MX':
                    selectedHolidays = feriadosMexico2025;
                    break;
                default:
                    throw new Error('Código de país no soportado');
            }

            setHolidays(selectedHolidays);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [year, countryCode]);

    return { holidays, loading, error };
}
