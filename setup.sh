#!/bin/bash

# 🅿️ Parking Manager - Script de Inicialización
# Este script ayuda a configurar y ejecutar la aplicación

set -e

echo "╔════════════════════════════════════════════╗"
echo "║    🅿️  PARKING MANAGER - INICIALIZADOR    ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir secciones
print_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# 1. Verificar Node.js
print_section "Verificando Node.js"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js no está instalado${NC}"
    echo "Descargar desde: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓${NC} Node.js ${NODE_VERSION} instalado"

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓${NC} npm ${NPM_VERSION} instalado"

# 2. Instalar dependencias
print_section "Instalando dependencias"
if [ -f "package.json" ]; then
    echo "package.json encontrado"
    npm install
    echo -e "${GREEN}✓${NC} Dependencias instaladas"
else
    echo -e "${YELLOW}⚠️  package.json no encontrado${NC}"
    exit 1
fi

# 3. Crear .env.local si no existe
print_section "Configurando variables de entorno"
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✓${NC} Creado .env.local desde .env.example"
    else
        echo -e "${YELLOW}⚠️  .env.example no encontrado${NC}"
    fi
else
    echo -e "${GREEN}✓${NC} .env.local ya existe"
fi

# 4. Mostrar información de inicio
print_section "Información de Inicio"
echo -e "${GREEN}✓${NC} Proyecto listo para ejecutar"
echo ""
echo "Para iniciar el servidor de desarrollo, ejecuta:"
echo -e "${BLUE}npm run dev${NC}"
echo ""
echo "Luego abre en tu navegador:"
echo -e "${BLUE}http://localhost:3000${NC}"
echo ""
echo "Usuarios de prueba:"
echo -e "${YELLOW}PIN: 1234${NC}  → Usuario (Carlos López)"
echo -e "${YELLOW}PIN: 5678${NC}  → Administrador"
echo -e "${YELLOW}PIN: 0000${NC}  → Test User"
echo ""

# 5. Ofrecer iniciar el servidor
echo -e "${YELLOW}¿Deseas iniciar el servidor ahora? (s/n)${NC}"
read -r -n 1 response
echo ""

if [[ $response == "s" || $response == "S" ]]; then
    print_section "Iniciando servidor de desarrollo"
    npm run dev
else
    echo -e "${GREEN}✓${NC} Instalación completada"
    echo ""
    echo "Para iniciar luego, ejecuta: npm run dev"
fi
