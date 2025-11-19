import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

export interface SearchBarProps {
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className: string;
}
export function SearchBarComponent({
  placeHolder,
  onChange,
  value,
  className,
}: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-[400px]">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <IconSearch className="w-5 h-5 text-gray-400 dark:text-gray-300" />
      </span>

      <Input
        type="text"
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
        className={className}
      />
    </div>
  );
}
