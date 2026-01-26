import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import festivalLogo from "@/assets/festival-logo.png";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#celebration", label: "Celebration" },
  { href: "#inclusivity", label: "Inclusivity" },
  { href: "#participate", label: "Participate" },
  { href: "/register", label: "Register", isRoute: true },
  { href: "/contact", label: "Contact", isRoute: true },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      
      if (!isHomePage) {
        // Navigate to home page with hash
        window.location.href = "/" + href;
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
      
      setIsOpen(false);
    }
  };

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
        <Link to="/" className="flex items-center gap-3 group">
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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className={`relative font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-foreground"
                } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-foreground"
                } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`${isScrolled ? "text-foreground" : "text-foreground"}`}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background border-l border-border">
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
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 font-medium text-lg text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className="block py-3 px-4 font-medium text-lg text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Decorative element */}
              <div className="mt-auto mb-8">
                <div className="flex items-center justify-center gap-4">
                  <span className="h-px w-12 bg-secondary/40" />
                  <span className="text-secondary text-xl">✦</span>
                  <span className="h-px w-12 bg-secondary/40" />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
};

export default Navigation;
