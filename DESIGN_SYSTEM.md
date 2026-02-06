# 🎨 Guía de Diseño Visual

## Paleta de Colores

### Colores Semánticos
```
--success:         #10b981 (Verde - Disponible)
--error:           #ef4444 (Rojo - Ocupado/Error)
--warning:         #f59e0b (Ámbar - Admin/Alerta)
--background:      #f8f8f8 (Claro) / #0f0f0f (Oscuro)
--card-bg:         #ffffff (Claro) / #1a1a1a (Oscuro)
--border:          #e0e0e0 (Claro) / #2d2d2d (Oscuro)
--foreground:      #1a1a1a (Texto principal claro) / #ffffff (Oscuro)
--text-secondary:  #6b7280 (Texto secundario)
```

### Ejemplos de Uso

**Espacios Disponibles**
- Borde: `var(--success)`
- Badge: `var(--success)`
- Punto de estado: `var(--success)` (pulsante)

**Espacios Ocupados**
- Borde: `var(--error)`
- Badge: `var(--error)`
- Punto de estado: `var(--error)` (pulsante)

**Panel Admin**
- Badge: `var(--warning)`
- Botones peligrosos: `var(--error)`

## Tipografía

### Fuente Principal
```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif;
```

### Escala de Tamaños

| Elemento | Tamaño | Peso   | Caso         |
|----------|--------|--------|--------------|
| H1 (Login) | 32px | 700   | Normal       |
| H1 (Dashboard) | 24px | 700 | Normal       |
| H2 (Sección) | 18px | 600 | UPPERCASE    |
| H3 | 16px | 600 | Normal       |
| Texto base | 14px | 400 | Normal       |
| Label | 12px | 600 | UPPERCASE    |
| Small | 11px | 400 | Normal       |

### Letter Spacing
- Títulos y labels: `letter-spacing: 0.5px`
- Para UPPERCASE: `letter-spacing: 0.5px` adicional

## Espaciado

### Gaps y Padding
```
--base-gap: 16px
--small-gap: 8px
--large-gap: 24px
--xl-gap: 32px

Uso:
- Entre elementos internos: 16px
- Padding de tarjetas: 20px 16px
- Padding de buttons: 16px 24px
- Gap entre secciones: 32px
```

### Breakpoints
```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
```

## Componentes

### Botones

**Primario (Submit)**
```css
padding: 16px 24px;
background: var(--foreground);
color: var(--background);
border-radius: 8px;
font-weight: 600;
font-size: 16px;

&:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

&:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Secundario**
```css
padding: 8px 16px;
background: var(--card-bg);
border: 1px solid var(--border);
color: var(--foreground);
border-radius: 6px;
font-weight: 600;
font-size: 13px;

&:hover {
  background: var(--foreground);
  color: var(--background);
}
```

**Peligro**
```css
color: var(--error);
border-color: var(--error);

&:hover {
  background: var(--error);
  color: white;
  border-color: var(--error);
}
```

### Tarjetas (Cards)

```css
background-color: var(--card-bg);
border: 1px solid var(--border);
border-radius: 12px;
padding: 20px;
transition: all 0.3s ease;

/* Estados de Hover */
&:hover {
  border-color: var(--success);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
  transform: translateY(-2px);
}
```

### Badges/Pills

```css
display: inline-block;
padding: 4px 8px;
background-color: var(--success);
color: white;
font-size: 11px;
font-weight: 700;
border-radius: 4px;
text-transform: uppercase;
letter-spacing: 0.5px;
```

### Inputs

```css
padding: 12px 16px;
border: 1px solid var(--border);
background-color: var(--background);
color: var(--foreground);
border-radius: 8px;
font-size: 14px;

&:focus {
  outline: none;
  border-color: var(--success);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
```

## Animaciones

### Transiciones Estándar
```
0.2s ease   - Cambios rápidos (hover, cambio de estado)
0.3s ease   - Cambios medianos (aparición, desaparición)
```

### Keyframes Frecuentes

**Pulse (estado en tiempo real)**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

animation: pulse 2s infinite;
```

**Slide Down (mensajes de error)**
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: slideDown 0.3s ease;
```

## Sombras

### Elevación
```css
/* Sin elevación */
border: 1px solid var(--border);

/* Pequeña elevación (hover cards) */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* Elevación media (modals) */
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
```

## Responsive Design

### Mobile First (< 640px)
```css
/* Valores por defecto - Mobile */
padding: 16px;
font-size: 14px;
gap: 12px;

/* Ocultar elementos en mobile */
display: none;
```

### Tablet (640px - 1024px)
```css
@media (max-width: 1024px) {
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
}
```

### Desktop (> 1024px)
```css
grid-template-columns: repeat(4, 1fr);
max-width: 1200px;
```

## Accesibilidad

### Contraste
- Texto normal en fondo: mín 4.5:1
- Texto grande: mín 3:1
- Todos los colores semánticos cumplen WCAG AA

### Tamaños Mínimos
- Área táctil mínima: 44x44px
- Botones: mín 16px de alto

### Focus States
```css
&:focus {
  outline: 2px solid var(--success);
  outline-offset: 2px;
}
```

## Temas (Dark Mode)

La app soporta automáticamente dark mode mediante:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f0f0f;
    --card-bg: #1a1a1a;
    /* ... */
  }
}
```

## Consistencia Visual

### Reglas de Oro
1. **Espaciado coherente** - Usar múltiplos de 8px (8, 16, 24, 32)
2. **Bordes suaves** - Border radius: 8px para cards, 6px para botones pequeños
3. **Transiciones** - Siempre 0.2-0.3s ease
4. **Iconografía** - Emojis como accento visual, nunca necesarios
5. **Alineación** - Máximo 1200px de ancho en desktop
6. **Textura** - Fondos planos sin patterns
7. **Profundidad** - Usar bordes y sombras sutiles

### Validación Visual

**Error**
- Borde rojo
- Icono/texto rojo
- Animación de slide down

**Éxito**
- Badge verde
- Animación suave

**Estado Cargando**
- Opacidad 0.5
- Cursor: not-allowed
- Deshabilitado visualmente

## Ejemplos Prácticos

### Espacio Disponible
```
Borde: verde (#10b981)
Badge: "LIBRE" con punto verde pulsante
Hover: sombra verde sutil
Background gradient: rgba(16, 185, 129, 0.05)
```

### Espacio Ocupado
```
Borde: rojo (#ef4444)
Badge: "OCUPADO" con punto rojo pulsante
Usuario: texto gris pequeño
Opacity: 0.7 (menos importante)
Background gradient: rgba(239, 68, 68, 0.05)
```

### Admin Badge
```
Background: ámbar (#f59e0b)
Color: white
Text: "ADMIN"
Tamaño: pequeño (11px)
Border radius: 4px
```
