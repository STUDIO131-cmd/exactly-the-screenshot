-- Allow public insert/update/delete on available_dates (used as exception overrides)
CREATE POLICY "Public insert available_dates"
ON public.available_dates
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public update available_dates"
ON public.available_dates
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Public delete available_dates"
ON public.available_dates
FOR DELETE
USING (true);