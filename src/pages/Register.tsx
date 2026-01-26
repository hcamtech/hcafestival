import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/festival/Navigation";
import Footer from "@/components/festival/Footer";
import CornerOrnament from "@/components/festival/CornerOrnament";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Music, Brush, Mic2, Users2 } from "lucide-react";

const artForms = [
  { value: "classical_music", label: "Classical Music", icon: Music },
  { value: "folk_dance", label: "Folk Dance", icon: Users2 },
  { value: "traditional_art", label: "Traditional Art", icon: Brush },
  { value: "storytelling", label: "Storytelling", icon: Mic2 },
  { value: "instrumental", label: "Instrumental", icon: Music },
  { value: "vocal", label: "Vocal Performance", icon: Mic2 },
  { value: "theater", label: "Theater/Drama", icon: Users2 },
  { value: "other", label: "Other", icon: Brush },
];

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-2 years)" },
  { value: "intermediate", label: "Intermediate (2-5 years)" },
  { value: "advanced", label: "Advanced (5-10 years)" },
  { value: "professional", label: "Professional (10+ years)" },
];

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional(),
  art_form: z.string().min(1, "Please select an art form"),
  experience_level: z.enum(["beginner", "intermediate", "advanced", "professional"], {
    required_error: "Please select your experience level",
  }),
  group_size: z.number().min(1, "Group size must be at least 1").max(50, "Group size cannot exceed 50"),
  group_name: z.string().trim().max(100, "Group name must be less than 100 characters").optional(),
  description: z.string().trim().max(1000, "Description must be less than 1000 characters").optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const Register = () => {
  const containerRef = useRef(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const patternY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lotusY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const paisleyY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      art_form: "",
      experience_level: undefined,
      group_size: 1,
      group_name: "",
      description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp", "application/pdf", "video/mp4"].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were rejected",
        description: "Only images, PDFs, and MP4 videos under 10MB are allowed.",
        variant: "destructive",
      });
    }

    setUploadedFiles((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];
    const totalFiles = uploadedFiles.length;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage.from("portfolios").upload(fileName, file);

      if (error) {
        console.error("Upload error:", error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      const { data: urlData } = supabase.storage.from("portfolios").getPublicUrl(data.path);
      urls.push(urlData.publicUrl);
      setUploadProgress(((i + 1) / totalFiles) * 100);
    }

    return urls;
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let portfolioUrls: string[] = [];

      if (uploadedFiles.length > 0) {
        portfolioUrls = await uploadFiles();
      }

      const { error } = await supabase.from("artist_registrations").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        art_form: data.art_form,
        experience_level: data.experience_level,
        group_size: data.group_size,
        group_name: data.group_name || null,
        description: data.description || null,
        portfolio_urls: portfolioUrls,
      });

      if (error) throw error;

      toast({
        title: "Registration Submitted!",
        description: "Thank you for registering. We'll review your application and get back to you soon.",
      });

      form.reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen relative">
      <Navigation />

      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute inset-0 bg-pattern-cultural opacity-30" style={{ y: patternY }} />
        <motion.div className="absolute inset-0 bg-pattern-lotus opacity-20" style={{ y: lotusY }} />
        <motion.div className="absolute inset-0 bg-pattern-paisley opacity-15" style={{ y: paisleyY }} />
      </div>

      <section className="pt-32 pb-24 relative">
        <CornerOrnament position="top-left" variant="floral" />
        <CornerOrnament position="top-right" variant="floral" />

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block">
              Join the Festival
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4">
              Artist Registration
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Share your art with the world. Register to perform at our cultural celebration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-heading">Registration Form</CardTitle>
                <CardDescription>
                  Fill in your details below. Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Personal Information
                      </h3>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Performance Details */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Performance Details
                      </h3>

                      <FormField
                        control={form.control}
                        name="art_form"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Art Form *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your art form" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {artForms.map((art) => (
                                  <SelectItem key={art.value} value={art.value}>
                                    <span className="flex items-center gap-2">
                                      <art.icon className="w-4 h-4" />
                                      {art.label}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience_level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Level *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {experienceLevels.map((level) => (
                                  <SelectItem key={level.value} value={level.value}>
                                    {level.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="group_size"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Group Size *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={50}
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                />
                              </FormControl>
                              <FormDescription>Number of performers (1 for solo)</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="group_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Group/Troupe Name</FormLabel>
                              <FormControl>
                                <Input placeholder="If applicable" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About Your Performance</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your art, your journey, and what you'd like to perform..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Max 1000 characters</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Portfolio Upload */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Portfolio Samples
                      </h3>

                      <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="portfolio"
                          multiple
                          accept="image/jpeg,image/png,image/webp,application/pdf,video/mp4"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="portfolio" className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload images, PDFs, or videos
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Max 5 files, 10MB each (JPG, PNG, WebP, PDF, MP4)
                          </p>
                        </label>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-muted/50 rounded-lg p-3"
                            >
                              <span className="text-sm truncate flex-1">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {isSubmitting && uploadProgress > 0 && (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <CornerOrnament position="bottom-left" variant="floral" />
        <CornerOrnament position="bottom-right" variant="floral" />
      </section>

      <Footer />
    </main>
  );
};

export default Register;
