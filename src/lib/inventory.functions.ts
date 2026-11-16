import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { productSchema } from './inventory';
import { z } from 'zod';
export const getInventory = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const products = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await context.supabase.from('products').select('*').order('created_at', { ascending: false }).order('id').range(from, from + 999);
    if (error) throw new Error('Não foi possível carregar os produtos.');
    products.push(...(data ?? []));
    if ((data?.length ?? 0) < 1000) break;
  }
  const { data: profile, error } = await context.supabase.from('profiles').select('display_name').eq('id', context.userId).maybeSingle();
  if (error) throw new Error('Não foi possível carregar o perfil.');
  return { products, displayName: profile?.display_name || 'Minha conta' };
});
export const saveProduct = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((data: unknown) => productSchema.parse(data)).handler(async ({ data, context }) => {
  const { id, ...fields } = data;
  const result = id ? await context.supabase.from('products').update(fields).eq('id', id).eq('user_id', context.userId).select().single() : await context.supabase.from('products').insert({ ...fields, user_id: context.userId }).select().single();
  if (result.error) throw new Error('Não foi possível salvar o produto.');
  return result.data;
});
export const removeProduct = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data)).handler(async ({ data, context }) => {
  const { error } = await context.supabase.from('products').delete().eq('id', data.id).eq('user_id', context.userId);
  if (error) throw new Error('Não foi possível excluir o produto.');
  return { success: true };
});
export const updateProfile = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((data: unknown) => z.object({ displayName: z.string().trim().min(1).max(100) }).parse(data)).handler(async ({ data, context }) => {
  const { error } = await context.supabase.from('profiles').upsert({ id: context.userId, display_name: data.displayName });
  if (error) throw new Error('Não foi possível salvar seu perfil.');
  return { success: true };
});
