import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export async function getUserData(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}


export async function getUserData(userId) {

}


export async function getUserData(userId) {

}

post