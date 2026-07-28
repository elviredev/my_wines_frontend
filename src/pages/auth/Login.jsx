// @ts-nocheck
import { useState } from "react";
import { Wine } from "lucide-react";

import { TextInput, Checkbox, Button } from "@/components";

export default function Login() {
   const [form, setForm] = useState({
      email: "",
      password: "",
      remember: false,
   });

   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value, checked, type } = e.target;

      setForm((prev) => ({
         ...prev,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);
      setErrors({});

      try {
         // appel API ici

         console.log(form);

      } catch (error) {

         setErrors({
            general: "Adresse e-mail ou mot de passe incorrect."
         });

      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden app-background px-4 sm:px-6">

         {/* Décoration */}

         <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-rose-900/20 blur-3xl" />
         <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-amber-700/10 blur-3xl" />

         <div className="w-full max-w-md">

            <div className="rounded-3xl border border-rose-900/25 bg-stone-900/50 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/30 ring-1 ring-white/5">

               <div className="mb-10 text-center">

                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-rose-900/40 bg-stone-950/70">

                     <Wine
                        className="h-10 w-10 text-rose-200"
                        strokeWidth={1.5}
                     />

                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-stone-200">
                     Le verre & le Bouchon
                  </h1>

                  <p className="mt-3 text-stone-400">
                     Connectez-vous pour accéder à votre collection.
                  </p>

               </div>

               <form
                  onSubmit={handleSubmit}
                  className="space-y-6 text-stone-400"
               >

                  <TextInput
                     label="Adresse e-mail"
                     name="email"
                     type="email"
                     labelClassName="text-stone-300"
                     value={form.email}
                     onChange={handleChange}
                     required
                     error={errors.email}
                  />

                  <TextInput
                     label="Mot de passe"
                     name="password"
                     type="password"
                     labelClassName="text-stone-300"
                     value={form.password}
                     onChange={handleChange}
                     required
                     error={errors.password}
                  />

                  <Checkbox
                     name="remember"
                     label="Se souvenir de moi"
                     checked={form.remember}
                     onChange={handleChange}
                  />

                  {errors.general && (
                     <div className="rounded-xl border border-red-800/40 bg-red-900/20 p-3 text-sm text-red-300">
                        {errors.general}
                     </div>
                  )}

                  <div className="flex justify-end">
                  <Button
                     type="submit"
                     className="w-full"
                     disabled={loading}
                  >
                     {loading
                        ? "Connexion..."
                        : "Se connecter"}
                  </Button>
                  </div>

               </form>

            </div>

         </div>

      </div>
   );
}