import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from '@/components/moda/auth-form';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Moda Fácil | Seu estoque, em ordem' },
    { name: 'description', content: 'Entre na Moda Fácil para organizar os produtos, quantidades e preços da sua loja de roupas.' },
    { property: 'og:title', content: 'Moda Fácil | Seu estoque, em ordem' },
    { property: 'og:description', content: 'Controle o estoque da sua loja de roupas com a Moda Fácil.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AuthForm,
});
