// 'use client'

// import {supabase} from '@/app/lib/supabase'

// export default function LoginButton(){
//     const handleLogin=async()=>{
//         // await supabase.auth.signInWithOAuth({
//         //     provider:'your@email.com',
//         // })
//         await supabase.auth.signInWithOtp({
//             email: 'your@email.com',
//           })
//     }
//     return(
//         <button onClick={handleLogin}>Googleでログイン</button>
//     )
// }
'use client'
import { supabase } from '@/app/lib/supabase'

export default function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: 'basabasausausa@gmail.com',
    })
    if (error) console.error(error)
    else alert('メールを送信しました！チェックしてね📬')
  }

  return <button onClick={handleLogin}>メールでログイン</button>
}

