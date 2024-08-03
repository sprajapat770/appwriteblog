import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseManager from "../services/databaseManager";
import StorageServices from "../services/storageManager";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseManager.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseManager.deletePost(post.$id).then((status) => {
            if (status) {
                StorageServices.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-50">
            <Container>
                <div className="relative w-full flex justify-center mb-6 border border-gray-200 rounded-xl overflow-hidden">
                <img
                    src={StorageServices.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-auto object-cover rounded-xl"
                />
                {isAuthor && (
                    <div className="absolute top-4 right-4 flex space-x-2">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="text-white hover:bg-green-600">
                        Edit
                        </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost} className="text-white hover:bg-red-600">
                        Delete
                    </Button>
                    </div>
                )}
                </div>
                <div className="w-full mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                </div>
                <div className="prose lg:prose-xl max-w-none">
                {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}