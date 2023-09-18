import axios from "axios";

export async function sendLock(host: string, id: string) {
    await axios.post('http://' + host + '/controller/lock', { id });
}