import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import CornerOrnament from "@/components/festival/CornerOrnament";
import { LogOut, Users, Mail, Palette, Phone, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type ContactSubmission = Tables<"contact_submissions">;
type ArtistRegistration = Tables<"artist_registrations">;

const Admin = () => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [artistRegistrations, setArtistRegistrations] = useState<ArtistRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/admin/login");
        return;
      }

      // Check admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }

      setUser(session.user);
      fetchData();
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/admin/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [contactRes, artistRes] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("artist_registrations").select("*").order("created_at", { ascending: false }),
      ]);

      if (contactRes.data) setContactSubmissions(contactRes.data);
      if (artistRes.data) setArtistRegistrations(artistRes.data);
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getExperienceBadgeVariant = (level: string) => {
    switch (level) {
      case "professional":
        return "default";
      case "advanced":
        return "secondary";
      case "intermediate":
        return "outline";
      default:
        return "outline";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-3xl text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Logged in as {user.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/">View Site</Link>
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <Mail className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactSubmissions.length}</div>
              <p className="text-xs text-muted-foreground">Total messages received</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Artist Registrations</CardTitle>
              <Palette className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{artistRegistrations.length}</div>
              <p className="text-xs text-muted-foreground">Total applications</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Tables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="contacts" className="gap-2">
                <Mail className="w-4 h-4" />
                Contact Submissions
              </TabsTrigger>
              <TabsTrigger value="registrations" className="gap-2">
                <Users className="w-4 h-4" />
                Artist Registrations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions</CardTitle>
                  <CardDescription>
                    Messages received through the contact form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : contactSubmissions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No contact submissions yet
                    </div>
                  ) : (
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className="max-w-[300px]">Message</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-1 text-sm">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(submission.created_at)}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{submission.name}</TableCell>
                              <TableCell>
                                <a
                                  href={`mailto:${submission.email}`}
                                  className="text-primary hover:underline"
                                >
                                  {submission.email}
                                </a>
                              </TableCell>
                              <TableCell>
                                {submission.phone ? (
                                  <a
                                    href={`tel:${submission.phone}`}
                                    className="flex items-center gap-1 text-primary hover:underline"
                                  >
                                    <Phone className="w-3 h-3" />
                                    {submission.phone}
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{submission.subject}</Badge>
                              </TableCell>
                              <TableCell className="max-w-[300px] truncate">
                                {submission.message}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="registrations">
              <Card>
                <CardHeader>
                  <CardTitle>Artist Registrations</CardTitle>
                  <CardDescription>
                    Applications from artists wanting to participate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : artistRegistrations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No artist registrations yet
                    </div>
                  ) : (
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Art Form</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Group</TableHead>
                            <TableHead>Portfolio</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {artistRegistrations.map((registration) => (
                            <TableRow key={registration.id}>
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-1 text-sm">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(registration.created_at)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{registration.name}</div>
                                {registration.group_name && (
                                  <div className="text-xs text-muted-foreground">
                                    {registration.group_name}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <a
                                    href={`mailto:${registration.email}`}
                                    className="block text-primary hover:underline text-sm"
                                  >
                                    {registration.email}
                                  </a>
                                  {registration.phone && (
                                    <a
                                      href={`tel:${registration.phone}`}
                                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                                    >
                                      <Phone className="w-3 h-3" />
                                      {registration.phone}
                                    </a>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge>{registration.art_form}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getExperienceBadgeVariant(registration.experience_level)}>
                                  {registration.experience_level}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3 text-muted-foreground" />
                                  {registration.group_size}
                                </div>
                              </TableCell>
                              <TableCell>
                                {registration.portfolio_urls && registration.portfolio_urls.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {registration.portfolio_urls.map((url, index) => (
                                      <a
                                        key={index}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        File {index + 1}
                                      </a>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground text-sm">None</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
