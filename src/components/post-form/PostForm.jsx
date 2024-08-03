import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Select, Input, RTE } from '../index'
import authServices from '../../services/authManager'
import storageManager from '../../services/storageManager'
import databaseManager from '../../services/databaseManager'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || '',
            // featuredImage: post?.featuredImage || '',
            // userId: post?.userId || '',
        }
    })


    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const submit = async(data) => {
        if(post) {
            const file =  data.images[0] ? await storageManager.uploadFile(data.images[0]) : null
            if(file) {
                await storageManager.deleteFile(post.featuredImage)
            }
  
            const dbPost = await databaseManager.updatePost(post.$id, {...data, featuredImage: file ? file.$id : null})
            dbPost && navigate(`/post/${dbPost.$id}`)
        } else {    
            const file =  data.image[0] ? await storageManager.uploadFile(data.image[0]) : null
            const dbPost = await databaseManager.createPost({...data, featuredImage: file ? file.$id : null, userId: userData.$id})
            dbPost && navigate(`/post/${dbPost.$id}`)
        }
    }

    const slugTransform = useCallback((value) => {  
        return value && typeof value == 'string' ? value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') : '';
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if( name === 'title' ) {
                setValue('slug', slugTransform(value.title,
                    {shouldValidate: true}
                ))
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white shadow-md rounded-lg p-4">
            <div className="w-full md:w-2/3 px-2">
                <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
                />
                <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
                />
                {post && (
                <div className="w-full mb-4">
                    <img
                    src={storageManager.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                    />
                </div>
                )}
                <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full text-white font-bold py-2 rounded-lg">
                {post ? "Update" : "Submit"}
                </Button>
            </div>
            </form>

    );
}

export default PostForm