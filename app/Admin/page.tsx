 'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import * as XLSX from 'xlsx'; // Importamos la librería de Excel

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboard() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const neonGreen = '#39FF14';
  const darkBackground = '#050505';
  const cardBg = '#111';

  useEffect(() => {
    fetchRegistros();
  }, []);

  async function fetchRegistros() {
    setLoading(true);
    const { data, error } = await supabase
      .from('control_atencion')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setRegistros(data);
    setLoading(false);
  }

  // --- FUNCIÓN PARA EXPORTAR A EXCEL ---
  const exportToExcel = () => {
    // 1. Preparamos los datos para que el Excel tenga títulos limpios
    const datosExcel = registros.map(reg => ({
      'Nombre del Alumno': reg.nombre_usuario,
      'Correo Electrónico': reg.email_usuario,
      'Profesional Asignado': reg.profesional_asignado,
      'Fecha de Ingreso': new Date(reg.created_at).toLocaleString('es-CL'),
    }));

    // 2. Creamos el libro y la hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(datosExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ingresos");

    // 3. Generamos el archivo y disparamos la descarga
    XLSX.writeFile(workbook, `Asistencia_Endorfitness_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <div style={{ backgroundColor: darkBackground, minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase' }}>
              Panel <span style={{ color: neonGreen }}>Staff</span>
            </h1>
            <p style={{ color: '#666' }}>Control de usuarios y atención profesional</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={exportToExcel} 
              style={{ backgroundColor: 'white', color: 'black', padding: '10px 20px', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              📊 EXPORTAR EXCEL
            </button>
            <Link href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '14px', border: '1px solid #333', padding: '10px 20px', borderRadius: '12px' }}>
              VOLVER
            </Link>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: cardBg, padding: '25px', borderRadius: '20px', border: '1px solid #222' }}>
            <p style={{ color: '#666', fontSize: '12px', fontWeight: '800' }}>INGRESOS TOTALES</p>
            <h2 style={{ fontSize: '36px', color: neonGreen }}>{registros.length}</h2>
          </div>
        </div>

        <div style={{ backgroundColor: cardBg, borderRadius: '25px', border: '1px solid #222', overflow: 'hidden' }}>
          <div style={{ padding: '25px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: '800' }}>REGISTROS DE HOY</h3>
            <button onClick={fetchRegistros} style={{ background: 'none', border: 'none', color: neonGreen, cursor: 'pointer', fontSize: '12px' }}>ACTUALIZAR ↻</button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '20px' }}>Usuario</th>
                  <th style={{ padding: '20px' }}>Profesional</th>
                  <th style={{ padding: '20px' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center' }}>Cargando...</td></tr>
                ) : registros.map((reg) => (
                  <tr key={reg.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ padding: '20px', fontWeight: '700' }}>{reg.nombre_usuario}</td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ color: neonGreen }}>{reg.profesional_asignado}</span>
                    </td>
                    <td style={{ padding: '20px', color: '#555', fontSize: '13px' }}>
                      {new Date(reg.created_at).toLocaleString('es-CL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}