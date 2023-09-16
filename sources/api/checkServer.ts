import axios from 'axios';

export async function checkServer(endpoint: string) {
    let res = await axios.get('http://' + endpoint);
    return res.data === 'Welcome to Home CNC!';
}