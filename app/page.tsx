'use client'

import {useEffect,useState} from'react'
import {supabase}from'@/app/lib/supabase'

import LoginButton from '@/app/components/LoginButton'
import UserInfo from '@/app/components/UserInfo'
import IdeaForm from '@/app/components/IdeaForm'
import IdeaList from '@/app/components/IdeaList'

type Idea={
  id:string
  title:string
  memo:string
  created_at:string
}

export default function Home(){
  const[ideas,setIdeas]=useState<Idea[]>([])
  const fetchIdeas=async()=>{
    const{
      data:{user},
    }=await supabase.auth.getUser()
    if(!user)return
    const {data,error}=await supabase
    .from('ideas')
    .select('*')
    .eq('user_id',user.id)
    .order('created_at',{ascending:false})

    if(!error&&data){
      setIdeas(data)
    }
  }

  useEffect(()=>{
    fetchIdeas()
  },[])

  return(
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ひらめこ</h1>
      <UserInfo/>
      <LoginButton/>
      <IdeaForm onPost={fetchIdeas}/>
      <IdeaList ideas={ideas}/>
    </main>
  )
}