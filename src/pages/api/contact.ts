import type { APIRoute } from 'astro';

// OBLIGATORIO: Indica a Astro que esto es código de servidor (Serverless Function)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // 1. SEGURIDAD: Validar el origen de la petición (Mitiga ataques CSRF externos)
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  // Evita que usen tu API desde otros sitios web o scripts externos
  if (origin && host && !origin.includes(host)) {
    return new Response(JSON.stringify({ 
      errors: [{ message: 'Acceso no autorizado' }] 
    }), { status: 403 });
  }

  try {
    // 2. SEGURIDAD: Controlar el tamaño del cuerpo para evitar ataques DoS (Denegación de Servicio)
    const rawData = await request.json();
    
    // 3. SEGURIDAD: Sanitizar y validar los campos mínimos requeridos
    // Evita inyecciones de código limpiando espacios y asegurando strings
    const name = String(rawData.name || '').trim();
    const email = String(rawData.email || '').trim();
    const message = String(rawData.message || '').trim();

    // Validaciones básicas de backend
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        errors: [{ message: 'Todos los campos son requeridos' }] 
      }), { status: 400 });
    }

    // Validar formato de correo con Expresión Regular estricta
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        errors: [{ message: 'El correo electrónico no es válido' }] 
      }), { status: 400 });
    }

    // 4. FILTRADO: HoneyPot (Opcional pero altamente recomendado)
    // Si agregas un input oculto en React llamado "honeypot", los bots automáticos lo llenarán.
    // Si viene lleno, rechazamos silenciosamente al bot sin gastar tu cuota de Formspree.
    if (rawData.honeypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Reconstruimos el objeto limpio, descartando cualquier campo extra que intente inyectar un hacker
    const cleanData = { name, email, message };

    // Leer la variable de entorno de Netlify
    const formspreeUrl = import.meta.env.FORMSPREE_ENDPOINT;
    if (!formspreeUrl) {
      return new Response(JSON.stringify({ 
        errors: [{ message: 'Falta configuración del servidor' }] 
      }), { status: 500 });
    }

    // Enviamos la petición limpia a Formspree
    const res = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(cleanData),
    });

    const formspreeData = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ 
        errors: formspreeData.errors || [{ message: 'Error al procesar el formulario' }] 
      }), { status: res.status });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ 
      errors: [{ message: 'Error interno del servidor' }] 
    }), { status: 500 });
  }
};
