import { LoginForm } from "@/components/auth";

export const metadata = {
  title: "Acceso Administrativo | Reavivado",
  description: "Inicio de sesión para operadores y administradores del Ministerio Juvenil.",
};

export default function LoginPage() {
  return <LoginForm />;
}