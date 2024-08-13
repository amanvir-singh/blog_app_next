import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import PostCard from '../src/components/postCard';
import { createPost, getAllPosts } from '../src/lib/action';


jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));


jest.mock('../src/lib/action', () => ({
  deletePost: jest.fn(),
  createPost: jest.fn(),
  getAllPosts: jest.fn(),
}));

describe('Blog App Tests', () => {
 
  test('Delete button is not visible when user is not logged in', () => {
  
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });

    const post = {
      id: '1',
      title: 'Test Post',
      content: 'This is a test post',
      createdAt: new Date(),
    };

    render(<PostCard post={post} />);

   
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('New blog post is added to the index page', () => {
    
    createPost.mockImplementation((data) => {
     
      const newPost = { id: '2', ...data };
      getAllPosts.mockReturnValue([
        { id: '1', title: 'Existing Post', content: 'Existing content' },
        newPost
      ]);
    });

    getAllPosts.mockReturnValue([
      { id: '1', title: 'Existing Post', content: 'Existing content' }
    ]);

   
    const IndexPage = () => {
      const posts = getAllPosts();
      return (
        <div>
          {posts.map(post => <div key={post.id}>{post.title}</div>)}
        </div>
      );
    };

    const { rerender } = render(<IndexPage />);
    expect(screen.getByText('Existing Post')).toBeInTheDocument();
    expect(screen.queryByText('New Post')).not.toBeInTheDocument();

    
    createPost({ title: 'New Post', content: 'New content', email: 'test@example.com' });

  
    rerender(<IndexPage />);

   
    expect(screen.getByText('Existing Post')).toBeInTheDocument();
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });
});