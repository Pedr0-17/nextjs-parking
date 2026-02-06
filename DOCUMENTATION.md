# 🅿️ Parking Manager

Sistema moderno y minimalista de gestión de estacionamiento interno con interfaz web.

## Características

✨ **Diseño Limpio & Minimalista**
- Interfaz corporativa y profesional
- Colores neutros con acentos verdes (disponible) y rojos (ocupado)
- Completamente responsivo - funciona perfectamente en móvil
- Tipografía moderna (Inter)

👥 **Gestión de Usuarios**
- Acceso mediante PIN de 4 dígitos
- No hay registro público, solo acceso privado
- Roles: Usuario regular y Administrador

🚗 **Espacios de Estacionamiento**
- 8 espacios disponibles
- Estados visuales claros: Libre/Ocupado
- Grid interactivo con tarjetas de estado
- Seguimiento en tiempo real

📊 **Panel Administrativo**
- Tabla de usuarios con información
- Gestión de accesos y permisos
- Historial de uso en timeline
- Estadísticas en tiempo real

## Estructura del Proyecto

```
app/
├── components/
│   ├── PinInput.tsx              # Input de PIN de 4 dígitos
│   ├── PinInput.module.css       # Estilos del login
│   ├── Header.tsx                # Header con usuario y logout
│   ├── Header.module.css         # Estilos del header
│   ├── WelcomeCard.tsx           # Tarjeta de bienvenida
│   ├── WelcomeCard.module.css    # Estilos de bienvenida
│   ├── ParkingGrid.tsx           # Grid de 8 espacios
│   ├── ParkingGrid.module.css    # Estilos del grid
│   ├── DashboardLayout.tsx       # Layout para usuarios regulares
│   ├── DashboardLayout.module.css # Estilos del dashboard
│   ├── AdminDashboard.tsx        # Dashboard administrativo
│   └── AdminDashboard.module.css # Estilos del admin
├── types/
│   └── index.ts                  # Definiciones TypeScript
├── login/
│   └── page.tsx                  # Pantalla de login
├── dashboard/
│   └── page.tsx                  # Dashboard de usuario
├── admin/
│   └── page.tsx                  # Dashboard de admin
├── page.tsx                      # Home (redirección)
├── layout.tsx                    # Layout raíz
└── globals.css                   # Estilos globales
```

## Usuarios de Prueba

| PIN  | Nombre       | Rol   | Espacio Actual |
|------|-------------|-------|----------------|
| 1234 | Carlos López | User  | #7             |
| 5678 | Admin User  | Admin | -              |
| 0000 | Test User   | User  | #2             |

## Flujo de la App

### 1. Login (PIN)
```
/login → Input PIN 4 dígitos → Validación → Redirige a Dashboard o Admin
```

### 2. Dashboard Usuario
```
- Mensaje de bienvenida personalizado
- Estado actual del espacio asignado
- Grid de 8 espacios con estados
- Botones para ocupar/liberar espacio
- Estadísticas de disponibilidad
```

### 3. Dashboard Admin
```
- 4 estadísticas principales (usuarios activos, ocupación, disponibles, bloqueados)
- Tabla de usuarios con acciones expandibles
- Historial de actividades en timeline
- Gestión de permisos y accesos
```

## Características de Diseño

### Colores
- **Éxito/Disponible**: `#10b981` (Verde)
- **Error/Ocupado**: `#ef4444` (Rojo)
- **Advertencia/Admin**: `#f59e0b` (Ámbar)
- **Fondo**: `#f8f8f8` (Gris claro) / `#0f0f0f` (Dark)
- **Tarjetas**: `#ffffff` (Blanco) / `#1a1a1a` (Dark)

### Tipografía
- Familia: `-apple-system, BlinkMacSystemFont, Segoe UI, Inter, sans-serif`
- Font smoothing antialiased para mejor legibilidad
- Escala de pesos: 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Layout
- Gap estándar: 16px
- Border radius: 8-12px
- Transiciones suaves: 0.2-0.3s
- Sombras sutiles para profundidad

## Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Visitar en el navegador
# http://localhost:3000 → Redirige a /login
```

## Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm start        # Ejecutar app compilada
npm run lint     # Validar código
```

## Tecnologías

- **Framework**: Next.js 16.1.6
- **React**: 19.2.3
- **Lenguaje**: TypeScript 5
- **Estilos**: CSS Modules + Variables CSS
- **Tipado**: TypeScript strict mode

## Rutas Disponibles

| Ruta       | Descripción              | Requiere Auth |
|-----------|--------------------------|---------------|
| `/`       | Home (redirige)          | No            |
| `/login`  | Pantalla de login        | No            |
| `/dashboard` | Dashboard usuario      | Sí (User)     |
| `/admin`  | Panel administrativo     | Sí (Admin)    |

## Próximas Mejoras

- [ ] Integración con base de datos (Prisma)
- [ ] API routes para autenticación real
- [ ] Persistencia de datos
- [ ] Notificaciones en tiempo real
- [ ] Exportar reportes
- [ ] Autenticación con JWT
- [ ] Two-factor authentication
- [ ] Logs de auditoría

## Usabilidad

✅ **Cero Fricción**
- Acceso inmediato con PIN
- Flujo directo sin pasos innecesarios
- Interfaz intuitiva

✅ **Móvil First**
- Completamente responsivo
- Botones y elementos grandes
- Diseño touch-friendly

✅ **Accesibilidad**
- Contraste suficiente
- Fuentes legibles
- Navegación clara

## Licencia

Proyecto privado para gestión interna de estacionamiento.
