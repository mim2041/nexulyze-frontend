"use client";
import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { PlusOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import ActivityForm from "./ActivityForm";
import Sidebar from "./Sidebar";

export default function Page() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 ml-56 p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <div className="flex items-center gap-6">
            <BellOutlined className="text-blue-600 text-xl" />
            <div className="flex items-center gap-2">
              <UserOutlined className="text-gray-400 text-2xl" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  User Name
                </div>
                <div className="text-xs text-gray-500">User Role</div>
              </div>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showDrawer}
              className="bg-[#10715A] rounded-lg px-6 py-2 text-base font-semibold"
            >
              Create Activity
            </Button>
          </div>
        </header>
        <section className="bg-white rounded-lg p-8 text-center text-gray-500 border border-gray-200">
          <p>
            No bookings found. Click &quot;Create Activity&quot; to make your
            first booking.
          </p>
        </section>
        <Drawer
          title={<span className="font-bold text-xl">Create Activity</span>}
          placement="right"
          width={480}
          onClose={onClose}
          open={open}
          styles={{
            body: { padding: 0 },
          }}
        >
          <div className="p-8">
            <ActivityForm onClose={onClose} />
          </div>
        </Drawer>
      </main>
    </div>
  );
}
