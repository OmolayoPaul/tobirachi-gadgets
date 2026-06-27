
-- Add stock column to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock integer NOT NULL DEFAULT 0;

-- Bootstrap admin: lets the first signed-in user claim admin when no admin exists yet.
CREATE OR REPLACE FUNCTION public.claim_admin_if_first()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private
AS $$
DECLARE
  uid uuid := auth.uid();
  existing_admin_count integer;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT count(*) INTO existing_admin_count FROM public.user_roles WHERE role = 'admin';

  IF existing_admin_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_admin_if_first() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_admin_if_first() TO authenticated;
