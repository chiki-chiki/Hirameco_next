'use client'

import {useState} from'react'

export default function Whisper(){
    const [title,setTitle]=useState<string|null>(null)

    const fetchRandomArticle=async()=>{
        const res=await fetch(
            'https://ja.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&origin=*'
        )
        const data =await res.json()
        const randomTitle=data.query.random[0].title
        setTitle(randomTitle)

    }

    return(
        <div className="p-4 bg-gray-50 rounded shadow mt-6 text-center">
            <h2 className="text-lg font-bold mb-4">ささやき(wikipedia)</h2>

            {title?(
                <a href={`https://ja.wikipedia.org/wiki/${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className='text-blue-600 hover:underline block mb-4'>
                    {title}
                </a>
            ):(
              <p className='text-gray-500 mb-4'>まだささやきがないよ </p>  
            )}
            <button onClick={fetchRandomArticle}
            className='px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition'>
                ささやきを聴く
            </button>
        </div>
    )
}