import React from 'react'
import StorageServices from '../services/storageManager'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className='block'>
      <div className='w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
        <div className='w-full mb-4'>
          <img 
            src={StorageServices.getFilePreview(featuredImage)} 
            alt={title} 
            className='w-full h-48 object-cover rounded-t-xl' 
          />
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold text-gray-800 truncate'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard