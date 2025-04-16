'use client'

import {useEffect,useState}from 'react'
import {supabase} from '@/app/lib/supabase'
import {User,PostgrestSingleResponse}from'@supabase/supabase-js'

type Idea={
    id:string
    title:string
    memo:string
    created_at:string}

    type Props={
        ideas:Idea[]
        onDelete:(id:string)=>void
        onUpdate:(id:string,title:string,memo:string)=>void
    }


export default function IdeaList({ideas,onDelete,onUpdate}:Props){
    const[editingId,setEditingId]=useState<string|null>(null)
    const[editTitle,setEditTitle]=useState('')
    const[editMemo,setEditMemo]=useState('')

    const startEdit=(idea:Idea)=>{
        setEditingId(idea.id)
        setEditTitle(idea.title)
        setEditMemo(idea.memo)
    }

    const cancelEdit=()=>{
        setEditingId(null)
        setEditTitle('')
        setEditMemo('')
    }

    const submitEdit=(id:string)=>{
        onUpdate(id,editTitle,editMemo)
        cancelEdit()
    }

    return(
        <div className="space-y-4 mt-6">
            {ideas.map((idea)=>(
                <div key={idea.id} className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition">
                    {editingId===idea.id?(
                        <>
                        <input value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} className="w-full border mb-2 p-1" />
                        <textarea value={editMemo} onChange={(e)=>setEditMemo(e.target.value)} className='w-full border p-1'/>
                        <button onClick={()=>submitEdit(idea.id)} className='text-blue-500 mr-2'>保存</button>
                        <button onClick={cancelEdit} className='text-gray-500'>キャンセル</button>
                        </>
                    ):(
                        <>

                    <h2 className="text-lg font-bold">{idea.title}</h2>
                    <p>{idea.memo}</p>
                    <p className='text-sm text-gray-500'>{idea.created_at}</p>
                    <button onClick={()=>startEdit(idea)} className='text-green-500 mr-2'>編集</button>
                    <button onClick={()=>{
                        if(confirm('本当に削除しますか？')){
                            onDelete(idea.id)
                    }}}className='mt-2 text-sm text-red-500 hover;underline'>削除</button>
                    </>
                    )}
                </div>
            ))}
        </div>
    )
}
