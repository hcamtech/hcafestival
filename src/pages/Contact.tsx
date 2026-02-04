import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, MapPin, Mail, Phone } from "lucide-react";
import Navigation from "@/components/festival/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import festivalLogo from "@/assets/festival-logo.png";
import CornerOrnament from "@/components/festival/CornerOrnament";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "Phone must be less than 20 characters" })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const patternY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lotusY = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen gradient-hero relative overflow-hidden pt-16 md:pt-20">
      <Navigation />
      {/* Layered parallax cultural patterns */}
      <motion.div
        className="absolute inset-0 bg-pattern-cultural opacity-70"
        style={{ y: patternY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-lotus opacity-40"
        style={{ y: lotusY }}
      />
      <motion.div
        className="absolute inset-0 bg-pattern-paisley opacity-30"
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -40]) }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-[10%] w-32 h-32 rounded-full border border-secondary/20"
        style={{ y: decorY1, rotate: useTransform(scrollYProgress, [0, 1], [0, 45]) }}
      />
      <motion.div
        className="absolute top-1/3 left-[5%] w-24 h-24 rounded-full bg-secondary/10 blur-xl"
        style={{ y: decorY2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[15%] w-16 h-16 rounded-full bg-primary/10 blur-lg"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 40]) }}
      />
      <motion.div
        className="absolute top-1/2 left-[8%] w-3 h-3 rounded-full bg-secondary/50"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[8%] w-2 h-2 rounded-full bg-primary/40"
        style={{ y: useTransform(scrollYProgress, [0, 1], [10, -30]) }}
      />

      {/* Decorative lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 40]) }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -30]) }}
      />

      <CornerOrnament position="top-left" variant="floral" />
      <CornerOrnament position="top-right" variant="floral" />
      <CornerOrnament position="bottom-left" variant="paisley" />
      <CornerOrnament position="bottom-right" variant="paisley" />

      <div className="container px-4 py-12 md:py-20 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column - Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={festivalLogo}
                alt="Hindustani Cultural Arts Festival"
                className="w-32 md:w-40 mb-8 opacity-80"
              />

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4">
                Get in Touch
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Have questions about participating in the festival, booking a
                stall, or general inquiries? We'd love to hear from you.
              </p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Venue
                    </h3>
                    <p className="text-muted-foreground">
                      F8X5+CRV, Budh Vihar Colony, Tajpur Pahari Village, Badarpur, New Delhi, Delhi 110044
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <a href="mailto:contact@hindustaniculturalarts.com" className="text-muted-foreground hover:text-foreground transition-colors">
                      contact@hindustaniculturalarts.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Phone
                    </h3>
                    <a href="tel:+919667188668" className="text-muted-foreground hover:text-foreground transition-colors">
                      +91 96671 88668
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl border border-border/50 shadow-elevated p-6 md:p-8"
            >
              <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
                Send us a Message
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is this about?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
