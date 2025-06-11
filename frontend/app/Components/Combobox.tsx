"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SlidersHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { FilterContext } from "@/context/filterContext"

export type Status = {
  value: string
  label: string
  checked: boolean
}

export function ComboBoxResponsive({ label, imageLabel }: { label: string, imageLabel: boolean }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 900px)")
  const { statuses, setStatuses } = React.useContext(FilterContext)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-start w-[150px] colored-buttonGreen">
            <SlidersHorizontal className="w-5 h-5 text-tertiary" /> 
            <button
              className="ml-3  outline-none text-gray-400 cursor-pointer"
            >
              Filters
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <StatusList setOpen={setOpen} statuses={statuses} setStatuses={setStatuses} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-full flex items-center justify-start md:w-[150px] colored-buttonGreen">
            <SlidersHorizontal className="w-5 h-5 text-tertiary" /> 
            <button
              className="ml-3  outline-none text-gray-400 cursor-pointer"
            >
              Filters
            </button>
          </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} statuses={statuses} setStatuses={setStatuses} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  statuses,
  setStatuses,
}: {
  setOpen: (open: boolean) => void
  statuses: Status[]
  setStatuses: (statuses: Status[]) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="RFP Status" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => {
            const checkboxId = `checkbox-${status.value}`;
            return (
              <label
                key={status.value}
                htmlFor={checkboxId}
                className="flex h-full items-center gap-4 cursor-pointer w-full px-2 py-2 rounded hover:bg-accent transition"
              >
                <Checkbox
                  id={checkboxId}
                  className="!w-8 !h-8"
                  checked={status.checked}
                  onCheckedChange={() => {
                    setStatuses(
                      statuses.map(s => 
                        s.value === status.value 
                          ? { ...s, checked: !s.checked }
                          : s
                      )
                    );
                  }}
                />
                <CommandItem
                  key={status.value}
                  className="flex-1 px-0 py-0 bg-transparent cursor-pointer"
                >
                  <span className="text-base font-medium">{status.label}</span>
                </CommandItem>
              </label>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
