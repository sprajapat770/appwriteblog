import React, {useState, useEffect} from 'react'
import databaseManager from '../services/databaseManager'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(slug) {
            databaseManager.getPost(slug) 
            .then((post) => {
                post && setPost(post.documents);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            navigate('/');
        }
        
    }, [slug, navigate]);


  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null;
}

export default EditPost