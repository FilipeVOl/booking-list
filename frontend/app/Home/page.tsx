"use client"
import { ComboBoxResponsive } from "../Components/Combobox";
import React, { useEffect } from "react";
import { LogOut, Search } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const [searchInput, setSearchInput] = React.useState("");
    const router = useRouter();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/api/rooming-lists", {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        params: { searchValue: searchInput }
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [searchInput]);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-4 md:gap-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                        Rooming List Management: Events
                    </h1>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('token');
                            router.push('/login');
                        }}
                        className="w-full hover:scale-105 hover:cursor-pointer md:w-auto flex items-center justify-center gap-2 p-2 md:p-3 rounded-lg transition-all"
                    >
                        <LogOut className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-black" />
                        <span className="text-base md:text-lg lg:text-xl font-bold text-black">
                            Log out
                        </span>
                    </button>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    {/* Search Input */}
                    <div className="flex md:max-w-[300px] lg:max-w-[400px] colored-buttonPurple">
                        <Search className="w-5 h-5 text-gray-400 search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="ml-2 flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    {/* Filter Component */}
                    <div className="w-full md:w-auto">
                        <ComboBoxResponsive/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;