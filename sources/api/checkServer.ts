import axios from 'axios';

export async function checkServer(endpoint: string) {
    await axios.get('http://' + endpoint);
}