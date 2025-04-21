'use client'

import {useState} from'react'

export default function Whisper(){
    const [titles,setTitles]=useState<string[]>([])

    const fetchRandomArticles=async()=>{
        const res=await fetch(
            'https://ja.wikipedia.org/w/api.php?action=query&list=random&rnlimit=3&format=json&origin=*'
        )
        const data =await res.json()
        const randomTitles=data.query.random.map((item:{title:string})=>item.title)
        setTitles(randomTitles)

    }

    return(
        <div className="p-4 bg-gray-50 rounded shadow mt-6 text-center">
            <h2 className="text-lg font-bold mb-4">ささやき(wikipedia)</h2>

            {titles.length>0?(
                <ul className='space-y-2 mb-4'>
                    {titles.map((title,idx)=>(
                        <li key={idx}>
                            <a href={`https://ja.wikipedia.org/wiki/${encodeURIComponent(title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-blue-600 hover:underline '>
                                {title}
                            </a>

                        </li>
                    ))}
                </ul>
            ):(
              <p className='text-gray-500 mb-4'>まだささやきがないよ </p>  
            )}
            <button onClick={fetchRandomArticles}
            className='bg-sky-100 hover:bg-sky-200 text-sky-800 font-semibold px-4 py-2 rounded-lg transition'>
                ささやきを聴く
            </button>
        </div>
    )
}