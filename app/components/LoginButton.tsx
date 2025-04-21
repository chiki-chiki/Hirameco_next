
'use client'
import { supabase } from '@/app/lib/supabase'

export default function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options:{
        redirectTo:'https://hirameco-next.vercel.app'
      }
    })
    if (error) console.error(error)
  }

  return <button onClick={handleLogin} className="bg-sky-100 hover:bg-sky-200 text-sky-800 font-semibold px-4 py-2 rounded-lg transition">Googleでログイン</button>
}

