'use client'
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { postLogIn } from '../api/api'

import { useRouter } from 'next/navigation';


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const [alertProperty, setAlerProperty] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const router = useRouter();

    useEffect(() =>{
        const token = sessionStorage.getItem('token');
        if(token){
            router.push('/user')
            return 
        }
        setIsAuthenticated(true)
    },[router])

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const handleClickSignIn = (event) => {
        router.push('/register')
    }

    const handleChangeUserData = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const handleClickLogIn = async () => {
        try {
            const response = await postLogIn(userData);
            
            if(response){
                router.push('/user')
                return
            } else {

                setAlerProperty({
                    open: true,
                    severity: 'error',
                    message: 'Invalid Credentials.'
                })
                return
            }

        } catch (error) {}
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlerProperty({
            ...alertProperty,
            open: false,
        })
      };

    return isAuthenticated ? (
    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={ { alignSelf: 'center'} }>
        <Typography variant="h3" gutterBottom>
            Login
        </Typography>
            <FormControl sx={{ width: '25ch' }} variant="outlined">
                <TextField
                    style={{marginBottom: 10}}
                    id="outlined-basic"
                    label="Correo"
                    variant="outlined"
                    placeholder='email'
                    name="email"
                    onChange={handleChangeUserData}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChangeUserData}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        name="password"
                        label="Password"
                    />
                </FormControl>
                <Button
                    variant="outlined"
                    style={{margin: 15}}
                    onClick={handleClickLogIn}
                >Iniciar Sesión</Button>
                <Link style={{textAlign: 'center', margin: 5}} href="#" onClick={handleClickSignIn}>Registrarse</Link>
            </FormControl>
        </div>
        <Snackbar open={alertProperty.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={alertProperty.severity}>
                {alertProperty.message}
            </Alert>
        </Snackbar>
    </div>
) : null
}
