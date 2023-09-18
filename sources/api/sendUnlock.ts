import axios from "axios";

export async function sendUnlock(host: string, id: string) {
    await axios.post('http://' + host + '/controller/unlock', { id: id });
}