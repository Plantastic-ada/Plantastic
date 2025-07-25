import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Set up for navigation to check mocked token 
const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const [ checking, setChecking ] = useState(true);

    useEffect(() => {
        const verifyToken = async() => {
            const token = localStorage.getItem('authToken')

            if (!token) {
                navigate('/login', {replace: true})
                return
            }
            try {
                const response = await fetch('/api/auth/me',{
                    method: 'GET',
                    headers:  {
                            'Authorization':`Bearer ${token}`,
                        },
                })
                if (!response.ok) {
                    throw new Error ('Invalid token')
                }
            } catch (error) {
                console.error('Token verification failed: ', error)
                localStorage.removeItem('authToken');
                navigate('/login',{ replace: true});
            } finally {
                setChecking(false)
            }
        }
        verifyToken()
    }, [navigate])
    if (checking) return <p>⏳ Checking authentication...</p>;
    return <Outlet/>
} 

export default ProtectedRoutes