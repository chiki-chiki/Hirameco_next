'use client'

import {useEffect,useState} from 'react'
import {supabase}from '@/app/lib/supabase'
import type {User} from '@supabase/supabase-js'

export default function UserInfo(){
    const [user,setUser]=useState<User|null>(null)

    useEffect(()=>{
        supabase.auth.getUser().then(({data:{user}})=>{
            setUser(user)
        })
    },[])
if(!user) return <p>ログインしてね！</p>

return(
    <div>
        <p>こんにちは、{user.email}さん！</p>
        <button onClick={()=>supabase.auth.signOut()}>ログアウト</button>
    </div>
)

}