
'use client'
import { supabase } from '@/app/lib/supabase'

export default function LoginButton() {

  const redirectTo=process.env.NODE_ENV==="development"
  ?"http://localhost:3000"
  :"https://hirameco-next.vercel.app";

  console.log(process.env.NODE_ENV);
  console.log(redirectTo);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options:{
        redirectTo
      }
    })
    if (error) console.error(error)
  }

  return <button onClick={handleLogin} className="bg-sky-100 hover:bg-sky-200 text-sky-800 text-sm font-semibold px-3 py-2 rounded-md transition">Googleでログイン</button>
}

