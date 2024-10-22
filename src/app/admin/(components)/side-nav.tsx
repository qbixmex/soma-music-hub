"use client";

import { cn } from "@/lib";
import { Folders, Disc3, LayoutDashboard, Tags, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {

  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/admin/dashboard"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary",
          { "bg-muted text-primary": pathname === "/admin/dashboard" }
        )}
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/admin/categories"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary",
          { "bg-muted text-primary": pathname.startsWith("/admin/categories") }
        )}
      >
        <Folders className="h-4 w-4" />
        Categories
      </Link>
      <Link
        href="/admin/events"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary",
          { "bg-muted text-primary": pathname.startsWith("/admin/events") }
        )}
      >
        <Disc3 className="h-4 w-4" />
        Events{" "}
      </Link>
      <Link
        href="/admin/tags"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary",
          { "bg-muted text-primary": pathname.startsWith("/admin/tags") }
        )}
      >
        <Tags className="h-4 w-4" />
        Tags{" "}
      </Link>
      <Link
        href="/admin/users"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary",
          { "bg-muted text-primary": pathname.startsWith("/admin/users") }
        )}
      >
        <Users className="h-4 w-4" />
        Users
      </Link>
    </nav>
  );
};

export default SideNav;