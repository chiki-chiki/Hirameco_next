'use client'

import {useState}from 'react'
import{supabase}from'@/app/lib/supabase'

export default function IdeaFrom(){
    const [title,setTitle]=useState('')
    const [memo,setMemo]=useState('')
    const [message,setMessage]=useState('')

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

        const {error}=await supabase.from('ideas').insert({
            title,
            memo,
            user_id:user.id,
        })

        if(error){
            console.error(error)
            setMessage('保存に失敗しました')
        }else{
            setMessage('保存しました')
            setTitle('')
            setMemo('')

            
        }
    }
    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}
            placeholder='タイトル'
            className='border p-2 w-full' />
            <textarea value={memo} onChange={(e)=>setMemo(e.target.value)} placeholder="メモ" className="border p-2 w-full"></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ひらめいた！</button>
            {message && <p>{message}</p>}
        </form>
    )
}