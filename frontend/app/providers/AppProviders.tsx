"use client"

import { FilterProvider } from "@/context/filterContext"

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <FilterProvider>
      {children}
    </FilterProvider>
  )
}
