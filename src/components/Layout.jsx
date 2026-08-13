import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { LanguageContext } from "../context/LanguageContext";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language } = useContext(LanguageContext);
  const isRtl = language === "ar";

  const toggleMobileMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-surface-muted text-on-surface antialiased flex flex-col md:flex-row">
      {/* Sidebar Drawer Navigation */}
      <Sidebar isOpen={isSidebarOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Main Content Pane */}
      <div className={`flex-1 flex flex-col ${isRtl ? "md:pr-[280px] md:pl-0" : "md:pl-[280px] md:pr-0"} min-h-screen max-w-full overflow-hidden`}>
        {/* Header App Bar */}
        <Header toggleMobileMenu={toggleMobileMenu} />

        {/* View Content Port */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
