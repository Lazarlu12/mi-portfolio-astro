import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // Obtenemos los datos que envió tu formulario de React
  const data = await request.json();
  
  // Leemos la variable de entorno de forma segura en el backend
  const formspreeUrl = import.meta.env.FORMSPREE_ENDPOINT;

  if (!formspreeUrl) {
    return new Response(JSON.stringify({ 
      errors: [{ message: 'Falta configuración del servidor' }] 
    }), { status: 500 });
  }

  try {
    // Enviamos la petición a Formspree desde Astro
    const res = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const formspreeData = await res.json();

    // Si Formspree rechaza la petición, devolvemos sus errores al frontend
    if (!res.ok) {
      return new Response(JSON.stringify({ 
        errors: formspreeData.errors || [{ message: 'Error en Formspree' }] 
      }), { status: res.status });
    }

    // Si todo salió bien
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ 
      errors: [{ message: 'Error interno del servidor' }] 
    }), { status: 500 });
  }
};