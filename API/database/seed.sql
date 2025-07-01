-- Datos de ejemplo para poblar el blog

-- Insertar categorías
INSERT INTO categories (name, slug, description, color) VALUES
('Tecnología', 'tecnologia', 'Artículos sobre tecnología y programación', '#3B82F6'),
('Personal', 'personal', 'Reflexiones y experiencias personales', '#10B981'),
('Tutoriales', 'tutoriales', 'Guías paso a paso', '#F59E0B'),
('Opinión', 'opinion', 'Artículos de opinión', '#EF4444'),
('Desarrollo Web', 'desarrollo-web', 'Todo sobre desarrollo web', '#8B5CF6'),
('Herramientas', 'herramientas', 'Herramientas y recursos útiles', '#06B6D4')
ON CONFLICT (slug) DO NOTHING;

-- Insertar usuario administrador (las contraseñas se actualizarán en el script init.js)
INSERT INTO users (username, email, password_hash, full_name, bio, is_admin) VALUES
('admin', 'admin@blog.com', 'temp_password_hash', 'Administrador del Blog', 'Desarrollador y escritor apasionado por la tecnología', true),
('editor', 'editor@blog.com', 'temp_password_hash', 'Editor', 'Editor de contenido del blog', false)
ON CONFLICT (username) DO NOTHING;

-- Insertar posts de ejemplo
INSERT INTO posts (title, slug, content, excerpt, status, author_id, category_id, published_at) VALUES
(
    'Bienvenido a mi blog personal',
    'bienvenido-a-mi-blog-personal',
    '¡Hola a todos! Este es mi primer post en este blog personal. Aquí compartiré mis experiencias, aprendizajes y reflexiones sobre tecnología, programación y otros temas que me apasionan.

Espero que este espacio se convierta en un lugar donde podamos aprender juntos y compartir conocimientos. Cada semana publicaré contenido nuevo sobre:

- Tutoriales de programación
- Reflexiones sobre tecnología
- Herramientas que uso en mi día a día
- Experiencias personales en el mundo del desarrollo

¡Gracias por visitar mi blog!',
    'Una introducción a este blog personal donde compartiré mis experiencias y conocimientos sobre tecnología.',
    'published',
    1,
    2,
    CURRENT_TIMESTAMP
),
(
    'Mi primera API REST con Node.js',
    'mi-primera-api-rest-con-nodejs',
    'Hoy quiero compartir mi experiencia creando mi primera API REST con Node.js y Express. Fue un proceso muy interesante que me enseñó mucho sobre desarrollo backend.

## ¿Qué aprendí?

### 1. Estructura del proyecto
Es fundamental organizar bien el código desde el principio. Separar rutas, controladores, modelos y middleware hace que el proyecto sea más mantenible.

### 2. Manejo de errores
Implementar un buen sistema de manejo de errores es crucial. Los usuarios necesitan respuestas claras cuando algo sale mal.

### 3. Validación de datos
Siempre validar los datos de entrada. Nunca confíes en los datos que llegan del cliente.

### 4. Documentación
Documentar tu API es esencial, especialmente si otros desarrolladores van a usarla.

## Conclusión
Crear una API REST fue una experiencia muy gratificante. Aunque al principio parecía complicado, con práctica y paciencia se vuelve más natural.',
    'Experiencias y aprendizajes al crear mi primera API REST con Node.js y Express.',
    'published',
    1,
    1,
    CURRENT_TIMESTAMP
),
(
    'Tutorial: Configurar PostgreSQL con Docker',
    'tutorial-configurar-postgresql-con-docker',
    'En este tutorial te muestro cómo configurar PostgreSQL usando Docker Compose para desarrollo local. Es una forma muy práctica de tener una base de datos lista para trabajar.

## Requisitos previos
- Docker instalado
- Docker Compose instalado

## Pasos

### 1. Crear docker-compose.yml
```yaml
version: "3.8"
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 2. Iniciar la base de datos
```bash
docker-compose up -d
```

### 3. Conectar desde tu aplicación
```javascript
const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  port: 5432,
  database: "myapp",
  user: "admin",
  password: "secret"
});
```

## Ventajas de usar Docker
- Entorno consistente
- Fácil de compartir con el equipo
- No contamina tu sistema local
- Fácil de destruir y recrear',
    'Guía paso a paso para configurar PostgreSQL con Docker Compose para desarrollo local.',
    'published',
    1,
    3,
    CURRENT_TIMESTAMP
),
(
    '¿Por qué elegí Node.js para mi proyecto?',
    'por-que-elegi-nodejs-para-mi-proyecto',
    'Después de evaluar varias opciones para mi proyecto, decidí usar Node.js. En este post te explico las razones de mi decisión.

## Ventajas de Node.js

### 1. JavaScript en todo el stack
Poder usar el mismo lenguaje tanto en frontend como backend es una gran ventaja. Reduce la curva de aprendizaje y facilita el mantenimiento.

### 2. Ecosistema rico
npm tiene una cantidad enorme de paquetes disponibles. Casi cualquier funcionalidad que necesites ya está implementada por alguien más.

### 3. Rendimiento
Node.js es muy eficiente para aplicaciones I/O intensivas. Su modelo de eventos no bloqueantes lo hace ideal para APIs.

### 4. Comunidad activa
La comunidad de Node.js es muy activa y siempre hay recursos disponibles para aprender.

## Alternativas consideradas
- Python (Django/Flask): Excelente para ML, pero más lento para APIs
- Go: Muy rápido, pero menos ecosistema
- Java: Muy robusto, pero más verboso

## Conclusión
Node.js fue la mejor opción para mi caso de uso específico. Cada proyecto tiene sus necesidades y es importante evaluar las opciones.',
    'Reflexiones sobre por qué elegí Node.js para mi proyecto y las alternativas que consideré.',
    'published',
    1,
    4,
    CURRENT_TIMESTAMP
),
(
    'Herramientas esenciales para desarrolladores',
    'herramientas-esenciales-para-desarrolladores',
    'Después de años programando, he identificado las herramientas que considero esenciales para cualquier desarrollador. Aquí te comparto mi lista.

## Editor de código
**VS Code** es mi elección personal. Es gratuito, tiene excelentes extensiones y es muy personalizable.

## Control de versiones
**Git** es fundamental. Aprende a usarlo bien desde el principio.

## Terminal
Una buena terminal es crucial. Recomiendo:
- **iTerm2** (macOS)
- **Windows Terminal** (Windows)
- **Alacritty** (Linux)

## Gestión de paquetes
- **npm/yarn** para Node.js
- **pip** para Python
- **cargo** para Rust

## Herramientas de desarrollo
- **Postman** para probar APIs
- **Docker** para contenedores
- **GitHub** para repositorios

## Conclusión
Invertir tiempo en aprender estas herramientas te hará más productivo a largo plazo.',
    'Una lista de las herramientas que considero esenciales para cualquier desarrollador.',
    'published',
    1,
    5,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;

-- Insertar comentarios de ejemplo
INSERT INTO comments (content, author_name, author_email, post_id, is_approved) VALUES
('¡Excelente blog! Me encantó el post sobre Node.js.', 'María García', 'maria@email.com', 2, true),
('Muy útil el tutorial de PostgreSQL con Docker. Gracias por compartir.', 'Carlos López', 'carlos@email.com', 3, true),
('Interesante reflexión sobre Node.js. ¿Has probado TypeScript?', 'Ana Rodríguez', 'ana@email.com', 4, true),
('Gracias por la lista de herramientas. VS Code es realmente increíble.', 'Luis Martínez', 'luis@email.com', 5, true)
ON CONFLICT DO NOTHING; 