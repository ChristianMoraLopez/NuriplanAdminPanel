import {
  User,
  Utensils,
  Leaf,
  LayoutDashboard,
  BookOpen,
  ChefHat
} from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    label: "Usuarios",
    href: "/usuarios",
    icon: User
  },
  {
    label: "Recetas",
    href: "/recetas",
    icon: BookOpen
  },
  {
    label: "Ingredientes",
    href: "/ingredientes",
    icon: Leaf
  },
  {
    label: "Métodos de preparación",
    href: "/metodos",
    icon: ChefHat
  },
  {
    label: "Tipos de comida",
    href: "/tipos-comida",
    icon: Utensils
  }
];
