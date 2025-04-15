'use client'

import LoginButton from '@/app/components/LoginButton'
import UserInfo from '@/app/components/UserInfo'

export default function Home(){
  return(
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ひらめこ</h1>
      <UserInfo/>
      <LoginButton/>
    </main>
  )
}