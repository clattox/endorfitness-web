'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://dtzcyyqgqgfobkagjamh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FUrH2fq8Dj0Vhm6IYWlWsQ_61tt4CDN';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- CONFIGURACIÓN DE SEGURIDAD ---
const PIN_CORRECTO = '2749'; 

export default function AdminPanel() {
  const [asistencias, setAsistencias] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const [pinIngresado, setPinIngresado] = useState('');

  const obtenerDatos = async () => {
    setCargando(true);
    const { data, error } = await supabase
      .from('control_atencion')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAsistencias(data);
    }
    setCargando(false);
  };

  const verificarPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinIngresado === PIN_CORRECTO) {
      setAutorizado(true);
      obtenerDatos();
    } else {
      alert('PIN Incorrecto');
    }
  };

  // --- ESTILOS REUTILIZABLES ---
  const neonGreen = '#39FF14';
  const darkBackground = '#0a0a0a';
  const cardBackground = '#161616';

  // 1. PANTALLA DE ACCESO (LOGIN NEON)
  if (!autorizado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: darkBackground, fontFamily: 'sans-serif', padding: '20px' }}>
        <form onSubmit={verificarPin} style={{ textAlign: 'center', padding: '40px', backgroundColor: cardBackground, borderRadius: '24px', border: `1px solid ${neonGreen}`, boxShadow: `0 0 20px ${neonGreen}33`, maxWidth: '400px', width: '100%' }}>
          {/* Espacio para el logo del cerebro */}
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🧠</div>
          <h2 style={{ marginBottom: '10px', color: 'white', fontWeight: 'bold', letterSpacing: '2px' }}>STUDIO</h2>
          <h3 style={{ marginBottom: '30px', color: neonGreen, fontWeight: 'bold', fontSize: '1.2rem' }}>ENDORFITNESS</h3>
          
          <input 
            type="password" 
            placeholder="Introduce tu PIN"
            value={pinIngresado}
            onChange={(e) => setPinIngresado(e.target.value)}
            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#000', color: neonGreen, marginBottom: '20px', width: '100%', fontSize: '18px', textAlign: 'center', outline: 'none' }}
          />
          <button type="submit" style={{ backgroundColor: neonGreen, color: 'black', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold', width: '100%', cursor: 'pointer', fontSize: '16px', transition: 'all 0.3s' }}>
            ACCEDER AL PANEL
          </button>
        </form>
      </div>
    );
  }

  // 2. PANEL DE ADMINISTRACIÓN (INTERFAZ INDUSTRIAL)
  return (
    <div style={{ backgroundColor: darkBackground, minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, sans-serif', color: 'white' }}>
      <header style={{ maxWidth: '600px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ color: neonGreen, fontSize: '24px' }}>🧠</span>
          <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '1px', margin: 0 }}>STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span></h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', marginTop: '20px' }}>
           <div style={{ backgroundColor: '#111', padding: '10px 20px', borderRadius: '30px', border: '1px solid #333', fontSize: '14px' }}>
             Total Hoy: <span style={{ color: neonGreen, fontWeight: 'bold' }}>{asistencias.length}</span>
           </div>
           <button onClick={obtenerDatos} style={{ backgroundColor: 'transparent', color: neonGreen, border: `1px solid ${neonGreen}`, padding: '10px 20px', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            {cargando ? 'Cargando...' : 'REFRESCAR'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        {asistencias.map((item) => (
          <div key={item.id} style={{ 
            backgroundColor: cardBackground, 
            borderRadius: '20px', 
            padding: '20px', 
            marginBottom: '15px', 
            borderLeft: `5px solid ${neonGreen}`,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '700', color: 'white', textTransform: 'uppercase' }}>
                  {item.nombre_usuario}
                </h2>
                <p style={{ margin: '0', color: '#888', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: neonGreen }}>●</span> {item.profesional}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <p style={{ margin: '0', fontSize: '14px', color: neonGreen, fontWeight: 'mono' }}>
                   {new Date(item.created_at).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                 </p>
                 <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#555' }}>
                   {new Date(item.created_at).toLocaleDateString('es-CL')}
                 </p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}