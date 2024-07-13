import Link from "next/link";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="mb-10">
      <div className="flex items-center justify-between">
        <div className="group">
          <Link href="/" className="text-2xl font-bold group-hover:text-primary transition-colors">Quantic Coders</Link>
          <div className="h-1 w-0 group-hover:w-full bg-primary transition-all" />
        </div>
        <Button variant="outline" className="space-x-2">
          <FaGoogle size={14}>SiGoogle</FaGoogle>
          <span className="text-base">Login</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
