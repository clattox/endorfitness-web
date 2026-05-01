 'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const neonGreen = '#39FF14';
  const darkBackground = '#050505';
  const cardBg = '#111';

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
    <div style={{ backgroundColor: darkBackground, minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fadeIn 0.8s ease-out; }
        .hero-overlay { background: linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.9) 100%); }
        .outline-text { -webkit-text-stroke: 1px ${neonGreen}; color: transparent; }
        .pill-whatsapp { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .pill-whatsapp:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4); }
      `}} />

      {/* --- NAVEGACIÓN --- */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🧠</span>
          <span style={{ fontWeight: '800' }}>STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span></span>
        </div>
        <Link href="/Admin" style={{ color: neonGreen, textDecoration: 'none', fontSize: '12px', fontWeight: '600', border: `1px solid ${neonGreen}44`, padding: '8px 16px', borderRadius: '20px' }}>
          ACCESO STAFF
        </Link>
      </nav>

      {/* --- HERO --- */}
      <header style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url("/Images/gym-local.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px' }} className="animate-fade">
          {!showForm ? (
            <>
              <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1', marginBottom: '20px' }}>
                Potencia tu <span style={{ color: neonGreen }}>Mente</span><br/>Entrena tu Cuerpo
              </h1>
              <button onClick={() => setShowForm(true)} style={{ backgroundColor: neonGreen, color: 'black', padding: '18px 35px', borderRadius: '40px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                REGISTRAR ASISTENCIA
              </button>
            </>
          ) : (
            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #222', textAlign: 'left', margin: '0 auto' }}>
              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '30px', textTransform: 'uppercase' }}>Confirmar <span style={{ color: neonGreen }}>Ingreso</span></h2>
                  <input name="nombre" required placeholder="tu nombre" style={{ width: '100%', backgroundColor: '#000', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: 'white', marginBottom: '15px', outline: 'none' }} />
                  <input name="email" type="email" required placeholder="alumno@endorfitness.cl" style={{ width: '100%', backgroundColor: '#000', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: 'white', marginBottom: '25px', outline: 'none' }} />
                  <button disabled={loading} style={{ width: '100%', backgroundColor: neonGreen, color: 'black', padding: '18px', borderRadius: '15px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'SINCRONIZANDO...' : 'CONFIRMAR INGRESO'}
                  </button>
                  <p onClick={() => setShowForm(false)} style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>VOLVER ATRÁS</p>
                </form>
              ) : (
                <div style={{ textAlign: 'center' }}><h3>¡REGISTRO EXITOSO!</h3><p style={{ color: neonGreen }}>Dalo todo en la clase 💪🏻</p></div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* --- NUEVA SECCIÓN: MÁS QUE UN STUDIO (Casillas) --- */}
      <section style={{ padding: '80px 20px', backgroundColor: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px' }}>
            MÁS QUE UN <span style={{ color: neonGreen }}>STUDIO</span>
          </h2>
          <p style={{ color: '#888', maxWidth: '700px', margin: '0 auto 60px' }}>
            Aquí no solo entrenas, aquí te transformas. **Endorfitness** es un espacio creado para quienes buscan resultados reales, con un ambiente profesional y enfocado en el bienestar integral.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              { icon: '🤍', title: 'TU ESPACIO SEGURO', text: 'Entrena con confianza y enfoque. Un ambiente diseñado para que te sientas cómoda y respetada en cada sesión.' },
              { icon: '📅', title: 'GESTIÓN INTELIGENTE', text: 'Tu cupo está asegurado. Gracias a nuestro sistema de registro, optimizamos los horarios para evitar aglomeraciones.' },
              { icon: '✨', title: 'COMUNIDAD ACTIVA', text: 'No entrenas sola. Únete a un grupo que te motiva, te inspira y celebra cada uno de tus progresos diarios.' },
              { icon: '📋', title: 'PLANES GUIADOS', text: 'Entrena con propósito. Contamos con programas adaptados a tu capacidad y objetivos, guiados por expertos paso a paso.' }
            ].map((box, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>{box.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: 'white' }}>{box.title}</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{box.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PLANES --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
        <h2 className="outline-text" style={{ textAlign: 'center', fontSize: '50px', fontWeight: '900', marginBottom: '60px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          PLANES PRESENCIALES
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {[
            { img: '/Images/gym-local2.jpeg', title: 'ENTRENAMIENTO GRUPAL', text: 'Entrena con rutinas planificadas mensualmente acompañada de personas con tu misma energía.' },
            { img: '/Images/gym-local3.jpeg', title: 'ENTRENAMIENTO PERSONALIZADO', text: 'Un plan 100% diseñado para tus metas y tu ritmo, con atención exclusiva de un profesional.' },
            { img: '/Images/gym-local6.jpeg', title: 'KICKBOXING STUDIO', text: 'Clases y personalizados los martes y jueves a las 18:00. ¡Ven a liberar toda tu energía!' }
          ].map((plan, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <img src={plan.img} alt={plan.title} style={{ width: '100%', borderRadius: '30px', height: '400px', objectFit: 'cover', marginBottom: '25px' }} />
              <h3 style={{ color: neonGreen, fontSize: '28px', fontWeight: '900', marginBottom: '15px', lineHeight: '1.1' }}>{plan.title}</h3>
              <p style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.6' }}>{plan.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BOTÓN WHATSAPP RENOVADO --- */}
      <a 
        href="https://wa.me/56966862346" 
        target="_blank" 
        className="pill-whatsapp"
        style={{ 
          position: 'fixed', 
          bottom: '30px', 
          right: '30px', 
          backgroundColor: '#25D366', 
          padding: '12px 24px',
          borderRadius: '50px',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '12px',
          textDecoration: 'none', 
          zIndex: 100, 
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
          color: 'white',
          fontWeight: '700'
        }}
      >
        <span style={{ fontSize: '24px' }}>💬</span>
        <span style={{ fontSize: '15px' }}>¿Cómo puedo ayudarte?</span>
      </a>

    </div>
  );
}