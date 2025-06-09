"use client"
import { ComboBoxResponsive } from "../Components/Combobox";
import React from "react";
import { Search } from "lucide-react";


const HomePage = () => {
    // Estado para o filtro do ComboBoxResponsive
    const [selectedFilter, setSelectedFilter] = React.useState("");
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
                            />
                    </div>
                    {/* Botão de filtro usando ComboBoxResponsive */}
                    <ComboBoxResponsive
                        selectedStatus={{value: "filters", label: "Filters"}}
                        setSelectedStatus={() => {}}
                        imageLabel={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;