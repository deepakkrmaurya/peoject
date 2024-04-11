import React from 'react'

const page = ({params}:any) => {
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-600'>
      <h1>profile page</h1>
      <h1 className=' p-3 bg-green-500 rounded text-black'>{params.id}</h1>
    </div>
  )
}

export default page
