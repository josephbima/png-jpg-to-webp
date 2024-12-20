"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
      <div className="text-lg font-bold">File Reducer</div>
      <Button variant="outline" size="sm">
        Contact
      </Button>
    </div>
  );
}
