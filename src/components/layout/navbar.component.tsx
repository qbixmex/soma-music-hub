import Link from "next/link";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="customContainer">
      <div className="flex items-center justify-between">
        <div className="group">
          <Link href="/" className="text-2xl font-bold group-hover:text-primary transition-colors">
            Soma Music Hub
          </Link>
          <div className="h-1 w-0 group-hover:w-full bg-primary transition-all" />
        </div>
        <Button variant="outline" className="space-x-2">
          <span className="text-base">Login</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
