"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan variables de entorno de Supabase");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const neonGreen = '#39FF14';

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => setSent(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData(event.currentTarget);
      const nombre = formData.get("nombre") as string;
      const email = formData.get("email") as string;
      const profesional = formData.get("profesional") as string;

      if (!nombre || !email) {
        throw new Error("Faltan campos obligatorios");
      }

      const { error } = await supabase
        .from("control_atencion")
        .insert([
          {
            nombre_usuario: nombre,
            email_usuario: email,
            profesional_asignado: profesional,
          },
        ]);

      if (error) {
        console.error("SUPABASE ERROR:", error);
        throw error;
      }

      setSent(true);
    } catch (err: any) {
      console.error("ERROR GENERAL:", err);
      setErrorMsg(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#39FF14] selection:text-black relative">
      <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">
        
        {/* LADO IZQUIERDO: DASHBOARD DE INFORMACIÓN */}
        <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center relative">
          
          <div className="mb-10 z-10">
             <span className="text-5xl mb-4 block">🧠</span>
             <h1 className="text-5xl font-black italic tracking-tighter uppercase">
               STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span>
             </h1>
             <p className="text-lg text-neutral-400 mt-2 font-medium tracking-wide">
               VEN POR TU MEJOR VERSIÓN 💪🏻
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
            
            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-800 hover:border-[#39FF14]/50 transition-colors group">
              <h3 className="text-[#39FF14] font-bold uppercase tracking-widest mb-2 text-xs flex items-center gap-2">
                <span className="text-lg">📅</span> HORARIOS
              </h3>
              <p className="text-white text-sm font-semibold mb-3">Lunes, Miércoles y Viernes</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#111] border border-neutral-800 px-3 py-1 rounded-md text-xs font-bold group-hover:border-[#39FF14]/30 transition-colors">06:00 AM</span>
                <span className="bg-[#111] border border-neutral-800 px-3 py-1 rounded-md text-xs font-bold group-hover:border-[#39FF14]/30 transition-colors">10:00 AM</span>
              </div>
            </div>

            {/* Cuadro de Ubicación Simplificado (Sin el texto de WhatsApp) */}
            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-800 hover:border-[#39FF14]/50 transition-colors flex flex-col justify-center">
              <div>
                <h3 className="text-[#39FF14] font-bold uppercase tracking-widest mb-2 text-xs flex items-center gap-2">
                  <span className="text-lg">📍</span> UBICACIÓN
                </h3>
                <p className="text-white text-sm font-semibold">Serrano, Cañete</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-800 hover:border-[#39FF14]/50 transition-colors sm:col-span-2 flex items-center justify-between overflow-hidden relative">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#39FF14] blur-[80px] opacity-10"></div>
              <div>
                <p className="text-[#39FF14] font-black text-lg italic uppercase tracking-tighter">¡CUPOS LIMITADOS!</p>
                <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest">Asegura tu lugar en las clases</p>
              </div>
              <span className="text-4xl animate-pulse">🔥</span>
            </div>

          </div>
        </div>

        {/* LADO DERECHO: PANEL DE REGISTRO */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md p-8 rounded-3xl border border-neutral-800 bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">
            
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="mb-8 border-b border-neutral-900 pb-4">
                  <h2 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse"></div>
                    REGISTRO DE INGRESO
                  </h2>
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-1 tracking-wider">Nombre Completo</label>
                  <input name="nombre" required placeholder="Ej: Claudio Torres" className="w-full bg-[#111] p-4 mt-1 rounded-xl border border-neutral-800 outline-none focus:border-[#39FF14] transition-all text-white placeholder-neutral-700 text-sm" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-1 tracking-wider">Correo Electrónico</label>
                  <input name="email" type="email" required placeholder="tu@email.com" className="w-full bg-[#111] p-4 mt-1 rounded-xl border border-neutral-800 outline-none focus:border-[#39FF14] transition-all text-white placeholder-neutral-700 text-sm" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-1 tracking-wider">Staff Profesional</label>
                  <select name="profesional" className="w-full bg-[#111] p-4 mt-1 rounded-xl border border-neutral-800 outline-none focus:border-[#39FF14] appearance-none text-white cursor-pointer text-sm">
                    <option value="Cata">Cata</option>
                  </select>
                </div>

                {errorMsg && (
                  <div className="bg-red-950/50 border border-red-500/50 text-red-400 p-3 rounded-xl text-xs text-center font-bold">
                    {errorMsg}
                  </div>
                )}

                <button disabled={loading} className="w-full bg-[#39FF14] text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white active:scale-95 transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)] disabled:opacity-50 disabled:hover:bg-[#39FF14] mt-4 text-sm">
                  {loading ? "PROCESANDO..." : "CONFIRMAR ASISTENCIA"}
                </button>
              </form>
            ) : (
              <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#39FF14]/30 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                  <span className="text-4xl">✅</span>
                </div>
                <h2 className="text-2xl font-black italic uppercase text-white tracking-widest">
                  INGRESO <span style={{ color: neonGreen }}>CONFIRMADO</span>
                </h2>
                <p className="text-neutral-500 mt-2 text-sm uppercase tracking-widest">Dalo todo en la clase</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* BOTÓN FLOTANTE WHATSAPP (Añadido) */}
      <a 
        href="https://wa.me/56966862346?text=Hola!%20Me%20gustaría%20saber%20más%20sobre%20los%20planes%20y%20horarios%20de%20Endorfitness." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.056 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>

    </main>
  );
}