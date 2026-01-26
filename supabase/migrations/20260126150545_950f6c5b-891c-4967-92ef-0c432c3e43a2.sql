-- Create enum for experience levels
CREATE TYPE public.experience_level AS ENUM ('beginner', 'intermediate', 'advanced', 'professional');

-- Create artist_registrations table
CREATE TABLE public.artist_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  art_form TEXT NOT NULL,
  experience_level experience_level NOT NULL,
  group_size INTEGER NOT NULL DEFAULT 1,
  group_name TEXT,
  description TEXT,
  portfolio_urls TEXT[] DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.artist_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public submissions
CREATE POLICY "Anyone can submit artist registration"
ON public.artist_registrations
FOR INSERT
WITH CHECK (true);

-- Restrict public read access
CREATE POLICY "No public read access for registrations"
ON public.artist_registrations
FOR SELECT
USING (false);

-- Create storage bucket for portfolio files
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('portfolios', 'portfolios', true, 10485760);

-- Allow public uploads to portfolios bucket
CREATE POLICY "Anyone can upload portfolio files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'portfolios');

-- Allow public read access to portfolio files
CREATE POLICY "Portfolio files are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolios');