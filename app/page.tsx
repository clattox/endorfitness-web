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
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 3C10 3 7 6 7 10c0 3 2 5 3 6l-1 8h10l-1-8c1-1 3-3 3-6 0-4-3-7-7-7z"/>
            <path d="M10 14c2 1 4 1 4 1s2 0 4-1"/>
            <path d="M12 8v3"/>
            <path d="M16 8v3"/>
          </svg>
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
                  <button disabled={loading} style={{ width: '100%', backgroundColor: 'var(--color-brand)', color: 'black', padding: '18px', borderRadius: '15px', fontWeight: '800', border: 'none', cursor: 'pointer', minHeight: '54px' }}>
                    {loading ? 'SINCRONIZANDO...' : 'CONFIRMAR INGRESO'}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{ display: 'block', width: '100%', marginTop: '15px', padding: '12px 0', fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', minHeight: '44px', textAlign: 'center' }}>VOLVER ATRÁS</button>
                </form>
              ) : (
                <div style={{ textAlign: 'center' }}><h3>¡REGISTRO EXITOSO!</h3><p className="text-brand">Dalo todo en la clase 💪🏻</p></div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* --- SECCIÓN: MÁS QUE UN STUDIO (valores en grid vertical) --- */}
      <section className="bg-secondary" style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '70px', maxWidth: '600px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-brand)', letterSpacing: '3px', textTransform: 'uppercase' }}>NUESTRO ENFOQUE</span>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1', marginTop: '15px' }}>
              MÁS QUE UN <span className="text-brand">STUDIO</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 6C16 6 11 11 11 17c0 5 3 8 5 10l-2 12h16l-2-12c2-2 5-5 5-10 0-6-5-11-11-11z"/>
                    <path d="M16 24c3 2 6 2 6 2s3 0 6-2"/>
                    <path d="M18 14v4"/>
                    <path d="M26 14v4"/>
                  </svg>
                ), title: 'ESPACIO SEGURO', text: 'Entrena sin presiones en un ambiente diseñado para tu comodidad y respeto.' 
              },
              { 
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="8" width="32" height="28" rx="3"/>
                    <line x1="6" y1="16" x2="38" y2="16"/>
                    <line x1="16" y1="8" x2="16" y2="36"/>
                    <line x1="28" y1="8" x2="28" y2="36"/>
                    <line x1="6" y1="24" x2="38" y2="24"/>
                    <line x1="6" y1="32" x2="38" y2="32"/>
                  </svg>
                ), title: 'SISTEMA DE HORARIOS', text: 'Cupos asegurados mediante nuestro sistema flexible de registro inteligente.' 
              },
              { 
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="22" cy="22" r="16"/>
                    <path d="M14 22c2 4 6 6 8 6s6-2 8-6"/>
                    <path d="M18 18v2"/>
                    <path d="M26 18v2"/>
                  </svg>
                ), title: 'COMUNIDAD', text: 'No entrenas sola, te integras a un grupo que celebra cada uno de tus avances.' 
              },
              { 
                icon: (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8h20l4 6v22a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V14l4-6z"/>
                    <path d="M8 14h28"/>
                    <path d="M18 20h8v12h-8z"/>
                    <path d="M18 20l-2-6"/>
                    <path d="M26 20l2-6"/>
                  </svg>
                ), title: 'PLANIFICACIÓN', text: 'Entrena con propósito bajo la guía de profesionales en cada paso.' 
              }
            ].map((box, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{box.icon}</div>
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

      {/* --- SECCIÓN: POR QUÉ ELEGIRNOS (cards horizontales) --- */}
      <section className="bg-tertiary" style={{ padding: '100px 20px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1' }}>
              POR QUÉ <span className="text-brand">ELEGIRNOS</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { 
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 4C13 4 8 9 8 16c0 6 3 9 5 11l-1 9h16l-1-9c2-2 5-5 5-11 0-7-5-12-12-12z"/>
                    <path d="M14 23c2 2 6 2 6 2s4 0 6-2"/>
                    <path d="M16 14v4"/>
                    <path d="M24 14v4"/>
                    <path d="M11 30l3-3"/>
                    <path d="M29 30l-3-3"/>
                  </svg>
                ), title: 'ALTO RENDIMIENTO', text: 'Programas diseñados para maximizar tus capacidades físicas mediante el control metabólico.' 
              },
              { 
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="15" cy="13" r="5"/>
                    <circle cx="25" cy="13" r="5"/>
                    <path d="M8 32c0-5 3-9 7-9h10c4 0 7 4 7 9"/>
                    <path d="M20 23v5"/>
                    <path d="M17 26h6"/>
                  </svg>
                ), title: 'STAFF EXPERTO', text: 'Atención personalizada con profesionales dedicados a guiar cada paso de tu entrenamiento.' 
              },
              { 
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 4C13 4 6 11 6 18c0 10 14 18 14 18s14-8 14-18c0-7-7-14-14-14z"/>
                    <circle cx="20" cy="18" r="5"/>
                    <path d="M20 13v-2"/>
                    <path d="M20 23v-2"/>
                  </svg>
                ), title: 'ESTAMOS EN CAÑETE', text: 'Un espacio equipado con tecnología de punta para tu bienestar físico y mental.' 
              }
            ].map((item, i) => (
              <div key={i} className="bg-card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '28px 32px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="text-brand" style={{ marginBottom: '6px', fontSize: '15px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.title}</h3>
                  <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 1-13 8l-4 1 1-4A9 9 0 1 1 21 12z"/>
          <path d="M9 10h6"/>
          <path d="M9 14h4"/>
        </svg>
        <span style={{ fontSize: '15px' }}>¿Cómo puedo ayudarte?</span>
      </a>

    </div>
  );
}