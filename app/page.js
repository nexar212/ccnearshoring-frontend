"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      // if (typeof window !== 'undefined') {
      //   // Aquí se asegura de que el código se ejecute solo en el cliente
      //   const token = localStorage.getItem('authToken');

      //   if (!token) {
      //     router.push('/login');
      //   } else {
      //     try {
      //       const response = await axios.post('http://tu-backend-api/validate-token', { token });

      //       if (response.data.valid) {
      //         router.push('/x');
      //       } else {
      //         router.push('/login');
      //       }
      //     } catch (error) {
      //       router.push('/login');
      //     }
      //   }
      // }

      if(true){
        router.push('/login');
      } else{
        router.push('/register');

      }
    };

    validateToken();
  }, []);

  return <div>Cargando...</div>;
}