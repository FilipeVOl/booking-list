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


type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "closed",
    label: "Closed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
]

export function ComboBoxResponsive({ selectedStatus, setSelectedStatus, imageLabel }: { selectedStatus: Status | null, setSelectedStatus: (status: Status | null) => void, imageLabel: boolean }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 900px)")

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-start w-[150px] colored-buttonGreen">
          <SlidersHorizontal className="w-5 h-5 text-tertiary" /> 
            <button
              className="ml-3  outline-none text-gray-400 cursor-pointer"
            >
              {selectedStatus?.label || ''}
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
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
                  // checked={...} // controle se quiser
                  // onCheckedChange={...}
                />
                <CommandItem
                  key={status.value}
                  onSelect={() => {
                    setSelectedStatus(status);
                  }}
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
