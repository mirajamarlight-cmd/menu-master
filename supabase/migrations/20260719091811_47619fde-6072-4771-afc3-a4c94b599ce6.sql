
REVOKE EXECUTE ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_cafe_owner_id() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.guard_last_cafe_owner() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_cafe_role(uuid, uuid, public.cafe_role[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_cafe_member(uuid, uuid) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_cafe_role(uuid, uuid, public.cafe_role[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_cafe_member(uuid, uuid) TO authenticated;
