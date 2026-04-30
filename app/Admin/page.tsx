'use client';

import Link from 'next/link';

export default function HomePage() {
  const neonGreen = '#39FF14';
  const darkBackground = '#050505';

  return (
    <div style={{ backgroundColor: darkBackground, minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* --- NAVEGACIÓN --- */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🧠</span>
          <span style={{ fontWeight: '800', letterSpacing: '1px' }}>STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span></span>
        </div>
        <Link href="/Admin" style={{ color: neonGreen, textDecoration: 'none', fontSize: '14px', fontWeight: '600', border: `1px solid ${neonGreen}`, padding: '8px 16px', borderRadius: '20px' }}>
          ACCESO STAFF
        </Link>
      </nav>

      {/* --- SECCIÓN HERO (IMPACTO) --- */}
      <section style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        padding: '0 20px',
        background: `radial-gradient(circle at center, ${neonGreen}11 0%, transparent 70%)` 
      }}>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '900', lineHeight: '1', marginBottom: '20px', textTransform: 'uppercase' }}>
          Potencia tu <span style={{ color: neonGreen, textShadow: `0 0 20px ${neonGreen}66` }}>Mente</span><br/>
          Entrena tu Cuerpo
        </h1>
        <p style={{ color: '#888', maxWidth: '600px', fontSize: '18px', marginBottom: '40px' }}>
          El primer studio en Cañete que integra ciencia y movimiento para llevar tu rendimiento al siguiente nivel.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/registro" style={{ 
            backgroundColor: neonGreen, 
            color: 'black', 
            padding: '18px 35px', 
            borderRadius: '40px', 
            fontWeight: '800', 
            textDecoration: 'none',
            fontSize: '18px',
            boxShadow: `0 10px 30px ${neonGreen}44`
          }}>
            REGISTRAR ASISTENCIA
          </Link>
          <a href="https://www.instagram.com/endorfitnesscanete/" target="_blank" style={{ 
            backgroundColor: 'transparent', 
            color: 'white', 
            padding: '18px 35px', 
            borderRadius: '40px', 
            fontWeight: '800', 
            textDecoration: 'none',
            fontSize: '18px',
            border: '2px solid white'
          }}>
            VER INSTAGRAM
          </a>
        </div>
      </section>

      {/* --- SECCIÓN DE VALORES (ESTILO INSTAGRAM) --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div style={{ padding: '40px', backgroundColor: '#111', borderRadius: '30px', border: '1px solid #222' }}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>⚡</div>
          <h3 style={{ color: neonGreen, marginBottom: '15px' }}>ALTO RENDIMIENTO</h3>
          <p style={{ color: '#aaa' }}>Programas diseñados para maximizar tus capacidades físicas mediante el control metabólico y mental.</p>
        </div>
        <div style={{ padding: '40px', backgroundColor: '#111', borderRadius: '30px', border: '1px solid #222' }}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>👥</div>
          <h3 style={{ color: neonGreen, marginBottom: '15px' }}>STAFF EXPERTO</h3>
          <p style={{ color: '#aaa' }}>Atención personalizada con profesionales dedicados a guiar cada paso de tu entrenamiento.</p>
        </div>
        <div style={{ padding: '40px', backgroundColor: '#111', borderRadius: '30px', border: '1px solid #222' }}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>📍</div>
          <h3 style={{ color: neonGreen, marginBottom: '15px' }}>UBICACIÓN</h3>
          <p style={{ color: '#aaa' }}>En el corazón de Cañete, un espacio equipado con tecnología de punta para tu bienestar.</p>
        </div>
      </section>

    </div>
  );
}