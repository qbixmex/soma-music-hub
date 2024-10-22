import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib";
import { Disc3, Folders, LayoutDashboard, Tags, Users } from "lucide-react";

const MobileSidebar = () => {

  const pathname = usePathname();

  return (
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <SheetClose asChild>
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
        </SheetClose>
        <SheetClose asChild>
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
        </SheetClose>
        <SheetClose asChild>
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
        </SheetClose>
        <SheetClose asChild>
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
        </SheetClose>
        <SheetClose asChild>
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
        </SheetClose>
        <div className="mt-auto">
          {/* You can put more components at bottom here */}
        </div>
      </nav>
    </SheetContent>
  );

};

export default MobileSidebar;
