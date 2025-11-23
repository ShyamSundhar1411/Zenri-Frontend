export function formatDate(date?: string, format: string = "DD MMM YYYY") {
  console.log("Formatting Date", date);
  if (!date) return "--/--";
  console.log("Date", date);
  const d = new Date(date);
  console.log("Converted Date", d);
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

  return formattedDate;
}

export function formatTime(time?: string, format: string = "hh:mm A") {
  if (!time) return "--:--";
  const d = new Date(time);
  if (isNaN(d.getTime())) return "--:--";
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hh = String(hours % 12 || 12).padStart(2, "0");
  const HH = String(hours).padStart(2, "0");
  return format
    .replace(/hh/, hh)
    .replace(/HH/, HH)
    .replace(/mm/, minutes)
    .replace(/ss/, seconds)
    .replace(/A/, ampm);
}
export function formatDateTime(
  dateTime?: string,
  format: string = "DD MMM YYYY hh:mm A",
) {
  if (!dateTime) return "-- --:--";

  const d = new Date(dateTime);
  if (isNaN(d.getTime())) return "-- --:--";

  const day = String(d.getDate()).padStart(2, "0");
  const monthNumber = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const shortMonth = d.toLocaleString("default", { month: "short" });
  const longMonth = d.toLocaleString("default", { month: "long" });

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hh = String(hours % 12 || 12).padStart(2, "0");
  const HH = String(hours).padStart(2, "0");

  return format
    .replace(/DD/, day)
    .replace(/MMMM/, longMonth)
    .replace(/MMM/, shortMonth)
    .replace(/MM/, monthNumber)
    .replace(/YYYY/, String(year))
    .replace(/YY/, String(year).slice(-2))
    .replace(/hh/, hh)
    .replace(/HH/, HH)
    .replace(/mm/, minutes)
    .replace(/ss/, seconds)
    .replace(/A/, ampm);
}

export function formatExpiry(date?: string | Date | null): string {
  if (!date) return "--/--";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "--/--";
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${month}/${year}`;
}
