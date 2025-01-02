import { cn } from "@/lib/utils"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsUpDown, Check } from "lucide-react"
import React from "react"
import { setSource } from "@/store/source-store"
import store from "@/store"

export default () => {
  const arr: string[] = [];
  if (localStorage.getItem("news") !== null) {
    (JSON.parse(localStorage.getItem("news")!.split("::")[1]) as TheNew[]).forEach(r => {
      if (arr.includes(r.sitename)) {
        return
      } else {
        arr.push(r.sitename);
      }
    });
  }
  const frameworks = arr.map(r => {
    return {
      value: r,
      label: r
    }
  })
  frameworks.unshift({ value: "", label: "All" })
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (window.location.hash !== "") {
      setValue(decodeURI(window.location.hash).substring(1))
    }
    const handleHashChange = () => {
      setValue(decodeURI(window.location.hash).substring(1))
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "News Source"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="select..." className="h-9" />
            <CommandList>
              <CommandEmpty>No source now, try refresh handly</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      // save in store
                      store.dispatch(setSource(currentValue));
                      window.location.hash = currentValue;
                      setOpen(false)
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}