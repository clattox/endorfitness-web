'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
const SUPABASE_URL = 'https://dtzcyyqgqgfobkagjamh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FUrH2fq8Dj0Vhm6IYWlWsQ_61tt4CDN';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function AdminPanel() {
  const [asistencias, setAsistencias] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // Función para obtener los registros de la tabla control_atencion
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

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <header style={{ 
        maxWidth: '500px', 
        margin: '0 auto 30px auto', 
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: '#1e293b', fontSize: '24px', margin: 0 }}>Academia</h1>
        <button 
          onClick={obtenerDatos}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '10px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {cargando ? 'Cargando...' : '🔄 Actualizar'}
        </button>
      </header>

      <main style={{ maxWidth: '500px', margin: '0 auto' }}>
        {asistencias.length === 0 && !cargando && (
          <p style={{ textAlign: 'center', color: '#64748b' }}>No hay registros disponibles.</p>
        )}

        {asistencias.map((item) => (
          <div key={item.id} style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #2563eb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '17px', color: '#0f172a', textTransform: 'capitalize' }}>
                  {item.nombre_usuario || 'Usuario'}
                </h2>
                <p style={{ margin: '0', color: '#475569', fontSize: '14px' }}>
                  <span style={{ color: '#64748b' }}>Atención:</span> {item.profesional || 'General'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  backgroundColor: '#f1f5f9', 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '12px', 
                  fontWeight: '600',
                  color: '#475569' 
                }}>
                  {new Date(item.created_at).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#94a3b8' }}>
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