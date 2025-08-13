"use client";
import React, { useState } from "react";
import ActivityForm from "./ActivityForm";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import user from "@/assets/images/user.svg";
import arrow from "@/assets/images/arrow.svg";
import notification from "@/assets/images/notification.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Bell, Plus, User } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-56 p-12">
        <header className="flex items-center justify-between mb-8 mx-4">
          <h1 className="text-[24px] font-semibold text-[#124547]">Bookings</h1>
          <div className="flex items-center gap-6">
            <Image src={notification} alt="Notification" />
            <div className="flex items-center gap-4 border border-[#E7E8E9] rounded-xl p-2">
              <Image src={user} alt="User" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  User Name
                </div>
                <div className="text-xs text-gray-500">User Role</div>
              </div>
              <Image src={arrow} alt="arrow" className="ml-4" />
            </div>
          </div>
        </header>
        <section className="bg-white rounded-lg py-8 text-center ">
          <div className="flex justify-end">
            <Button
              onClick={() => setOpen(true)}
              className="rounded-full px-6 py-2 text-base font-semibold bg-[#10715A]"
            >
              <span className="inline-flex items-center gap-2">
                Create Activity
              </span>
            </Button>
          </div>
        </section>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-[480px] p-0 rounded-tl-2xl">
            <div className="p-6 shrink-0 text-[#10715A] text-[24px] font-semibold">
              <SheetHeader>
                <SheetTitle>
                  Book Court,{" "}
                  <span className="text-[12px]">Wed Jul 30, 2025</span>
                </SheetTitle>
              </SheetHeader>
            </div>
            <div className="p-8 overflow-y-auto flex-1 ">
              <ActivityForm onClose={onClose} />
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}
