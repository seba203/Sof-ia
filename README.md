# Sof-IA ☁️✨ | Asistente de Psicología

**Sof-IA** es una aplicación web interactiva diseñada para estudiantes y profesionales de la psicología. Permite simular entrevistas o casos clínicos mediante roleplay, consultar dudas generales y revisar citas/redacciones bajo la norma **APA 7**, todo potenciado por la API de Anthropic (Claude) y respaldado por una arquitectura multiusuario en **Supabase**.

---

## 🚀 Características Principales

- **Multi-modo de Asistencia:**
  - 💬 **Chat General:** Respuestas dinámicas y rápidas orientadas a la psicología (Claude Haiku).
  - 🎭 **Roleplay Clínico:** Simulación interactiva de casos y entrevistas clínicas (Claude Haiku).
  - 📝 **Revisión APA 7:** Asistencia detallada en formato, normas de citación y redacción académica (Claude Sonnet).
- **Autenticación y Multiusuario:**
  - Sistema de acceso mediante credenciales personalizadas (`username` y `access_code`).
  - Gestión de API Keys independientes: Cada tester utiliza su propia clave de API de Anthropic (`sk-ant-api...`).
- **Persistencia de Datos:**
  - Historial de chats aislado por usuario y por modo de conversación almacenado en tiempo real en Supabase.
- **Interfaz Moderna y Adaptativa:**
  - Soporte nativo para modo claro y modo oscuro.
  - Renderizado seguro de Markdown (`marked.js` + `DOMPurify`).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Librerías Client-Side:**
  - [Marked.js](https://marked.js.org/) (Formateo de Markdown)
  - [DOMPurify](https://github.com/cure53/DOMPurify) (Sanitización de HTML)
  - [@supabase/supabase-js](https://supabase.com/docs/reference/javascript/introduction) (SDK de cliente)
- **Backend & Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL + RLS + API REST)
- **Motor de IA:** [Anthropic API](https://docs.anthropic.com/) (Claude 3 Haiku & Claude 3.5 Sonnet)

---

## 🗄️ Estructura de la Base de Datos (Supabase)

El sistema utiliza tres tablas principales conectadas relacionalmente:

1. **`profiles`**: Almacena los perfiles de los usuarios/testers con sus credenciales.
2. **`conversations`**: Registra cada hilo de conversación agrupado por usuario (`user_id`) y por categoría (`mode`).
3. **`messages`**: Guarda el historial cronológico de mensajes (`user` y `assistant`) vinculado a cada conversación.

---

## ⚙️ Configuración del Proyecto

### 1. Clonar o descargar el repositorio
```bash
git clone [https://github.com/tu-usuario/sof-ia.git](https://github.com/tu-usuario/sof-ia.git)
cd sof-ia
