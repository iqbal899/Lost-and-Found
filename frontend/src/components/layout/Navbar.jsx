import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Button } from "../ui/button";
import { Moon, Sun, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
const { user, logout } = useAuthStore();
const navigate = useNavigate();

const [dark, setDark] = useState(
() => document.documentElement.classList.contains("dark")
);

useEffect(() => {
document.documentElement.classList.toggle("dark", dark);
}, [dark]);

const handleLogout = () => {
logout();
navigate("/login");
};

const navClass = ({ isActive }) =>
`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }`;

return ( <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md"> <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
{/* Logo */} <Link
       to="/"
       className="flex items-center gap-2 font-bold text-xl text-primary"
     > <MapPin className="w-5 h-5" />
LostFound </Link>

    <div className="flex items-center gap-3">
      {user ? (
        <>
          <NavLink to="/post" className={navClass}>
            Post Item
          </NavLink>

          <NavLink to="/my-items" className={navClass}>
            My Items
          </NavLink>

          <NavLink to="/my-responses" className={navClass}>
            My Responses
          </NavLink>

          <span className="text-sm text-muted-foreground hidden sm:block">
            Hi, {user.firstname}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle dark mode"
      >
        {dark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </div>
  </div>
</nav>

);
}
