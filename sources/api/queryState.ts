import axios from 'axios';

export type Vector5 = {
    x: number,
    y: number,
    z: number,
    a: number,
    b: number
}

export type ControllerState = {
    status: 'connecting' | 'connected' | 'disconnected',
} | {
    id: string,
    status: 'ready',
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
};

export type ManagerState = {
    state: 'not_configured'
} | {
    state: 'configured',
    controller: ControllerState
};

export async function queryState(host: string) {
    let res = await axios.get('http://' + host + '/controller/state');
    return res.data as ManagerState;
}