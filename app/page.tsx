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

      {/* --- SECCIÓN HERO CON IMAGEN REAL --- */}
      <header style={{ 
        height: '85vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'url("/Images/gym-local.jpeg")', // Imagen principal
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px' }} className="animate-fade">
          {!showForm ? (
            <>
              <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1', marginBottom: '20px' }}>
                Potencia tu <span style={{ color: neonGreen, textShadow: `0 0 20px ${neonGreen}66` }}>Mente</span><br/>
                Entrena tu Cuerpo
              </h1>
              <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto 40px', fontSize: '18px' }}>
                El primer studio en Cañete que integra entrenamiento inteligente para llevar tu rendimiento al siguiente nivel.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => setShowForm(true)} style={{ backgroundColor: neonGreen, color: 'black', padding: '18px 35px', borderRadius: '40px', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                  REGISTRAR ASISTENCIA
                </button>
                <a href="https://www.instagram.com/endorfitness_/" target="_blank" style={{ color: 'white', padding: '18px 35px', borderRadius: '40px', border: '2px solid white', textDecoration: 'none', fontWeight: '800' }}>
                  📸 SIGUENOS EN INSTAGRAM
                </a>
              </div>
            </>
          ) : (
            /* FORMULARIO DE REGISTRO */
            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #222', textAlign: 'left', margin: '0 auto' }}>
              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '30px', textTransform: 'uppercase' }}>Confirmar <span style={{ color: neonGreen }}>Ingreso</span></h2>
                  <input name="nombre" required placeholder="tu nombre" style={{ width: '100%', backgroundColor: '#000', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: 'white', marginBottom: '15px', outline: 'none' }} />
                  <input name="email" type="email" required placeholder="alumno@endorfitness.cl" style={{ width: '100%', backgroundColor: '#000', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: 'white', marginBottom: '25px', outline: 'none' }} />
                  <button disabled={loading} style={{ width: '100%', backgroundColor: neonGreen, color: 'black', padding: '18px', borderRadius: '15px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'SINCRONIZANDO...' : 'CONFIRMAR INGRESO'}
                  </button>
                  <p onClick={() => setShowForm(false)} style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666', cursor: 'pointer' }}>VOLVER ATRÁS</p>
                </form>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
                  <h3>¡REGISTRO EXITOSO!</h3>
                  <p style={{ color: neonGreen, marginTop: '10px' }}>Dalo todo en la clase 💪🏻</p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* --- GALERÍA DE IMÁGENES --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '4px', color: neonGreen }}>Nuestro Studio</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <img src="/Images/gym-local2.jpeg" alt="Endorfitness 2" style={{ width: '100%', borderRadius: '20px', height: '250px', objectFit: 'cover', border: '1px solid #222' }} />
          <img src="/Images/gym-local3.jpeg" alt="Endorfitness 3" style={{ width: '100%', borderRadius: '20px', height: '250px', objectFit: 'cover', border: '1px solid #222' }} />
          <img src="/Images/gym-local4.jpeg" alt="Endorfitness 4" style={{ width: '100%', borderRadius: '20px', height: '250px', objectFit: 'cover', border: '1px solid #222' }} />
          <img src="/Images/gym-local5.jpeg" alt="Endorfitness 5" style={{ width: '100%', borderRadius: '20px', height: '250px', objectFit: 'cover', border: '1px solid #222' }} />
        </div>
      </section>

      {/* --- BOTÓN WHATSAPP --- */}
      <a href="https://wa.me/56966862346" target="_blank" style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#25D366', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', zIndex: 100, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
        <span style={{ fontSize: '30px' }}>💬</span>
      </a>

    </div>
  );
}