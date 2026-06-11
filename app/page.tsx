 'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setSent(false);
        setShowForm(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const { error } = await supabase.from("control_atencion").insert([
        {
          nombre_usuario: formData.get("nombre"),
          email_usuario: formData.get("email"),
          profesional_asignado: "Cata",
        },
      ]);
      if (error) throw error;
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary" style={{ minHeight: '100vh', fontFamily: 'system-ui, sans-serif', position: 'relative', overflowX: 'hidden' }}>

      {/* --- NAVEGACIÓN --- */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🧠</span>
          <span style={{ fontWeight: '800' }}>STUDIO <span className="text-brand">ENDORFITNESS</span></span>
        </div>
      </nav>

      {/* --- HERO --- */}
      <header style={{ minHeight: '100svh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url("/Images/gym-local.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '80px 20px' }} className="animate-fade">
          {!showForm ? (
            <>
              <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1', marginBottom: '20px' }}>
                Potencia tu <span className="text-brand">Mente</span><br/>Entrena tu Cuerpo
              </h1>
              <button onClick={() => setShowForm(true)} style={{ backgroundColor: 'var(--color-brand)', color: 'black', padding: '18px 35px', borderRadius: '40px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                REGISTRAR ASISTENCIA
              </button>
            </>
          ) : (
            <div className="bg-surface" style={{ width: '100%', maxWidth: '400px', padding: '40px', borderRadius: '30px', border: '1px solid var(--border-subtle)', textAlign: 'left', margin: '0 auto' }}>
              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '30px', textTransform: 'uppercase' }}>Confirmar <span className="text-brand">Ingreso</span></h2>
                  <input name="nombre" required placeholder="tu nombre" className="bg-input" style={{ width: '100%', border: '1px solid var(--border-input)', padding: '15px', borderRadius: '15px', color: 'white', marginBottom: '15px', outline: 'none' }} />
                  <input name="email" type="email" required placeholder="alumno@endorfitness.cl" className="bg-input" style={{ width: '100%', border: '1px solid var(--border-input)', padding: '15px', borderRadius: '15px', color: 'white', marginBottom: '25px', outline: 'none' }} />
                  <button disabled={loading} style={{ width: '100%', backgroundColor: 'var(--color-brand)', color: 'black', padding: '18px', borderRadius: '15px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'SINCRONIZANDO...' : 'CONFIRMAR INGRESO'}
                  </button>
                  <p onClick={() => setShowForm(false)} style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}>VOLVER ATRÁS</p>
                </form>
              ) : (
                <div style={{ textAlign: 'center' }}><h3>¡REGISTRO EXITOSO!</h3><p className="text-brand">Dalo todo en la clase 💪🏻</p></div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* --- SECCIÓN: MÁS QUE UN STUDIO (Iconos) --- */}
      <section className="bg-secondary" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '60px' }}>
            MÁS QUE UN <span className="text-brand">STUDIO</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              { icon: '🤍', title: 'ESPACIO SEGURO', text: 'Entrena sin presiones en un ambiente diseñado para tu comodidad y respeto.' },
              { icon: '📅', title: 'SISTEMA DE HORARIOS', text: 'Cupos asegurados mediante nuestro sistema flexible de registro inteligente.' },
              { icon: '✨', title: 'COMUNIDAD', text: 'No entrenas sola, te integras a un grupo que celebra cada uno de tus avances.' },
              { icon: '📋', title: 'PLANIFICACIÓN', text: 'Entrena con propósito bajo la guía de profesionales en cada paso.' }
            ].map((box, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>{box.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '15px', color: 'white' }}>{box.title}</h3>
                <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>{box.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PLANES --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
        <h2 className="modern-title">
          PLANES<br/>PRESENCIALES
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {[
            { img: '/Images/gym-local2.jpeg', title: 'ENTRENAMIENTO GRUPAL', text: 'Entrena con rutinas planificadas mensualmente acompañada de personas con tu misma energía.' },
            { img: '/Images/gym-local3.jpeg', title: 'ENTRENAMIENTO PERSONALIZADO', text: 'Un plan 100% diseñado para tus metas y tu ritmo, con atención exclusiva de un profesional.' },
            { img: '/Images/gym-local6.jpeg', title: 'KICKBOXING STUDIO', text: 'Clases y personalizados los martes y jueves a las 18:00. ¡Ven a liberar toda tu energía!' }
          ].map((plan, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <img src={plan.img} alt={plan.title} style={{ width: '100%', borderRadius: '30px', height: '400px', objectFit: 'cover', marginBottom: '25px' }} />
              <h3 className="text-brand" style={{ fontSize: '28px', fontWeight: '900', marginBottom: '15px', lineHeight: '1.1' }}>{plan.title}</h3>
              <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '1.6' }}>{plan.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- RECONSTRUCCIÓN DE CASILLAS ORIGINALES --- */}
      <section className="bg-tertiary" style={{ padding: '80px 20px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { icon: '⚡', title: 'ALTO RENDIMIENTO', text: 'Programas diseñados para maximizar tus capacidades físicas mediante el control metabólico.' },
            { icon: '👥', title: 'STAFF EXPERTO', text: 'Atención personalizada con profesionales dedicados a guiar cada paso de tu entrenamiento.' },
            { icon: '📍', title: 'ESTAMOS EN CAÑETE', text: 'Un espacio equipado con tecnología de punta para tu bienestar físico y mental.' }
          ].map((item, i) => (
            <div key={i} className="bg-card" style={{ padding: '40px', borderRadius: '30px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '30px', marginBottom: '15px' }}>{item.icon}</div>
              <h3 className="text-brand" style={{ marginBottom: '10px', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase' }}>{item.title}</h3>
              <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BOTÓN WHATSAPP --- */}
      <a 
        href="https://wa.me/56966862346" 
        target="_blank" 
        className="pill-whatsapp"
        style={{ 
          position: 'fixed', bottom: '30px', right: '30px', backgroundColor: 'var(--color-whatsapp)', 
          padding: '12px 24px', borderRadius: '50px', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', gap: '12px', textDecoration: 'none', zIndex: 100, 
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)', color: 'white', fontWeight: '700' 
        }}
      >
        <span style={{ fontSize: '24px' }}>💬</span>
        <span style={{ fontSize: '15px' }}>¿Cómo puedo ayudarte?</span>
      </a>

    </div>
  );
}