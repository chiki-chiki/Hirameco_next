
'use client'

import { useEffect,useState } from 'react';
import { supabase } from '@/app/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const [user,setUser]=useState<User|null>(null)
  const router=useRouter()

  // useEffect(()=>{
  //   const fetchUser=async()=>{
  //     const{data:{user}}=await supabase.auth.getUser()
  //     setUser(user)
  //   }
  //   fetchUser()
  // },[])
  const fetchUser=async()=>{
    const{data:{user}}=await supabase.auth.getUser()
    setUser(user)
  }
  useEffect(()=>{
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
    setTimeout(() => {
      fetchUser()
      //setUser(null)
      router.push(redirectTo)
      
    }, 1000);
    router.refresh()
  }

  return <button onClick={user?handleLogout:handleLogin} className="bg-sky-100 hover:bg-sky-200 text-sky-800 text-sm font-semibold px-3 py-2 rounded-md transition">
    {user?'ログアウト':'Googleでログイン'}</button>
}

