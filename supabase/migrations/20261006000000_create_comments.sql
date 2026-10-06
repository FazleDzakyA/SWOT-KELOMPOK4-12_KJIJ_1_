-- ==========================================
-- SUPABASE SQL MIGRATION FILE FOR SWOT WEBSITE
-- Table: comments (Ruang Diskusi Kelompok)
-- ==========================================

-- 1. Create table 'comments'
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name TEXT NOT NULL CHECK (length(trim(group_name)) > 0),
  content TEXT NOT NULL CHECK (length(trim(content)) > 0 AND length(content) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create index on created_at for fast descending sort queries
CREATE INDEX IF NOT EXISTS idx_comments_created_at 
ON public.comments (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policy for Public Read Access (Anyone can view discussion comments)
DROP POLICY IF EXISTS "Allow public read access for comments" ON public.comments;
CREATE POLICY "Allow public read access for comments"
ON public.comments
FOR SELECT
USING (true);

-- 5. Create RLS Policy for Public Insert Access (Group discussion posting with validation)
DROP POLICY IF EXISTS "Allow public insert access for valid comments" ON public.comments;
CREATE POLICY "Allow public insert access for valid comments"
ON public.comments
FOR INSERT
WITH CHECK (
  length(trim(group_name)) > 0 AND 
  length(trim(content)) > 0 AND 
  length(content) <= 500
);

-- 6. Add table 'comments' to Supabase Realtime Publication
-- Note: Execute this in Supabase SQL Editor to enable live WebSocket updates across devices
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
