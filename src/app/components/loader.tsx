import { Spinner } from "@/components/ui/spinner";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background">
      <Spinner />
    </div>
  );
}
