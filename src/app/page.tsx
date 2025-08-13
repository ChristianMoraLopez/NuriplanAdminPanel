'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  const router = useRouter()

  const handleLoginRedirect = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Bienvenido</CardTitle>
          <p className="text-gray-600 mt-2">
            Sistema de gestión empresarial
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 mb-6">
            Para acceder al sistema, por favor inicia sesión con tus credenciales.
          </p>
          <Button 
            onClick={handleLoginRedirect}
            className="w-full"
            size="lg"
          >
            Iniciar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}