'use client'
import {useState}from 'react'
// import {useEffect,useState}from 'react'
// import {supabase} from '@/app/lib/supabase'
// import {User,PostgrestSingleResponse}from'@supabase/supabase-js'

type Idea={
    id:string
    title:string
    memo:string
    created_at:string
    tags:string[]
}

    type Props={
        ideas:Idea[]
        onDelete:(id:string)=>void
        onUpdate:(id:string,title:string,memo:string,tags:string[])=>void
    }


export default function IdeaList({ideas,onDelete,onUpdate}:Props){
    const[editingId,setEditingId]=useState<string|null>(null)
    const[editTitle,setEditTitle]=useState('')
    const[editMemo,setEditMemo]=useState('')
    const[editTagsInput,setEditTagsInput]=useState('')
    const[searchTag,setSearchTag]=useState('')

    const startEdit=(idea:Idea)=>{
        setEditingId(idea.id)
        setEditTitle(idea.title)
        setEditMemo(idea.memo)
        setEditTagsInput(idea.tags.join(','))
    }

    const cancelEdit=()=>{
        setEditingId(null)
        setEditTitle('')
        setEditMemo('')
    }

    const submitEdit=(id:string)=>{
        onUpdate(id,editTitle,editMemo,editTagsInput.split(',').map(tag=>tag.trim()).filter(tag=>tag!==''))
        cancelEdit()
    }

    const filteredIdeas=ideas.filter(idea=>
        idea.tags.some(tag=>tag.includes(searchTag))
    );

    return(
        <div className="space-y-4 mt-6">
            <input type="text" placeholder='タグ検索' value={searchTag} onChange={(e)=>setSearchTag(e.target.value)}className="bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full" />
            {filteredIdeas.map((idea)=>(
                <div key={idea.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4 hover:shadow-md transition">
                    {editingId===idea.id?(
                        <>
                        <input value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} className="bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full" />
                        <textarea value={editMemo} onChange={(e)=>setEditMemo(e.target.value)} className='bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full'/>
                            <input type="text" value={editTagsInput} onChange={(e)=>setEditTagsInput(e.target.value)} placeholder='タグ（カンマ区切り）' className='bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full' />
                        <button onClick={()=>submitEdit(idea.id)} className='bg-green-100 hover:bg-green-200 text-green-800 font-semibold px-4 py-2 rounded-lg transition'>保存</button>
                        <button onClick={cancelEdit} className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition'>キャンセル</button>
                        </>
                    ):(
                        <>

                    <h2 className="text-lg font-bold">{idea.title}</h2>
                    <p>{idea.memo}</p>
                    {idea.tags&&idea.tags.length>0&&(
                        <div className='mt-2 flex flex-wrap gap-2'>
                            {idea.tags.map((tag,idx)=>(
                                <span key={idx} className='text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full'>#{tag}</span>
                            ))}

                        </div>

                    )}
                    <p className='text-sm text-gray-500'>{idea.created_at}</p>
                    <button onClick={()=>startEdit(idea)} className='bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold px-4 py-2 rounded-lg transition'>編集</button>
                    <button onClick={()=>{
                        if(confirm('本当に削除しますか？')){
                            onDelete(idea.id)
                    }}}className='bg-red-100 hover:bg-red-200 text-red-800 font-semibold px-4 py-2 rounded-lg transition'>削除</button>
                    </>
                    )}
                </div>
            ))}
        </div>
    )
}
