-- Complaints + reviews (public insert for active cafes)

CREATE TABLE public.complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cafe_id uuid NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text,
  phone text,
  subject text NOT NULL,
  message text NOT NULL CHECK (char_length(message) <= 500),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cafe_id uuid NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  rating_place smallint NOT NULL CHECK (rating_place BETWEEN 1 AND 5),
  rating_food smallint NOT NULL CHECK (rating_food BETWEEN 1 AND 5),
  rating_service smallint NOT NULL CHECK (rating_service BETWEEN 1 AND 5),
  comment text,
  urgency text NOT NULL DEFAULT 'low' CHECK (urgency IN ('low','medium','high')),
  guest_name text,
  guest_phone text,
  guest_email text,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.complaints TO anon, authenticated;
GRANT ALL ON public.complaints TO service_role;
GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "complaints: public insert active cafe"
  ON public.complaints FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cafes c
      WHERE c.id = cafe_id AND c.status = 'active'
    )
  );

CREATE POLICY "complaints: members read"
  ON public.complaints FOR SELECT TO authenticated
  USING (
    public.is_cafe_member(auth.uid(), cafe_id)
    OR public.has_role(auth.uid(), 'platform_admin')
  );

CREATE POLICY "reviews: public insert active cafe"
  ON public.reviews FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cafes c
      WHERE c.id = cafe_id AND c.status = 'active'
    )
  );

CREATE POLICY "reviews: members read"
  ON public.reviews FOR SELECT TO authenticated
  USING (
    public.is_cafe_member(auth.uid(), cafe_id)
    OR public.has_role(auth.uid(), 'platform_admin')
  );

CREATE INDEX complaints_cafe_id_idx ON public.complaints (cafe_id, created_at DESC);
CREATE INDEX reviews_cafe_id_idx ON public.reviews (cafe_id, created_at DESC);
