import axios from 'axios';

export type Vector5 = {
    x: number,
    y: number,
    z: number,
    a: number,
    b: number
}

export type MachineState = {
    id: string,
    profile: string,
    state: {
        status: 'connecting' | 'connected' | 'disconnected',
    } | {
        status: 'ready',
        id: string,
        state: {
            status: 'alarm' | 'home' | 'hold' | 'idle' | 'run',
            machinePosition: Vector5;
            workPosition: Vector5;
            feed: {
                current: number,
                target: number,
                scale: number
            },
            spindle: {
                current: number,
                target: number,
                scale: number,
                temperature: number
            },
            vacuum: {
                enabled: boolean
            },
            tool: {
                index: number,
                offset: number
            },
        }
    }
}

export type ControllerState = {
    machines: MachineState[]
};

export async function queryState(host: string) {
    let res = await axios.get('http://' + host + '/controller/state');
    return res.data as ControllerState;
}