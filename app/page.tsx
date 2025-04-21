'use client'

import {useEffect,useState} from'react'
import {supabase}from'@/app/lib/supabase'

import LoginButton from '@/app/components/LoginButton'
import UserInfo from '@/app/components/UserInfo'
import IdeaForm from '@/app/components/IdeaForm'
import IdeaList from '@/app/components/IdeaList'
import Whisper from '@/app/components/Whisper'

type Idea={
  id:string
  title:string
  memo:string
  created_at:string
  tags:string[]
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

  const handleDelete=async(id:string)=>{
    const {error}=await supabase.from('ideas').delete().eq('id',id)
    if(!error){
      fetchIdeas()
    }
  }

  useEffect(()=>{
    fetchIdeas()
  },[])

  const handleUpdate=async(id:string,title:string,memo:string,tags:string[])=>{
    const{error}=await supabase
    .from('ideas')
    .update({title,memo,tags})
    .eq('id',id)

    if(!error){
      fetchIdeas()
    }
  }

  return(
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans p-6">
      <h1 className="text-2xl font-bold mb-4">ひらめこ</h1>
      <UserInfo/>
      <LoginButton/>
      <IdeaForm onPost={fetchIdeas}/>
      <IdeaList ideas={ideas} onDelete={handleDelete} onUpdate={handleUpdate}/>
      <Whisper/>

    </main>
  )
}