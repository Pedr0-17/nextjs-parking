# 🎬 Quick Start Guide - Guía de Acceso Rápido

## Iniciar la Aplicación en 30 segundos

### Paso 1: Instalar y Ejecutar
```bash
cd /Users/pedro/Documents/Pruebas/nextjs-parking
npm install
npm run dev
```

### Paso 2: Abrir en el Navegador
```
http://localhost:3000
```

### Paso 3: Ingresar PIN
La app te redirige automáticamente a `/login`.

Usa uno de estos PINs:
- **1234** → Usuario regular (Carlos López)
- **5678** → Administrador
- **0000** → Usuario de prueba

## 📸 Pantallas Principales

### 1️⃣ Login Page (`/login`)
```
┌─────────────────────────────────┐
│      Estacionamiento            │
│   Ingrese su código PIN...      │
│                                 │
│    ○  ○  ○  ○                   │
│                                 │
│   [    ENTRAR    ]              │
│                                 │
│ Escriba los dígitos...          │
└─────────────────────────────────┘
```

**Input PIN**: 4 dígitos numéricos
- Display visual con puntos
- Validación automática
- Mensaje de error si PIN incorrecto

### 2️⃣ User Dashboard (`/dashboard`)
```
┌─────────────────────────────────┐
│  🅿️ Parking      Carlos López   │
│                         [Salir] │
├─────────────────────────────────┤
│                                 │
│  ¡Bienvenido, Carlos!          │
│  Tu Espacio: #7                 │
│  Disponibles: 5   Ocupados: 3   │
│                                 │
├─────────────────────────────────┤
│  ESPACIOS DE ESTACIONAMIENTO    │
│                                 │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│  │ #1 │ │ #2 │ │ #3 │ │ #4 │  │
│  │█ L│ │█ O│ │█ L│ │█ O│  │
│  └────┘ └────┘ └────┘ └────┘  │
│                                 │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│  │ #5 │ │ #6 │ │ #7 │ │ #8 │  │
│  │█ L│ │█ L│ │█ O│ │█ L│  │
│  └────┘ └────┘ └────┘ └────┘  │
└─────────────────────────────────┘
```

**Funcionalidades**:
- Tarjetas interactivas de espacios
- Clica para ocupar/liberar
- Borde grueso = Tu espacio actual
- Verde = Disponible, Rojo = Ocupado

### 3️⃣ Admin Dashboard (`/admin`)
```
┌─────────────────────────────────┐
│  🅿️ Parking   Admin User  ADMIN  │
│                         [Salir] │
├─────────────────────────────────┤
│                                 │
│  ┌────────┐ ┌────────┐ ┌──────┐│
│  │Usuarios│ │Espacios│ │Disp. ││
│  │   3    │ │  3/8   │ │  5   ││
│  └────────┘ └────────┘ └──────┘│
│                                 │
├─────────────────────────────────┤
│  GESTIÓN DE USUARIOS            │
│                                 │
│  Nombre          Espacio Último │
│  ────────────────────────────── │
│  Carlos López      #7    14:30  │ ▼
│  Juan Pérez        #2    13:45  │ ▼
│  María García      #4    14:15  │ ▼
│  Roberto Martínez  -     10:20  │ ▼
│                                 │
├─────────────────────────────────┤
│  HISTORIAL RECIENTE             │
│                                 │
│  • Carlos López                 │
│    Ocupó espacio #7 → 14:30     │
│                                 │
│  • María García                 │
│    Ocupó espacio #4 → 14:15     │
└─────────────────────────────────┘
```

**Funcionalidades**:
- Tabla de usuarios expandible
- Acciones por usuario
- Timeline de historial
- Estadísticas principales

## 🎮 Interacción Básica

### En Login
```
Escribe: 1 2 3 4 → PIN completo
                 → Botón "Entrar" se activa
                 → Clic → Redirección a Dashboard
```

### En Dashboard
```
Grid de Espacios:
  Espacio Libre    → Clica → Ocupa tu espacio
  Tu Espacio (borde grueso) → Clica → Libera
  Espacio de otro  → Solo visualización
```

### En Admin
```
Tabla de Usuarios:
  Clica fila → Se expande
           → Ver botones: Editar, Resetear PIN, Bloquear
           → Clica nuevamente → Se contrae
```

## 🗂️ Estructura de Archivos Clave

```
Componentes de UI:
├── PinInput.tsx          → Input de PIN (login)
├── Header.tsx            → Barra superior
├── WelcomeCard.tsx       → Saludo y estadísticas
├── ParkingGrid.tsx       → Grid de 8 espacios
├── DashboardLayout.tsx   → Envolvente para usuarios
└── AdminDashboard.tsx    → Panel administrativo

Páginas:
├── page.tsx              → Home (redirecciona)
├── login/page.tsx        → Pantalla de login
├── dashboard/page.tsx    → Dashboard usuario
└── admin/page.tsx        → Panel admin

Utilidades:
├── types/index.ts        → TypeScript types
├── lib/utils.ts          → Funciones helper
└── lib/auth.ts           → Lógica autenticación

Estilos:
└── globals.css           → Variables CSS globales
```

## 🎨 Variables CSS Disponibles

```css
/* Colores */
--background          /* Fondo principal */
--foreground          /* Texto principal */
--card-bg             /* Fondo de tarjetas */
--border              /* Color de bordes */
--success  (#10b981)  /* Verde - Disponible */
--error    (#ef4444)  /* Rojo - Ocupado */
--warning  (#f59e0b)  /* Ámbar - Admin */
--text-secondary      /* Gris - Secundario */
```

## 🔄 Flujo de Datos

```
Login → Validar PIN → Guardar user en localStorage
                  ↓
            localStorage.user = JSON
                  ↓
        Dashboard/Admin accede a localStorage.user
                  ↓
         Si logout → Borrar localStorage.user
                  ↓
             Redirecciona a login
```

## 📱 Responsive Breakpoints

```css
Mobile:  < 640px   (default)
Tablet:  640-1024px
Desktop: > 1024px
```

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| No inicia | Ejecutar `npm install` primero |
| Puerto 3000 ocupado | Cambiar puerto: `npm run dev -- -p 3001` |
| PIN no funciona | Verificar que introdujiste 4 dígitos |
| Página en blanco | Abrir DevTools, revisar Console |
| Estilos rotos | Limpiar caché: Ctrl+Shift+Delete |
| Error de hidratación | Asegurarse que el componente tiene `'use client'` |

## 🚀 Próximos Pasos

1. **Familiarizarse con la interfaz**
   - Probar ambos roles (usuario y admin)
   - Interactuar con el grid de espacios
   - Expandir usuarios en admin

2. **Entender la estructura**
   - Revisar [DEVELOPMENT.md](./DEVELOPMENT.md)
   - Leer [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
   - Explorar [DOCUMENTATION.md](./DOCUMENTATION.md)

3. **Hacer cambios**
   - Editar componentes en `app/components/`
   - Cambiar estilos en archivos `.module.css`
   - Agregar nuevas rutas en `app/`

## 📞 Atajos Útiles

```bash
npm run dev      # Iniciar desarrollo
npm run build    # Compilar
npm run lint     # Validar código
npm start        # Correr build compilado
```

## ✨ Tips Profesionales

1. **DevTools**: F12 para inspeccionar
2. **Console**: Ver errores y logs
3. **LocalStorage**: 
   ```javascript
   // En console:
   JSON.parse(localStorage.getItem('user'))
   localStorage.clear()  // Logout manual
   ```
4. **Network Tab**: Ver solicitudes API
5. **Mobile View**: Ctrl+Shift+M (Chrome)

---

**¡Ahora estás listo para explorar la app!** 🚀
