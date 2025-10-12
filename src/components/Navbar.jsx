import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabase/client";
import { Button } from "../components/ui/Button";
import { Heart } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("isAdmin")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Heart
              className="w-6 h-6 text-primary-foreground"
              fill="currentColor"
            />
          </div>
          <span className="text-foreground">ImpactConnect</span>
        </Link>

        {session ? (
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/projects"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/projects") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/projects") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/ngos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/ngos") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              NGOs
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Button variant="ghost" onClick={handleLogout}>
                Log Out
              </Button>
              {profile?.isAdmin && (
                <Button asChild>
                  <Link to="/admin">Admin Panel</Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
