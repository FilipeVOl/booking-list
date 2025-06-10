"use client"
import { ComboBoxResponsive } from "../Components/Combobox";
import React, { useEffect } from "react";
import { LogOut, Search } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const [selectedFilter, setSelectedFilter] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3001/api/rooming-lists", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: { searchValue: searchInput }
            })
            const data = await response.data
            console.log(data)
            }
            fetchData()
        }, 1000)
    }, [searchInput])

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-2xl font-bold">Rooming List Management: Events</h1>
                <div className="flex flex-row items-center gap-2 bg-white shadow-lg p-4 rounded-lg cursor-pointer" onClick={() => {
                    localStorage.removeItem('token');
                    router.push('/login');
                }}>
                <LogOut className="w-12 h-12 text-black" />
                <span className="text-black text-xl font-bold">Log out</span>
                </div>
                </div>
                <div className="flex flex-row items-center gap-4 mt-6">
                    {/* Input de busca */}
                    <div className="flex items-center w-[300px] colored-buttonPurple">
                        <Search className="w-5 h-5 text-gray-400 search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="ml-2 flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            />
                    </div>
                    <ComboBoxResponsive
                        label="Filters"
                        imageLabel={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;