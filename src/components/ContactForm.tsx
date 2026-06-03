import { useState } from 'react';

// Tipamos la forma de nuestro formulario y sus posibles errores
interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

// El ciclo de vida del envío del formulario
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  // Estado controlado: React "dueño" de cada campo del form
  const [form, setForm] = useState<FormData>({ nombre: '', email: '', mensaje: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  // Valida todos los campos y retorna true si no hay errores
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!form.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Ingresá un email válido';
    }

    if (!form.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (form.mensaje.trim().length < 10) {
      newErrors.mensaje = 'Mínimo 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler compartido para inputs y textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // UX: limpia el error del campo apenas el usuario empieza a corregirlo
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      // ─────────────────────────────────────────────────────────────────
      // TODO: Reemplazá esto con tu servicio real de email.
      //
      // Opción A — Formspree (gratis, sin backend):
      //   1. Creá cuenta en formspree.io
      //   2. Creá un nuevo form → te da un ID (ej: "xpzgkwqr")
      //   3. Reemplazá el fetch de abajo:
      //
      // const res = await fetch('https://formspree.io/f/TU_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error('Error al enviar');
      //
      // Opción B — Resend (más pro, requiere dominio propio)
      // ─────────────────────────────────────────────────────────────────

      // Simulación temporal (eliminala cuando integres el servicio real)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus('success');
      setForm({ nombre: '', email: '', mensaje: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-5">

      {/* ── Campo: Nombre ─────────────────────────────────── */}
      <div className="space-y-1.5">
        <label htmlFor="nombre" className="block text-sm font-medium text-mid">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          autoComplete="name"
          className={[
            'w-full bg-white/5 border rounded-lg px-4 py-3',
            'text-high placeholder-low/40',
            'outline-none transition-all duration-200',
            'focus:border-accent/50 focus:bg-white/[0.07]',
            errors.nombre ? 'border-red-400/50' : 'border-white/10',
          ].join(' ')}
        />
        {errors.nombre && (
          <p className="text-xs text-red-400/70">{errors.nombre}</p>
        )}
      </div>

      {/* ── Campo: Email ──────────────────────────────────── */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-mid">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          autoComplete="email"
          className={[
            'w-full bg-white/5 border rounded-lg px-4 py-3',
            'text-high placeholder-low/40',
            'outline-none transition-all duration-200',
            'focus:border-accent/50 focus:bg-white/[0.07]',
            errors.email ? 'border-red-400/50' : 'border-white/10',
          ].join(' ')}
        />
        {errors.email && (
          <p className="text-xs text-red-400/70">{errors.email}</p>
        )}
      </div>

      {/* ── Campo: Mensaje ────────────────────────────────── */}
      <div className="space-y-1.5">
        <label htmlFor="mensaje" className="block text-sm font-medium text-mid">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="¿En qué puedo ayudarte?"
          className={[
            'w-full bg-white/5 border rounded-lg px-4 py-3',
            'text-high placeholder-low/40',
            'outline-none transition-all duration-200 resize-none',
            'focus:border-accent/50 focus:bg-white/[0.07]',
            errors.mensaje ? 'border-red-400/50' : 'border-white/10',
          ].join(' ')}
        />
        {errors.mensaje && (
          <p className="text-xs text-red-400/70">{errors.mensaje}</p>
        )}
      </div>

      {/* ── Botón de envío ────────────────────────────────── */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full py-3 px-6
          bg-accent/10 border border-accent/30 text-accent
          rounded-lg font-medium tracking-wide
          transition-all duration-200
          hover:bg-accent/20 hover:border-accent/60
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading'
          ? 'Enviando...'
          : status === 'success'
            ? '¡Enviado ✓'
            : 'Enviar mensaje'}
      </button>

      {/* ── Feedback de estado ────────────────────────────── */}
      {status === 'success' && (
        <p className="text-center text-accent/80 text-sm">
          ¡Gracias! Me pondré en contacto a la brevedad.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-400/70 text-sm">
          <a>
          Algo salió mal. Escribime directo a{' '}
          
            href="mailto:lazarteluca036@gmail.com"
            className="underline underline-offset-2 hover:text-red-300 transition-colors"
          {'>'}
            lazarteluca036@gmail.com
          </a>
        </p>
      )}
    </form>
  );
}