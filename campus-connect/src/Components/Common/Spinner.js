import React from 'react'

export default function Spinner() {
    return (
        <div class="flex justify-center items-center h-screen bg-black">
          <div class="w-16 h-16 rounded-full shadow-md relative animate-rotate-2s-ease-in-infinite bg-orange-500">
            <span class="absolute left-4 bottom-4 bg-white w-4 h-4 rounded-full animate-scale-1s-ease-in-infinite"></span>
            
          </div>
        </div>
    )
}
