import { createContext, ReactNode, useState } from "react";
import { Status } from "@/app/Components/Combobox";

interface FilterContextType {
  filter: Status;
  setFilter: (filter: Status) => void;
}

const initialFilterState: Status = {
  value: "",
  label: "",
};

export const FilterContext = createContext<FilterContextType>({
  filter: initialFilterState,
  setFilter: () => {},
});


interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState<Status>(initialFilterState);
console.log(filter)


  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}