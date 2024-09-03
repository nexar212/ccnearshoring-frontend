'use client'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProfile } from '../api/api';


export default function User() {
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    })

    const fetchData = async () => {
        try {
          const response = await getProfile()
          
          const {
            firstName,
            lastName,
            email,
            role
          } = response.data;

          setUserData({
            ...userData,
            firstName,
            lastName,
            email,
            role
          })
        } catch (err) {}
    };

    useEffect(() =>{
        const token = sessionStorage.getItem('token');
        if(!token){
            router.push('/login')
            return 
        }
        fetchData();
        setIsAuthenticated(true)
        
    },[])

    const handleClickLogOut = async () => {
        sessionStorage.removeItem('token');
        router.push('/login')
    }

    return isAuthenticated ? (
     <div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
            <Typography variant="h4" gutterBottom>
                <span>
                    {`Inicio de sesión del usuario: ${userData.firstName} ${userData.lastName} con privilegio de : ${userData.role}`}
                </span>
            </Typography>
            <div>
                <Link style={{textAlign: 'rigth', margin: 5}} href="#" onClick={handleClickLogOut}>Cerrar Sesión</Link>
            </div>
        </div>
     </div>
    ) : null
}