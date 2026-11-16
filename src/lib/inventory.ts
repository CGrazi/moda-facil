import { z } from 'zod';
export const productSchema = z.object({ id: z.string().uuid().optional(), name: z.string().trim().min(1).max(160), category: z.string().trim().min(1).max(80), quantity: z.number().int().nonnegative(), price: z.number().nonnegative().max(9999999999.99) });
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
export const categories = ['Camisetas', 'Blusas', 'Calças', 'Vestidos', 'Saias', 'Shorts', 'Jaquetas', 'Acessórios', 'Outros'];
