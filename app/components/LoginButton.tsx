
'use client'

import { useEffect,useState } from 'react';
import { supabase } from '@/app/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function LoginButton() {
  const [user,setUser]=useState<User|null>(null)

  useEffect(()=>{
    const fetchUser=async()=>{
      const{data:{user}}=await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  },[])

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

  const handleLogout=async()=>{
    await supabase.auth.signOut()
    setUser(null)
  }

  return <button onClick={user?handleLogout:handleLogin} className="bg-sky-100 hover:bg-sky-200 text-sky-800 text-sm font-semibold px-3 py-2 rounded-md transition">
    {user?'ログアウト':'Googleでログイン'}</button>
}

