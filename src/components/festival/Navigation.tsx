import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Menu, Home, Info, PartyPopper, Heart, Users, UserPlus, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import festivalLogo from "@/assets/festival-logo.png";

const navLinks = [
  { href: "/", label: "Home", icon: Home, isRoute: true },
  { href: "#about", label: "About", icon: Info },
  { href: "#celebration", label: "Celebration", icon: PartyPopper },
  { href: "#inclusivity", label: "Inclusivity", icon: Heart },
  { href: "#participate", label: "Participate", icon: Users },
  { href: "/register", label: "Register", icon: UserPlus, isRoute: true, highlight: true },
  { href: "/contact", label: "Contact", icon: Mail, isRoute: true },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute?: boolean) => {
    // Close mobile menu
    setIsOpen(false);

    // Handle route links
    if (isRoute) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle hash links
    if (href.startsWith("#")) {
      e.preventDefault();
      
      if (!isHomePage) {
        // Navigate to home page with hash
        navigate("/" + href);
        return;
      }
      
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for sticky header
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Handle hash navigation after page load
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const targetId = location.hash.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <motion.img
            src={festivalLogo}
            alt="Hindustani Cultural Arts Festival"
            className="h-10 md:h-12 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <span className={`hidden sm:block font-heading font-semibold text-lg transition-colors ${
            isScrolled ? "text-foreground" : "text-foreground"
          }`}>
            HCAF
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.isRoute ? link.href : "#"}
              onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                link.highlight 
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" 
                  : `hover:text-primary hover:bg-muted/50 ${isScrolled ? "text-foreground" : "text-foreground"}`
              } ${
                (link.isRoute && location.pathname === link.href) || 
                (!link.isRoute && isHomePage && location.hash === link.href)
                  ? "text-primary"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`${isScrolled ? "text-foreground" : "text-foreground"}`}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background border-l border-border">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 mb-8 pt-4">
                <img
                  src={festivalLogo}
                  alt="Hindustani Cultural Arts Festival"
                  className="h-12 w-auto"
                />
                <span className="font-heading font-semibold text-lg text-foreground">
                  HCAF
                </span>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.isRoute ? link.href : "#"}
                      onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                      className={`flex items-center gap-3 py-3 px-4 font-medium text-base rounded-lg transition-all ${
                        link.highlight
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          : "text-foreground hover:text-primary hover:bg-muted/50"
                      } ${
                        (link.isRoute && location.pathname === link.href) ||
                        (!link.isRoute && isHomePage && location.hash === link.href)
                          ? "text-primary bg-muted/30"
                          : ""
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4">
                  Quick Actions
                </p>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button variant="hero" className="w-full">
                    Register as Artist
                  </Button>
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    Get in Touch
                  </Button>
                </Link>
              </div>

              {/* Decorative element */}
              <div className="mt-auto mb-8">
                <div className="flex items-center justify-center gap-4">
                  <span className="h-px w-12 bg-secondary/40" />
                  <span className="text-secondary text-xl">✦</span>
                  <span className="h-px w-12 bg-secondary/40" />
                </div>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Celebrating India's Cultural Heritage
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
};

export default memo(Navigation);
