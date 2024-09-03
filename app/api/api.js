import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACK_END;

export async function postLogIn(userData) {
    console.log('proces: ', )
    try {
        const result = await axios.post(
            `${BASE_URL}/login`,
            userData,
        ).then( response =>{

            const token = response.data.token;
            if(token){
                sessionStorage.setItem('token', token)
            }

            return response;
        });
        return result;
    } catch (error) {
        return null;
    }
}
export async function postRegister(userData) {
    try {
        return await axios.post(`${BASE_URL}/register`, userData);
    } catch (error) {
        throw error;
    }
}

export async function getProfile() {
    try {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return await axios.get(`${BASE_URL}/profile`,config);
    } catch (error) {
        
    }

}