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
  const [busqueda, setBusqueda] = useState('');

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

  const eliminarRegistro = async (id: string) => {
    if (confirm('¿Confirmas que el alumno terminó su atención?')) {
      const { error } = await supabase
        .from('control_atencion')
        .delete()
        .eq('id', id);

      if (!error) {
        setAsistencias(asistencias.filter(item => item.id !== id));
      } else {
        alert('Error al eliminar');
      }
    }
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

  // Filtrado en tiempo real
  const asistenciasFiltradas = asistencias.filter(item => 
    item.nombre_usuario?.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.profesional?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Colores de la marca Studio Endorfitness
  const neonGreen = '#39FF14';
  const darkBackground = '#0a0a0a';
  const cardBackground = '#1b1b1b';

  // 1. PANTALLA DE ACCESO (MODO NEÓN)
  if (!autorizado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: darkBackground, fontFamily: 'sans-serif', padding: '20px' }}>
        <form onSubmit={verificarPin} style={{ textAlign: 'center', padding: '40px', backgroundColor: cardBackground, borderRadius: '24px', border: `1px solid ${neonGreen}`, boxShadow: `0 0 20px ${neonGreen}33`, maxWidth: '400px', width: '100%' }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>🧠</div>
          <h2 style={{ marginBottom: '5px', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: '2px' }}>STUDIO</h2>
          <h3 style={{ marginBottom: '30px', color: neonGreen, fontWeight: 'bold', fontSize: '1.4rem' }}>ENDORFITNESS</h3>
          
          <input 
            type="password" 
            placeholder="Introduce tu PIN"
            value={pinIngresado}
            onChange={(e) => setPinIngresado(e.target.value)}
            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #333', backgroundColor: '#000', color: '#FFFFFF', marginBottom: '20px', width: '100%', fontSize: '18px', textAlign: 'center', outline: 'none' }}
          />
          <button type="submit" style={{ backgroundColor: neonGreen, color: '#000000', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: '800', width: '100%', cursor: 'pointer', fontSize: '16px' }}>
            ACCEDER AL PANEL
          </button>
        </form>
      </div>
    );
  }

  // 2. PANEL DE ADMINISTRACIÓN COMPLETO
  return (
    <div style={{ backgroundColor: darkBackground, minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ maxWidth: '600px', margin: '0 auto 30px auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🧠</span>
          <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '1px', margin: 0, color: '#FFFFFF' }}>
            STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span>
          </h1>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', marginTop: '25px' }}>
           <div style={{ backgroundColor: '#111', color: '#FFFFFF', padding: '10px 20px', borderRadius: '30px', border: '1px solid #333', fontSize: '14px' }}>
             Total Hoy: <span style={{ color: neonGreen, fontWeight: 'bold' }}>{asistencias.length}</span>
           </div>
           <button onClick={obtenerDatos} style={{ backgroundColor: 'transparent', color: neonGreen, border: `1px solid ${neonGreen}`, padding: '10px 20px', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            {cargando ? '...' : 'REFRESCAR'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* BUSCADOR DINÁMICO */}
        <input 
          type="text"
          placeholder="🔍 Buscar por alumno o profesional..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ 
            width: '100%', padding: '15px', marginBottom: '25px', borderRadius: '15px', 
            backgroundColor: '#111', border: '1px solid #333', color: neonGreen, outline: 'none'
          }} 
        />

        {asistenciasFiltradas.length === 0 && !cargando && (
          <p style={{ color: '#555', textAlign: 'center', marginTop: '40px' }}>No hay registros que coincidan.</p>
        )}

        {asistenciasFiltradas.map((item) => (
          <div key={item.id} style={{ 
            backgroundColor: cardBackground, borderRadius: '20px', padding: '20px', marginBottom: '15px', 
            borderLeft: `6px solid ${neonGreen}`, boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '19px', fontWeight: '700', color: '#FFFFFF', textTransform: 'uppercase' }}>
                {item.nombre_usuario}
              </h2>
              <p style={{ margin: '0', color: '#BBBBBB', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: neonGreen, fontSize: '10px' }}>●</span> {item.profesional}
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
                Llegada: {new Date(item.created_at).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            <button 
              onClick={() => eliminarRegistro(item.id)}
              style={{ backgroundColor: '#ff444433', color: '#ff4444', border: '1px solid #ff4444', padding: '8px 12px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
            >
              FIN
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}