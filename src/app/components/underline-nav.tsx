"use client";
export interface UnderlineNavProps<T extends string> {
  items: {
    label: string;
    value: T;
  }[];
  selected: string;
  onChange: (value: T) => void;
  className?: string;
}
export function UnderlineNav<T extends string>({
  items,
  selected,
  onChange,
  className,
}: UnderlineNavProps<T>) {
  return (
    <div className={`flex items-center gap-6 border-b ${className}`}>
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`py-3 border-b-2 transition text-lg ${
            selected === item.value
              ? "border-primary text-primary font-medium"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
