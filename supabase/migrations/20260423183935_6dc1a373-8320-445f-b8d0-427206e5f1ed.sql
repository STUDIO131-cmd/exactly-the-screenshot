-- Add admin management policies to studio_info
CREATE POLICY "Public insert studio_info"
ON public.studio_info
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Public update studio_info"
ON public.studio_info
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete studio_info"
ON public.studio_info
FOR DELETE
TO public
USING (true);

-- Ensure unique key for upsert
CREATE UNIQUE INDEX IF NOT EXISTS studio_info_key_unique ON public.studio_info(key);