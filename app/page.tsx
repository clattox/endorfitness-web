"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Variables de entorno (Igual que en tu versión funcional)
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

  // Temporizador para resetear la pantalla de éxito
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

      // ✅ BLOQUE DE BASE DE DATOS EXACTAMENTE IGUAL AL TUYO
      const { error } = await supabase
        .from("control_atencion")
        .insert([
          {
            nombre_usuario: nombre,
            email_usuario: email,
            profesional_asignado: profesional, // <- Columna correcta respetada
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
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LADO IZQUIERDO: INFORMACIÓN Y PROMOS */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-[radial-gradient(circle_at_top_left,_#39FF1415_0%,_transparent_50%)] relative">
          <div className="mb-10 z-10">
             <span className="text-6xl mb-4 block">🧠</span>
             <h1 className="text-5xl lg:text-6xl font-black italic tracking-tighter uppercase">
               STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span>
             </h1>
             <p className="text-xl text-neutral-400 mt-4 font-medium italic">
               "Ven por tu mejor versión 💪🏻"
             </p>
          </div>

          <div className="space-y-6 z-10">
            {/* Tarjeta de Horarios */}
            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 shadow-xl backdrop-blur-sm">
              <h3 className="text-[#39FF14] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="text-2xl">📅</span> Horarios Disponibles
              </h3>
              <p className="text-white text-lg font-semibold">Lunes, Miércoles y Viernes</p>
              <div className="flex gap-4 mt-4">
                <span className="bg-black border border-neutral-700 px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(57,255,20,0.1)]">06:00 AM</span>
                <span className="bg-black border border-neutral-700 px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(57,255,20,0.1)]">10:00 AM</span>
              </div>
            </div>

            {/* Tarjeta de Cupos */}
            <div className="bg-[#39FF14]/10 p-6 rounded-2xl border border-[#39FF14]/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-pulse">🔥</span>
                <div>
                  <p className="text-[#39FF14] font-black text-xl italic uppercase tracking-tighter">¡Cupos Limitados!</p>
                  <p className="text-neutral-300 text-sm mt-1">Asegura tu lugar y comienza el cambio.</p>
                </div>
              </div>
            </div>

{/* Contacto */}
            <div className="pt-4 flex flex-col gap-3 text-neutral-400 text-sm font-medium">
              <p className="flex items-center gap-2"><span className="text-xl">📍</span> Serrano, Cañete</p>
              
              {/* Botón de WhatsApp */}
              <a 
                href="https://wa.me/56966862346?text=Hola!%20Me%20gustaría%20saber%20más%20sobre%20los%20planes%20y%20horarios%20de%20Endorfitness." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#39FF14] transition-colors w-fit"
              >
                <span className="text-xl">💬</span> 
                <span className="underline underline-offset-4 decoration-neutral-700 hover:decoration-[#39FF14]">
                  Escríbenos al +569 66862346
                </span>
              </a>
            </div>
        {/* LADO DERECHO: FORMULARIO DE REGISTRO */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 bg-neutral-950 border-l border-neutral-900">
          <div className="w-full max-w-md p-8 rounded-3xl border border-neutral-800 bg-[#0a0a0a] shadow-2xl relative overflow-hidden">
            
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-widest text-white">
                    Registro de <span style={{ color: neonGreen }}>Ingreso</span>
                  </h2>
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-[#39FF14] uppercase ml-1 tracking-wider">Nombre Completo</label>
                  <input name="nombre" required placeholder="Ej: Claudio Torres" className="w-full bg-black p-4 mt-1 rounded-xl border border-neutral-800 outline-none focus:border-[#39FF14] transition-all text-white placeholder-neutral-600" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#39FF14] uppercase ml-1 tracking-wider">Email</label>
                  <input name="email" type="email" required placeholder="tu@email.com" className="w-full bg-black p-4 mt-1 rounded-xl border border-neutral-800 outline-none focus:border-[#39FF14] transition-all text-white placeholder-neutral-600" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#39FF14] uppercase ml-1 tracking-wider">Profesional Asignado</label>
                  <select name="profesional" className="w-full bg-black p-4 mt-1 rounded-xl border border-neutral-800 outline-none focus:border-[#39FF14] appearance-none text-white cursor-pointer">
                    <option value="Cata">Cata</option>
                  </select>
                </div>

                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-xs text-center font-bold">
                    {errorMsg}
                  </div>
                )}

                <button disabled={loading} className="w-full bg-[#39FF14] text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] disabled:opacity-50 disabled:hover:scale-100 mt-2">
                  {loading ? "Sincronizando..." : "Confirmar Ingreso"}
                </button>
              </form>
            ) : (
              <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#39FF14]/30 shadow-[0_0_30px_rgba(57,255,20,0.2)]">
                  <span className="text-5xl">✅</span>
                </div>
                <h2 className="text-3xl font-black italic uppercase text-white">
                  ¡Registro <span style={{ color: neonGreen }}>Exitoso!</span>
                </h2>
                <p className="text-neutral-400 mt-3 font-medium">Dalo todo en el entrenamiento 💪🏻</p>
                <button onClick={() => setSent(false)} className="mt-8 text-xs text-neutral-500 uppercase tracking-widest hover:text-[#39FF14] transition-colors">
                  Nuevo Registro
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}