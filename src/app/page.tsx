// src/app/page.tsx

"use client"

import { useRouter } from "next/navigation"
import {
Card,
CardContent,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js"
import { User, BookOpen, Leaf, TrendingUp, Users, Activity } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

export default function DashboardPage() {
const router = useRouter()
const usuariosTotales = 125
const recetasTotales = 340
const ingredientesTotales = 87

const barData = {
labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
datasets: [
{
label: "Nuevos usuarios",
data: [12, 19, 3, 5, 2],
backgroundColor: "rgba(59, 130, 246, 0.8)", // blue-500 with opacity
borderColor: "rgb(59, 130, 246)",
borderWidth: 1,
borderRadius: 6,
},
],
}

const barOptions = {
responsive: true,
plugins: {
legend: {
display: false,
},
},
scales: {
y: {
beginAtZero: true,
grid: {
color: "rgba(156, 163, 175, 0.2)",
},
ticks: {
color: "rgb(107, 114, 128)",
},
},
x: {
grid: {
display: false,
},
ticks: {
color: "rgb(107, 114, 128)",
},
},
},
}

const doughnutData = {
labels: ["Recetas Fit", "Recetas Tradicionales"],
datasets: [
{
label: "Tipos de recetas",
data: [200, 140],
backgroundColor: [
"rgba(34, 197, 94, 0.8)", // green-500
"rgba(239, 68, 68, 0.8)", // red-500
],
borderColor: [
"rgb(34, 197, 94)",
"rgb(239, 68, 68)",
],
borderWidth: 2,
},
],
}

const doughnutOptions = {
responsive: true,
plugins: {
legend: {
position: "bottom" as const,
labels: {
padding: 20,
usePointStyle: true,
pointStyle: "circle",
},
},
},
cutout: "60%",
}

const statsCards = [
{
title: "Usuarios Totales",
value: usuariosTotales,
icon: User,
href: "/usuarios",
gradient: "from-blue-500 to-blue-600",
bgGradient: "from-blue-50 to-blue-100",
change: "+12%",
changeType: "positive"
},
{
title: "Recetas",
value: recetasTotales,
icon: BookOpen,
href: "/recetas",
gradient: "from-emerald-500 to-emerald-600",
bgGradient: "from-emerald-50 to-emerald-100",
change: "+8%",
changeType: "positive"
},
{
title: "Ingredientes",
value: ingredientesTotales,
icon: Leaf,
href: "/ingredientes",
gradient: "from-amber-500 to-amber-600",
bgGradient: "from-amber-50 to-amber-100",
change: "+3%",
changeType: "positive"
}
]

const handleCardClick = (href: string) => {
router.push(href)
}

return (
<div className="space-y-8 p-6">
{/* Header */}
<div className="space-y-2">
<h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
Dashboard
</h1>
<p className="text-muted-foreground">
Resumen general de la plataforma de recetas
</p>
</div>


  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {statsCards.map((stat, index) => (
      <Card 
        key={index}
        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br ${stat.bgGradient} border-0 overflow-hidden group`}
        onClick={() => handleCardClick(stat.href)}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground group-hover:text-gray-700 transition-colors">
                {stat.title}
              </p>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>

  {/* Charts Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Bar Chart */}
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">Usuarios esta semana</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Nuevos registros por día
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Total esta semana: 41 usuarios</span>
          <span className="text-green-600 font-medium">↑ 15.2%</span>
        </div>
      </CardContent>
    </Card>

    {/* Doughnut Chart */}
    <Card 
      className="overflow-hidden border-0 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={() => handleCardClick('/recetas')}
    >
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Activity className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">Distribución de recetas</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Clasificación por tipo
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">200</p>
            <p className="text-sm text-muted-foreground">Recetas Fit</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">140</p>
            <p className="text-sm text-muted-foreground">Tradicionales</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Quick Actions */}
  <Card className="border-0 shadow-lg">
    <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
      <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
        <Users className="h-5 w-5" />
        <span>Acciones Rápidas</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => handleCardClick('/usuarios')}
          className="p-4 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-center group"
        >
          <User className="h-8 w-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-700">Ver Usuarios</p>
        </button>
        <button 
          onClick={() => handleCardClick('/recetas')}
          className="p-4 rounded-lg border-2 border-dashed border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 text-center group"
        >
          <BookOpen className="h-8 w-8 text-emerald-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-700">Ver Recetas</p>
        </button>
        <button 
          onClick={() => handleCardClick('/ingredientes')}
          className="p-4 rounded-lg border-2 border-dashed border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 text-center group"
        >
          <Leaf className="h-8 w-8 text-amber-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-700">Ver Ingredientes</p>
        </button>
        <button 
          onClick={() => handleCardClick('/metodos')}
          className="p-4 rounded-lg border-2 border-dashed border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 text-center group"
        >
          <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-gray-700">Ver Métodos</p>
        </button>
      </div>
    </CardContent>
  </Card>
</div>


)
}