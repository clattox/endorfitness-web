"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Validación de variables de entorno
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData(event.currentTarget);

      const nombre = formData.get("nombre") as string;
      const email = formData.get("email") as string;
      const profesional = formData.get("profesional") as string;

      // ✅ Validaciones básicas
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
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md bg-neutral-900 border border-orange-500 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-black italic text-orange-500 text-center mb-6">
          ENDORFITNESS
        </h1>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="nombre"
              placeholder="Nombre completo"
              required
              className="w-full bg-black p-4 rounded-lg border border-neutral-800 outline-none focus:border-orange-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full bg-black p-4 rounded-lg border border-neutral-800 outline-none focus:border-orange-500"
            />

            <select
              name="profesional"
              className="w-full bg-black p-4 rounded-lg border border-neutral-800 outline-none focus:border-orange-500"
            >
              <option value="Cata">Cata</option>
              <option value="Andrés">Andrés</option>
              <option value="Moti">Moti</option>
            </select>

            {/* 🔴 Mensaje de error visible */}
            {errorMsg && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg text-sm">
                {errorMsg}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-orange-600 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-orange-500 transition-all disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Confirmar Ingreso"}
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <span className="text-5xl">✅</span>
            <h2 className="text-xl font-bold mt-4 text-orange-500">
              ¡REGISTRO EXITOSO!
            </h2>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-sm text-neutral-400 underline"
            >
              Volver a registrar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}