import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider, UserContext } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import AdminDashboard from './pages/AdminDashboard';
import { useContext, useEffect } from 'react';

function AdminRoute({ children }) {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect to homepage if the user is not an admin
  useEffect(() => {
    if (userInfo.role !== 'admin') {
      navigate('/');
    }
  }, [userInfo, navigate]);

  // Render children if the user is an admin
  return userInfo.role === 'admin' ? children : null;
}

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
          
          {/* Protected /admin route */}
          <Route
            path='/admin'
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
