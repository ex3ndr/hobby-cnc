import axios from "axios";

export async function sendCommand(host: string, id: string, command: string) {
    await axios.post('http://' + host + '/controller/command', { id: id, command: command });
}