"use client"
import { ComboBoxResponsive } from "../Components/Combobox";
import React, { useEffect } from "react";
import { Search } from "lucide-react";


const HomePage = () => {
    const [selectedFilter, setSelectedFilter] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    
    useEffect(() => {
        setTimeout(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3001/api/rooming-lists", {
                method: "GET",
                body: JSON.stringify({ searchValue: searchInput }),
            })
            const data = await response.json()
            console.log(data)
            }
            fetchData()
        }, 1000)
    }, [searchInput])

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-start justify-start">
                <h1 className="text-2xl font-bold">Rooming List Management: Events</h1>
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