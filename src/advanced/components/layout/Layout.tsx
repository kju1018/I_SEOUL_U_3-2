import React from "react";

interface LayoutProps {
  header: React.ReactNode;
  notification: React.ReactNode;
  children: React.ReactNode;
}

export const Layout = ({ header, notification, children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {notification}
      {header}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};
