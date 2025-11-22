export function formatDate(date?: string, format: string = "DD MMM YYYY") {
  if (!date) return "--/--";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "--";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const shortMonth = d.toLocaleString("default", { month: "short" });
  const longMonth = d.toLocaleString("default", { month: "long" });
  const formattedDate = format
    .replace(/DD/, day)
    .replace(/MMMM/, longMonth)
    .replace(/MMM/, shortMonth)
    .replace(/MM/, month)
    .replace(/YYYY/, String(year))
    .replace(/YY/, String(year).slice(-2));
  console.log(formattedDate);
  return formattedDate;
}

export function formatExpiry(date?: string | Date | null): string {
  if (!date) return "--/--";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "--/--";
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${month}/${year}`;
}
