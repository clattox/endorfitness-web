'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://dtzcyyqgqgfobkagjamh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FUrH2fq8Dj0Vhm6IYWlWsQ_61tt4CDN';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- CONFIGURACIÓN DE SEGURIDAD ---
const PIN_CORRECTO = '2749'; // PIN actualizado solicitado por Claudio

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

  // Pantalla de bloqueo si no se ha ingresado el PIN
  if (!autorizado) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
        <form onSubmit={verificarPin} style={{ textAlign: 'center', padding: '30px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>Acceso Privado</h2>
          <input 
            type="password" 
            placeholder="Ingresa el PIN"
            value={pinIngresado}
            onChange={(e) => setPinIngresado(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '20px', width: '100%', fontSize: '16px', textAlign: 'center' }}
          />
          <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // Panel de administración visible tras el PIN
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ maxWidth: '500px', margin: '0 auto 30px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#1e293b', fontSize: '24px', margin: 0 }}>Academia</h1>
        <button onClick={obtenerDatos} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
          {cargando ? '...' : '🔄 Actualizar'}
        </button>
      </header>

      <main style={{ maxWidth: '500px', margin: '0 auto' }}>
        {asistencias.map((item) => (
          <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #2563eb' }}>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '17px', color: '#0f172a' }}>{item.nombre_usuario}</h2>
            <p style={{ margin: '0', color: '#475569', fontSize: '14px' }}><b>Atención:</b> {item.profesional}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>{new Date(item.created_at).toLocaleString('es-CL')}</p>
          </div>
        ))}
      </main>
    </div>
  );
}