import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/moda/auth-form';
export const Route=createFileRoute('/auth')({head:()=>({meta:[{title:'Entrar | Moda Fácil'},{name:'description',content:'Acesse sua conta e seu estoque na Moda Fácil.'},{property:'og:title',content:'Entrar | Moda Fácil'},{property:'og:description',content:'Acesse seu estoque de roupas.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:AuthForm});
