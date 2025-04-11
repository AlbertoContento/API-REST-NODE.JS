# 🎫 Ticketing System API REST

Bienvenido a **Ticketing System API REST**, un proyecto Node.js que provee una API REST para gestionar tickets y usuarios. Este proyecto utiliza [Express](https://expressjs.com/) y [MongoDB](https://www.mongodb.com/) para ofrecer una solución escalable y eficiente en la administración de incidencias y soporte.

---

**Requisitos:📑**
Asegúrate de tener instalados los siguientes componentes:

- Node.js (versión 12 o superior)
- npm (gestor de paquetes de Node.js)

---

## 🚀 Características

- **API REST** para la gestión de tickets y usuarios.
- Conexión a base de datos MongoDB con [Mongoose](https://mongoosejs.com/).
- Rutas y controladores bien organizados para facilitar la escalabilidad.
- Script para poblar la base de datos (`populateDB.js`) con datos de ejemplo.
- Configuración de variables de entorno para personalización en distintos entornos.
- Buenas prácticas en la estructura de archivos y gestión de versiones con Git.

---

## ⚙️ Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/AlbertoContento/API-REST-NODE.JS.git
   cd ticketing-system

2. Instalar dependencias
```bash
npm install
```

## ⚡ Uso

Una vez iniciado el servidor, la API estará disponible en http://localhost:3000.

# Endpoints Ejemplares
Tickets
- GET /api/tickets - Listar todos los tickets.
- POST /api/tickets - Crear un nuevo ticket.
- GET /api/tickets/:id - Obtener detalles de un ticket específico.
- PUT /api/tickets/:id - Actualizar un ticket.
- DELETE /api/tickets/:id - Eliminar un ticket.

Usuarios
- GET /api/users - Listar todos los usuarios.
- POST /api/users - Crear un nuevo usuario.
- GET /api/users/:id - Obtener detalles de un usuario.
- PUT /api/users/:id - Actualizar un usuario.
- DELETE /api/users/:id - Eliminar un usuario.

## 🌟 Contacto
Si tienes alguna duda o sugerencia, puedes contactarme a través de albertillo_ec@hotmail.com o en mi linkedin https://www.linkedin.com/in/alberto-contento-guerrero/

¡Gracias por visitar el repositorio de Ticketing System API REST! 🚀