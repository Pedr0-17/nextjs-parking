# 🅿️ Parking Manager - Sistema de Gestión de Estacionamiento

Una aplicación web moderna, minimalista y altamente usable para la gestión interna de estacionamientos.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Versión](https://img.shields.io/badge/versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/licencia-privada-red)

## 🎯 Características Principales

### 💡 Diseño Moderno & Minimalista
- Interfaz limpia y corporativa
- Colores neutros con acentos semánticos (verde para disponible, rojo para ocupado)
- Completamente responsivo y optimizado para móvil
- Tipografía moderna (Inter) con excelente legibilidad

### 🔐 Sistema de Autenticación
- Acceso mediante PIN de 4 dígitos
- No hay registro público, solo acceso privado
- Gestión de sesiones con localStorage
- Roles: Usuario Regular y Administrador

### 🚗 Gestión de Espacios
- 8 espacios de estacionamiento
- Estados visuales claros (Libre/Ocupado)
- Grid interactivo con tarjetas dinámicas
- Información en tiempo real
- Ocupación y liberación con un clic

### 👥 Panel Administrativo
- Tabla de usuarios con acciones expandibles
- Estadísticas en tiempo real
- Historial de actividades en timeline
- Gestión de permisos y bloqueos

### ✨ Usabilidad Extrema
- Cero fricción en el flujo de usuario
- Interfaz intuitiva
- Botones grandes y fáciles de presionar
- Mensajes de error claros y discretos

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar o descargar el proyecto
cd nextjs-parking

# Instalar dependencias
npm install

# Copiar archivo de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. La app redirige automáticamente a la pantalla de login.

## 📋 Usuarios de Prueba

Para probar la aplicación, usa estos PINs:

| PIN  | Usuario       | Rol   | Estado        |
|------|---------------|-------|---------------|
| 1234 | Carlos López  | User  | Espacio #7    |
| 5678 | Admin User    | Admin | N/A           |
| 0000 | Test User     | User  | Espacio #2    |

## 🏗️ Estructura del Proyecto

```
nextjs-parking/
├── app/
│   ├── components/           # Componentes reutilizables
│   │   ├── PinInput.tsx      # Input de PIN
│   │   ├── Header.tsx        # Barra superior
│   │   ├── WelcomeCard.tsx   # Tarjeta de bienvenida
│   │   ├── ParkingGrid.tsx   # Grid de 8 espacios
│   │   ├── DashboardLayout.tsx
│   │   └── AdminDashboard.tsx
│   │
│   ├── types/
│   │   └── index.ts          # Definiciones TypeScript
│   │
│   ├── login/
│   │   └── page.tsx          # Pantalla de login
│   │
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard de usuario
│   │
│   ├── admin/
│   │   └── page.tsx          # Dashboard administrativo
│   │
│   ├── api/                  # Rutas API
│   │   ├── auth/
│   │   ├── parking/
│   │   └── users/
│   │
│   ├── page.tsx              # Home (redirección)
│   ├── layout.tsx            # Layout raíz
│   └── globals.css           # Estilos globales
│
├── lib/
│   ├── utils.ts              # Funciones utilitarias
│   ├── prisma.ts             # Cliente de Prisma
│   └── auth.ts               # Lógica de autenticación
│
├── prisma/
│   └── schema.prisma         # Esquema de BD
│
├── public/                   # Archivos estáticos
│
├── DOCUMENTATION.md          # Documentación detallada
├── DEVELOPMENT.md            # Guía de desarrollo
├── DESIGN_SYSTEM.md          # Guía de diseño visual
├── .env.example              # Variables de entorno
└── package.json              # Dependencias
```

## 🎨 Diseño Visual

### Paleta de Colores
- **Verde (#10b981)**: Espacios disponibles, acciones positivas
- **Rojo (#ef4444)**: Espacios ocupados, errores
- **Ámbar (#f59e0b)**: Indicador de administrador
- **Gris (#6b7280)**: Texto secundario

### Tipografía
- Familia: `-apple-system, BlinkMacSystemFont, Segoe UI, Inter, sans-serif`
- Pesos: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Escala: 11px → 32px con proporciones armónicas

## 🔄 Flujo de Navegación

```
┌─────────────────────────────────────────┐
│              /login (PIN)               │
│      Input 4 dígitos → Validación       │
└─────────────────────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
   /dashboard      /admin
   (Usuario)      (Admin)
   ├─ Bienvenida   ├─ Estadísticas
   ├─ Mi espacio   ├─ Tabla usuarios
   └─ Grid 8       ├─ Historial
      espacios     └─ Acciones
```

## 🛠️ Tecnologías

- **Framework**: [Next.js 16.1.6](https://nextjs.org)
- **React**: 19.2.3
- **TypeScript**: 5
- **Estilos**: CSS Modules + Variables CSS
- **Base de Datos**: Prisma (configurado)
- **Fuente**: [Inter](https://fonts.google.com/specimen/Inter)

## 📚 Documentación

- [**DOCUMENTATION.md**](./DOCUMENTATION.md) - Documentación completa de la app
- [**DEVELOPMENT.md**](./DEVELOPMENT.md) - Guía para desarrolladores
- [**DESIGN_SYSTEM.md**](./DESIGN_SYSTEM.md) - Sistema de diseño visual

## 🔧 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm start        # Ejecuta build compilado
npm run lint     # Valida código con ESLint
```

## 🔒 Seguridad

⚠️ **Nota**: Esta es una implementación de demostración. Para producción:

- [ ] Implementar autenticación JWT real
- [ ] Usar cookies seguras (httpOnly)
- [ ] Validar PINs en backend
- [ ] Implementar rate limiting
- [ ] Usar HTTPS
- [ ] Agregar CSRF protection
- [ ] Validar todas las solicitudes API

## 📱 Responsividad

La app está optimizada para:
- ✅ Móviles (< 640px)
- ✅ Tablets (640px - 1024px)
- ✅ Desktop (> 1024px)

Todos los elementos son touch-friendly y escalables.

## 🎯 Próximas Mejoras

- [ ] Integración con base de datos real (PostgreSQL + Prisma)
- [ ] API routes autenticadas
- [ ] Notificaciones en tiempo real
- [ ] Exportar reportes (PDF/CSV)
- [ ] Two-factor authentication
- [ ] Logs de auditoría
- [ ] Soporte para múltiples estacionamientos
- [ ] Historial detallado por usuario
- [ ] Gráficos de ocupación
- [ ] Alertas y notificaciones

## 🤝 Contribuciones

Este proyecto es privado. Para cambios internos:

1. Crear una rama: `git checkout -b feature/mi-feature`
2. Hacer commit: `git commit -am 'Agregar feature'`
3. Push: `git push origin feature/mi-feature`
4. Crear Pull Request

## 📞 Contacto & Soporte

Para preguntas o problemas:
- Revisar [DEVELOPMENT.md](./DEVELOPMENT.md) para problemas comunes
- Contactar al administrador del sistema

## 📄 Licencia

Proyecto privado. Derechos reservados.

---

**Versión**: 1.0.0  
**Última actualización**: 29 de enero de 2025  
**Estado**: En desarrollo activo ✨

