'use client';
import { CountriesData } from '@/utils/holidays';
import { useState } from 'react';

interface CountrySelectProps {
    value: {
        code: string;
        name: string;
        flag: string;
    };
    onChange: (country: { code: string; name: string; flag: string }) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-16">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-full p-2 border rounded-lg bg-white hover:bg-gray-50">
                <img src={value.flag} alt={value.name} className="w-6 h-4 mr-2 object-fit" />
                {/* <span>{value.name}</span> */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto border rounded-lg bg-white shadow-lg">
                    {CountriesData.map(country => (
                        <div
                            key={country.code}
                            onClick={() => {
                                onChange(country);
                                setIsOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                            <img src={country.flag} alt={country.name} className="w-6 mx-auto h-4 object-fit" />
                            {/* <span>{country.name}</span> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
