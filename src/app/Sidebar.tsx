"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-gray-100 flex flex-col justify-between shadow-lg z-20 py-12">
      <div>
        <div className="flex items-center justify-center h-20 bg-[#03F181] w-[80px] h-[60px] mx-auto tracking-wide rounded">
          Logo
        </div>
        <nav className="mt-8 px-4">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-2 text-base font-medium text-white bg-[#10715A] rounded-lg mb-2 py-2 px-4"
          >
            <Calendar size={18} /> Bookings
          </Button>
        </nav>
      </div>
      <div className="p-4">
        <Button
          variant="destructive"
          className="w-full inline-flex gap-2 flex items-center justify-start"
        >
          <LogOut size={18} /> Logout
        </Button>
      </div>
    </aside>
  );
}
