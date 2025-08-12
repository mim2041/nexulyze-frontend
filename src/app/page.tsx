"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ActivityForm from "./ActivityForm";
import Sidebar from "./Sidebar";
import notification from "../assets/images/notification.svg";
import user from "../assets/images/user.svg";
import arrow from "../assets/images/arrow.svg";
import Image from "next/image";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-56 p-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-[24px] font-semibold text-[#124547]">Bookings</h1>
          <div className="flex items-center gap-6">
            <Image
              src={notification}
              alt="Notification"
              className="text-blue-600 text-xl"
            />
            <div className="flex items-center gap-4 border border-[#E7E8E9] py-2 px-3 rounded-xl">
              <Image src={user} alt="User" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  User Name
                </div>
                <div className="text-xs text-gray-500">User Role</div>
              </div>
              <Image src={arrow} alt="Arrow" className="ml-6" />
            </div>
          </div>
        </header>

        <section className="bg-white rounded-lg py-8 text-center text-gray-500">
          <div className="flex items-end justify-end">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button className="bg-[#10715A] hover:bg-[#0d5d4a] rounded-full px-6 py-2 text-base font-semibold">
                  Create Activity
                </Button>
              </SheetTrigger>

              <SheetContent className="w-[480px] sm:w-[480px]">
                <SheetHeader className="pb-4">
                  <SheetTitle className="font-bold text-xl">
                    Create Activity
                  </SheetTitle>
                </SheetHeader>

                <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
                  <ActivityForm onClose={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>
      </main>
    </div>
  );
}
