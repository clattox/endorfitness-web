"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Credenciales de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  const neonGreen = '#39FF14';

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
    setErrorMsg("");

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
    } catch (err: any) {
      setErrorMsg("Error al registrar asistencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Fondo con degradado radial */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)] z-0"></div>
      
      {/* Navegación */}
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">
            STUDIO <span style={{ color: neonGreen }}>ENDORFITNESS</span>
          </h1>
        </div>
        <button 
          onClick={() => window.location.href='/Admin'}
          className="text-[10px] font-bold border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest"
        >
          Acceso Staff
        </button>
      </nav>

      {/* Contenido Principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        {!showForm ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">
              POTENCIA TU <span style={{ color: neonGreen }}>MENTE</span><br />
              ENTRENA TU CUERPO
            </h2>
            <p className="text-neutral-500 text-sm md:text-lg max-w-2xl mx-auto mb-10 tracking-wide uppercase font-medium">
              El primer studio en Cañete que integra ciencia y movimiento para llevar tu rendimiento al siguiente nivel.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-[#39FF14] text-black px-10 py-5 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_10px_30px_rgba(57,255,20,0.3)]"
              >
                REGISTRAR ASISTENCIA
              </button>
              <a 
                href="https://www.instagram.com/endorfitness_/" 
                target="_blank"
                className="bg-transparent border border-white/20 px-10 py-5 rounded-full font-black uppercase tracking-tighter hover:bg-white hover:text-black transition-all flex items-center justify-center no-underline"
              >
                VER INSTAGRAM
              </a>
            </div>
          </div>
        ) : (
          /* Formulario de Registro */
          <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl p-8 rounded-[40px] border border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-300">
            {!sent ? (
              <form onSubmit={handleSubmit} className="text-left space-y-5">
                <h3 className="text-2xl font-black uppercase italic mb-6">Confirmar <span style={{ color: neonGreen }}>Ingreso</span></h3>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-1">Nombre Alumno</label>
                  <input name="nombre" required placeholder="Nombre completo" className="w-full bg-black/50 p-4 mt-1 rounded-2xl border border-neutral-800 outline-none focus:border-[#39FF14] transition-all text-white" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase ml-1">Email</label>
                  <input name="email" type="email" required placeholder="tu@email.com" className="w-full bg-black/50 p-4 mt-1 rounded-2xl border border-neutral-800 outline-none focus:border-[#39FF14] transition-all text-white" />
                </div>
                <button disabled={loading} className="w-full bg-[#39FF14] text-black py-5 rounded-2xl font-black uppercase tracking-tighter mt-4 disabled:opacity-50 transition-all hover:bg-white">
                  {loading ? "Sincronizando..." : "CONFIRMAR"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="w-full text-xs text-neutral-500 uppercase font-bold tracking-widest mt-4 hover:text-white border-none bg-transparent cursor-pointer">
                  Volver
                </button>
              </form>
            ) : (
              <div className="py-10 text-center animate-in fade-in duration-500">
                <span className="text-6xl block mb-4">✅</span>
                <h3 className="text-2xl font-black uppercase italic">¡Ingreso Exitoso!</h3>
                <p className="text-[#39FF14] text-sm font-bold mt-2 italic tracking-widest">Dalo todo en la clase 💪🏻</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botón WhatsApp Flotante */}
      <a 
        href="https://wa.me/56966862346" 
        target="_blank" 
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center text-white text-2xl no-underline"
      >
        💬
      </a>
    </main>
  );
}