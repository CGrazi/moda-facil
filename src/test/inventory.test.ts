import { describe, it, expect } from 'vitest';
import { normalize, productSchema } from '@/lib/inventory';
describe('Inventory rules',()=>{
 it('searches product names and categories without accent or case differences',()=>{expect(normalize('Calças Femininas').includes(normalize('CALCAS'))).toBe(true);expect(normalize('Vestido Floral').includes(normalize('camiseta'))).toBe(false);});
 it('validates all four requested product fields',()=>{const product={name:'Camiseta',category:'Camisetas',quantity:12,price:59.9};expect(productSchema.parse(product)).toEqual(product);for(const field of ['name','category','quantity','price']){const incomplete:Record<string,unknown>={...product};delete incomplete[field];expect(productSchema.safeParse(incomplete).success).toBe(false);}});
});
