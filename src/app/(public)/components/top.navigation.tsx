"use client";

import Link from "next/link";

import { CircleUser, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { ToggleMode } from "@/app/admin/(components)";
import { useSession } from "next-auth/react";
import { logout } from "@/actions";

const TopNavigation = () => {

  const session = useSession();

  const handleLogout = async () => {
    await logout();
    window.location.replace('/');
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 mb-5">
      <section className="px-5 text-center">
        <Link href="/" className="font-bold text-accent-foreground hover:text-slate-300 transition-colors">
          <span className="hidden sm:inline">SOMA</span>
          <span className="sm:hidden">SOM</span>
        </Link>
      </section>
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
      </Sheet> */}
      <div className="ml-auto w-full max-w-[250px]">
        <form className="hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
        </form>
      </div>
      <ToggleMode />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        {session.status === "authenticated" && (
          <>
            <DropdownMenuItem>
              <Link href="/admin/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </>
        )}
        {session.status === "unauthenticated" && (
          <DropdownMenuItem>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          </DropdownMenuItem>
        )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );

};

export default TopNavigation;
