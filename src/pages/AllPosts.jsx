import React, { useEffect, useState } from 'react'
import databaseManager from '../services/databaseManager'
import { useNavigate } from 'react-router-dom'
import { Container, PostCard } from '../components'
function AllPosts() {
    const [posts, setPosts]  = useState([])
    useEffect(() => {
      databaseManager.getAllPost([])
      .then((posts) => 
          posts && setPosts(posts.documents)
      ).catch().finally();
    },[]);

   
  return (
    <div className='py-8 bg-gray-50'>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {posts && posts.map((post) => (
            <div key={post.$id} className='bg-white rounded-lg shadow-md overflow-hidden'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts