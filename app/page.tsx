'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Configuración de Supabase
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
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fade { animation: fadeIn 1s ease-out; }
        .animate-scale { animation: scaleIn 0.3s ease-out; }
      `}} />

      {/* --- NAVEGACIÓN --- */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🧠</span>
          <span style={{ fontWeight: '800', letterSpacing: '1px' }}>STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span></span>
        </div>
        <Link href="/Admin" style={{ color: neonGreen, textDecoration: 'none', fontSize: '12px', fontWeight: '600', border: `1px solid ${neonGreen}44`, padding: '8px 16px', borderRadius: '20px', textTransform: 'uppercase' }}>
          ACCESO STAFF
        </Link>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px', background: `radial-gradient(circle at center, ${neonGreen}08 0%, transparent 70%)` }}>
        
        {!showForm ? (
          <div className="animate-fade">
            <h1 style={{ fontSize: 'clamp(32px, 8vw, 80px)', fontWeight: '900', lineHeight: '1', marginBottom: '20px', textTransform: 'uppercase' }}>
              Potencia tu <span style={{ color: neonGreen, textShadow: `0 0 20px ${neonGreen}44` }}>Mente</span><br/>
              Entrena tu Cuerpo
            </h1>
            <p style={{ color: '#888', maxWidth: '600px', fontSize: '18px', marginBottom: '40px', margin: '0 auto 40px auto' }}>
              El primer studio en Cañete que integra entrenamiento inteligente para llevar tu rendimiento al siguiente nivel.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setShowForm(true)} style={{ backgroundColor: neonGreen, color: 'black', padding: '18px 35px', borderRadius: '40px', fontWeight: '800', border: 'none', fontSize: '18px', cursor: 'pointer', boxShadow: `0 10px 30px ${neonGreen}33` }}>
                REGISTRAR ASISTENCIA
              </button>
              <a href="https://www.instagram.com/endorfitness_/" target="_blank" style={{ 
                backgroundColor: 'transparent', color: 'white', padding: '18px 35px', borderRadius: '40px', fontWeight: '800', textDecoration: 'none', fontSize: '18px', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '10px' 
              }}>
                📸 SIGUENOS EN INSTAGRAM
              </a>
            </div>
          </div>
        ) : (
          <div className="animate-scale" style={{ width: '100%', maxWidth: '400px', backgroundColor: cardBg, padding: '40px', borderRadius: '30px', border: '1px solid #222', textAlign: 'left' }}>
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '30px', textTransform: 'uppercase' }}>
                  Confirmar <span style={{ color: neonGreen }}>Ingreso</span>
                </h2>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '10px', color: '#666', fontWeight: '800', textTransform: 'uppercase', marginLeft: '5px' }}>Nombre Completo</label>
                  <input name="nombre" required placeholder="tu nombre" style={{ width: '100%', backgroundColor: '#000', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: 'white', marginTop: '5px', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <label style={{ fontSize: '10px', color: '#666', fontWeight: '800', textTransform: 'uppercase', marginLeft: '5px' }}>Correo Electrónico</label>
                  <input name="email" type="email" required placeholder="alumno@endorfitness.cl" style={{ width: '100%', backgroundColor: '#000', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: 'white', marginTop: '5px', outline: 'none' }} />
                </div>
                <button disabled={loading} style={{ width: '100%', backgroundColor: neonGreen, color: 'black', padding: '18px', borderRadius: '15px', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                  {loading ? 'SINCRONIZANDO...' : 'CONFIRMAR INGRESO'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ width: '100%', background: 'none', border: 'none', color: '#555', marginTop: '15px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase' }}>
                  Volver atrás
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
                <h2 style={{ fontWeight: '900', textTransform: 'uppercase' }}>¡Registro Exitoso!</h2>
                <p style={{ color: neonGreen, fontWeight: '700', marginTop: '10px' }}>Dalo todo en la clase 💪🏻</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- SECCIÓN DE VALORES --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {[
          { icon: '⚡', title: 'ALTO RENDIMIENTO', text: 'Programas diseñados para maximizar tus capacidades físicas mediante el control metabólico.' },
          { icon: '👥', title: 'STAFF EXPERTO', text: 'Atención personalizada con profesionales dedicados a guiar cada paso de tu entrenamiento.' },
          { icon: '📍', title: 'UBICACIÓN', text: 'Estamos en Cañete con un espacio equipado con tecnología para tu bienestar físico.' }
        ].map((item, i) => (
          <div key={i} style={{ padding: '40px', backgroundColor: '#0a0a0a', borderRadius: '30px', border: '1px solid #1a1a1a' }}>
            <div style={{ fontSize: '30px', marginBottom: '15px' }}>{item.icon}</div>
            <h3 style={{ color: neonGreen, marginBottom: '10px', fontSize: '14px', fontWeight: '800' }}>{item.title}</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{item.text}</p>
          </div>
        ))}
      </section>

      {/* --- BOTÓN WHATSAPP --- */}
      <a href="https://wa.me/56966862346" target="_blank" style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#25D366', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', zIndex: 100 }}>
        <span style={{ fontSize: '30px' }}>💬</span>
      </a>

    </div>
  );
}