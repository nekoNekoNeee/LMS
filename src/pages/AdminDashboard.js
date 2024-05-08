import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
 // Import the CSS file

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const { userInfo } = useContext(UserContext);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/post');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts:', response.statusText);
        alert('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('An error occurred while fetching posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setDeleting(id);

    try {
      const response = await fetch(`http://localhost:4000/post/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      } else {
        console.error('Failed to delete post:', response.statusText);
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post.');
    } finally {
      setDeleting(null);
    }
  };

  if (!userInfo || userInfo.role !== 'admin') {
    return <p>Access denied. You do not have permission to access this page.</p>;
  }

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>
                <Link className="admin-td" to={`/post/${post._id}`}>{post.title}</Link>
              </td>
              <td>
                <button
                  onClick={() => deletePost(post._id)}
                  disabled={deleting === post._id}
                >
                  {deleting === post._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
