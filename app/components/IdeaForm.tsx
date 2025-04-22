'use client'

import {useState}from 'react'
import{supabase}from'@/app/lib/supabase'

type Props={
    onPost:()=>void
}

export default function IdeaForm({onPost}:Props){
    const [title,setTitle]=useState('')
    const [memo,setMemo]=useState('')
    const [message,setMessage]=useState('')
    const[tagsInput,setTagsInput]=useState('')

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()

        
        const{
            data:{user},
            error:userError,
        }=await supabase.auth.getUser()
        
        if(userError||!user){
            setMessage('ログインしてね！')
            return
        }
        
        const tags=tagsInput.split(',').map(tag=>tag.trim()).filter(tag=>tag !=='')
        const {error}=await supabase.from('ideas').insert({
            title,
            memo,
            user_id:user.id,
            tags,
        })

        if(error){
            console.error(error)
            setMessage('保存に失敗しました')
        }else{
            setMessage('保存しました')
            setTitle('')
            setMemo('')
            setTagsInput('')
            onPost()

            
        }
    }
    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}
            placeholder='アイデアのタイトル'
            className="bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full" />
            <textarea value={memo} onChange={(e)=>setMemo(e.target.value)} placeholder="メモ" className="bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full"></textarea>
            <input type="text" value={tagsInput} onChange={(e)=>setTagsInput(e.target.value)}
            placeholder='タグ（カンマ区切りで複数可）'
            className="bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full" />

            <button type="submit" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-simibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition">ひらめいた！</button>
            {message && <p>{message}</p>}
        </form>
    )
}