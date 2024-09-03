'use client'
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { postRegister } from '../api/api';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        confirmPassword: '',
        role: '',
    });

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
  
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const handleClickSignIn = async (event) => {
        try {

            const {
                password,
                confirmPassword,
            } = userData;

            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(!regex.test(password)){
                setAlerProperty({
                    open: true,
                    severity: 'warning',
                    message: 'Your password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                })
                return null
            }
            
            if(password !== confirmPassword) {
                setAlerProperty({
                    open: true,
                    severity: 'warning',
                    message: 'Confirm your passwords.'
                })
                return null
            }

            if(Object.values(userData).some(value => value === null || value === undefined || value === '')){
                setAlerProperty({
                    open: true,
                    severity: 'warning',
                    message: 'Required fields without information.'
                })
                return null
            }
            
            const response = await postRegister(userData);
            if(response){
                router.push('/login')
            } else {
                setAlerProperty({
                    open: true,
                    severity: 'error',
                    message: 'Login Error '
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleClickLogIn = () => {
        router.push('/login')
    }
    
    const handleChangeValue = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
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
            Registro
        </Typography>
            <FormControl sx={{ width: '25ch' }} variant="outlined">
                <TextField style={{marginBottom: 10}} id="outlined-basic" label="Nombre" variant="outlined" placeholder='text' name="firstName"
                onChange={handleChangeValue}/>
                <TextField 
                    style={{marginBottom: 10}}
                    id="outlined-basic"
                    label="Apellido"
                    variant="outlined"
                    placeholder='text'
                    name="lastName"
                    onChange={handleChangeValue}
                />
                <TextField
                    style={{marginBottom: 10}}
                    id="outlined-basic"
                    label="Correo"
                    variant="outlined"
                    placeholder='email'
                    name="email"
                    onChange={handleChangeValue}
                />
                <FormControl variant="outlined" >
                    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                    <OutlinedInput
                        style={{marginBottom: 10}}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChangeValue}
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
                        label="Password"
                        name="password"
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirmar Contraseña</InputLabel>
                    <OutlinedInput
                        onChange={handleChangeValue}
                        style={{marginBottom: 10}}
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        name="confirmPassword"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userData.role}
                        label="Age"
                        name="role"
                        onChange={handleChangeValue}
                    >
                        <MenuItem value={'usuario'}>Usuario</MenuItem>
                        <MenuItem value={'administrador'}>Administrador</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
                    style={{margin: 15}}
                    onClick={handleClickSignIn}
                >Registrarse</Button>
                <Link style={{textAlign: 'center', margin: 5}} href="#" onClick={handleClickLogIn}>Iniciar Sesión</Link>
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
