import axios from "axios";

export async function sendCommand(host: string, machine: string, id: string, command: string) {
    await axios.post('http://' + host + '/controller/command', {
        machine: machine,
        id: id,
        command: command
    });
}