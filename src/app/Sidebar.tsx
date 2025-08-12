import React from "react";
import { Button } from "antd";
import { CalendarOutlined, LogoutOutlined } from "@ant-design/icons";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-gray-100 flex flex-col justify-between shadow-lg z-20">
      <div>
        <div className="flex items-center justify-center h-20 bg-[#03F181] w-[80px] h-[60px] text-2xl font-bold tracking-wide mx-auto mt-12">
          LOGO
        </div>
        <nav className="mt-8 px-4">
          <Button
            type="text"
            icon={<CalendarOutlined />}
            className="w-full flex items-center justify-start text-base font-medium text-white bg-[#10715A] rounded-lg mb-2 py-2 px-4"
          >
            Bookings
          </Button>
        </nav>
      </div>
      <div className="p-4">
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          danger
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
