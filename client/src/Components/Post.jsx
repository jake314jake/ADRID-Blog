import React from 'react';
import { useQuery } from  '@tanstack/react-query';
import UserAvatar from './UserAvatar';
import axios from 'axios';
import './Post.scss'; // Import the Sass file

const Post = ({ currentUser }) => {
    

    const { data: posts, error, isLoading } = useQuery({
        queryKey: ['posts', currentUser.user.username],
        queryFn: async () => {
            const { data } = await axios.get('/api/post', {
                params: { username: currentUser.user.username }
            });
            return data.post;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='posts-container'>
            {posts && posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className="post-container">
                        <div className='header-container'>
                        <UserAvatar userName={currentUser?currentUser.user.username:null} displayUsername={false}></UserAvatar>
                            <h2>{post.username}</h2>
                            <p>{post.createdAgo}</p>
                        </div>
                        <div className="content-container">
                            <p>{post.content}</p>
                        </div>
                        <div className="image-container">
                            {/* Assuming there is an image field */}
                            <img src={`http://localhost:8800/api/post/image/${post.username}/${post.postid}`} alt="Post" />
                        </div>
                        <div className="reaction-container">
                            {/* Reactions can be added here */}
                        </div>
                    </div>
                ))
            ) : (
                <div>No posts available</div>
            )}
        </div>
    );
};

export default Post;
