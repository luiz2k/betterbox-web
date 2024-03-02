import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-160px)] items-center justify-center">
      <Loader className="size-12 animate-spin" />
    </div>
  );
}
