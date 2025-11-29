import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";

interface FilterPopoverProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  title?: string;
  buttonLabel?: string;
}

export function FilterPopover({
  options,
  selectedOptions,
  setSelectedOptions,
  title = "Options",
  buttonLabel = "Select",
}: FilterPopoverProps) {
  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-start">
          <Filter className="w-4 h-4 mr-2" />
          {selectedOptions.length === 0
            ? title
            : `${selectedOptions.length} selected`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{title}</span>
            {selectedOptions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setSelectedOptions([])}
              >
                Clear
              </Button>
            )}
          </div>
          <ScrollArea className="h-40">
            <div className="space-y-1">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${option}`}
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={() => toggleOption(option)}
                  />
                  <label
                    htmlFor={`option-${option}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
