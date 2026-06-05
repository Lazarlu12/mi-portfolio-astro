import { useState } from 'react';

// ─── TIPOS ────────────────────────────────────────────────────────────
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

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────
// ✅ Reemplazá TU_FORM_ID con el ID que te dio Formspree (ej: "xpzgkwqr")
// El ID NO es secreto: es público por diseño. No necesitás .env para esto.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgkgnpg';

// ─── COMPONENTE ───────────────────────────────────────────────────────
export default function ContactForm() {
  const [form, setForm]       = useState<FormData>({ nombre: '', email: '', mensaje: '' });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [status, setStatus]   = useState<FormStatus>('idle');

  // Honeypot anti-spam: campo oculto para humanos.
  // Los bots lo llenan automáticamente → Formspree descarta el envío.
  const [honeypot, setHoneypot] = useState('');

  // ── Validación ──────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.nombre.trim())
      newErrors.nombre = 'El nombre es requerido';

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

  // ── Handler de inputs ───────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // UX: limpia el error apenas el usuario empieza a corregir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // le pedimos JSON de vuelta → errores descriptivos
        },
        body: JSON.stringify({
          nombre:  form.nombre,
          email:   form.email,
          mensaje: form.mensaje,
          _gotcha: honeypot,   // Formspree usa este campo para detectar bots
        }),
      });

      if (!res.ok) {
        // Formspree devuelve errores detallados: cuota excedida, email inválido, etc.
        const data = await res.json();
        throw new Error(data?.errors?.[0]?.message ?? 'Error en el servidor');
      }

      setStatus('success');
      setForm({ nombre: '', email: '', mensaje: '' }); // limpiamos el form al éxito

    } catch (err) {
      console.error('[ContactForm] Error al enviar:', err);
      setStatus('error');
    }
  };

  // ── JSX ─────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-5">

      {/*
        HONEYPOT: display:none lo hace invisible para humanos.
        Los bots rastrean el DOM y llenan todos los inputs → Formspree los filtra.
        tabIndex={-1} y autoComplete="off" previenen interacción accidental.
      */}
      <input
        type="text"
        name="_gotcha"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* ── Nombre ───────────────────────────────────────── */}
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

      {/* ── Email ─────────────────────────────────────────── */}
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

      {/* ── Mensaje ───────────────────────────────────────── */}
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

      {/* ── Botón ─────────────────────────────────────────── */}
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

      {/* ── Feedback ──────────────────────────────────────── */}
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