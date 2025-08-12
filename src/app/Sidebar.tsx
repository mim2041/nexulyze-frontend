import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-gray-100 flex flex-col justify-between shadow-lg z-20 py-12">
      <div>
        <div className="flex items-center justify-center  bg-[#03F181] w-[80px] h-[60px] tracking-wide mx-auto rounded">
          LOGO
        </div>
        <nav className="mt-8 px-4">
          <Button
            variant="default"
            className="w-full flex items-center justify-start text-base font-medium rounded-lg mb-2 py-2 px-4 gap-2 bg-[#10715A] hover:bg-[#0d5d4a] text-white"
          >
            <Calendar className="w-4 h-4" />
            Bookings
          </Button>
        </nav>
      </div>
      <div className="mx-4 rounded-lg bg-[#E84646] hover:bg-[#d03535]">
        <Button
          variant="destructive"
          className="w-full gap-2 text-left text-white"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
