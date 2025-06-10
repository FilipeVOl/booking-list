"use client"

import { FilterProvider } from "@/context/filterContext"
import { AuthProvider } from "@/context/authContext"

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <FilterProvider>
        {children}
      </FilterProvider>
    </AuthProvider>
  )
}
