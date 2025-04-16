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
    }


export default function IdeaList({ideas}:Props){
    // const [ideas,setIdeas]=useState<Idea[]>([])
    // const [user,setUser]=useState<User|null>(null)

    // useEffect(()=>{
    //     const fetchIdeas=async()=>{
    //         const{
    //             data:{user},
    //             error:userError,
    //         }=await supabase.auth.getUser()

    //         if(userError||!user)return

    //         setUser(user)

    //         const {data,error}:PostgrestSingleResponse<Idea[]>=await supabase
    //         .from('ideas')
    //         .select('*')
    //         .eq('user_id',user.id)
    //         .order('created_at',{ascending:true})

    //         if(error){
    //             console.error('取得失敗:',error)

    //         }else{
    //             setIdeas(data)
    //         }
    //     }
    //     fetchIdeas()
    // },[])

    // if(!user) return <p>ログインしてね！</p>

    return(
        <div className="space-y-4 mt-6">
            {ideas.map((idea)=>(
                <div key={idea.id} className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition">
                    <h2 className="text-lg font-bold">{idea.title}</h2>
                    <p>{idea.memo}</p>
                    <p className='text-sm text-gray-500'>{idea.created_at}</p>
                </div>
            ))}
        </div>
    )
}
