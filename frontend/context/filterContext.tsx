import { createContext, ReactNode, useState } from "react";
import { Status } from "@/app/Components/Combobox";

interface FilterContextType {
  statuses: Status[];
  setStatuses: (statuses: Status[]) => void;
}

const initialStatuses: Status[] = [
  {
    value: "active",
    label: "Active",
    checked: false
  },
  {
    value: "closed",
    label: "Closed",
    checked: false
  },
  {
    value: "cancelled",
    label: "Cancelled",
    checked: false
  },
];

export const FilterContext = createContext<FilterContextType>({
  statuses: initialStatuses,
  setStatuses: () => {},
});

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [statuses, setStatuses] = useState<Status[]>(initialStatuses);

  return (
    <FilterContext.Provider value={{ statuses, setStatuses }}>
      {children}
    </FilterContext.Provider>
  );
}