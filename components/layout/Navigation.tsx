"use client";

import React from "react";

import { List, House, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/reports", icon: List, canFill: false, label: "리포트" },
    { href: "/home", icon: House, canFill: true, label: "홈" },
    { href: "/my", icon: User, canFill: true, label: "마이페이지" },
  ];

  return (
    <nav className="flex items-center justify-between gap-10 rounded-full bg-background-light/70 px-8 py-3 shadow-md">
      {navItems.map((item) => {
        const isActive =
          item.href === "/home"
            ? pathname === item.href
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
              isActive
                ? "bg-blue-400 text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Icon
              size={26}
              fill={isActive && item.canFill ? "currentColor" : "none"}
            />
          </Link>
        );
      })}
    </nav>
  );
}
