import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { sendCommand } from '../../api/sendCommand';
import { CardButton } from '../../components/CardButton';
import { sendUnlock } from '../../api/sendUnlock';
import { sendLock } from '../../api/sendLock';
import { ControllerState } from '../../api/queryState';

const MessageView = React.memo((props: { message: string }) => {
    return <View><Text>{props.message}</Text></View>;
});

const toolNames = [
    'None',
    'Probe',
    '#1',
    '#2',
    '#3',
    '#4',
    '#5',
    '#6',
];

export const MachineView = React.memo((props: { host: string, controller: ControllerState }) => {

    if (props.controller.status === 'connecting') {
        return <MessageView message='Connecting to machine...' />;
    }
    if (props.controller.status === 'connected') {
        return <MessageView message='Preparing machine...' />;
    }
    if (props.controller.status === 'disconnected') {
        return <MessageView message='Machine disconnected' />;
    }
    if (props.controller.status !== 'ready') {
        return <MessageView message='Unknown error' />;
    }
    const id = props.controller.id;
    const state = props.controller.state;

    return (
        <View style={{ flexDirection: 'column', backgroundColor: 'white', flexGrow: 1, flexBasis: 0 }}>
            <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <CardButton title='Status' value={state.status} />
                <CardButton title='X' value={state.workPosition.x.toFixed(4)} />
                <CardButton title='Y' value={state.workPosition.y.toFixed(4)} />
                <CardButton title='Z' value={state.workPosition.z.toFixed(4)} />
                <CardButton title='A' value={state.workPosition.a.toFixed(4)} />
                <CardButton title='TOOL' value={toolNames[state.tool.index + 1]} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 64, justifyContent: 'center' }}>
                <Button title="Drop Tool" onPress={() => sendCommand(props.host, id, 'M6T-1')} />
                <Button title="Get Probe" onPress={() => sendCommand(props.host, id, 'M6T0')} />
                <Button title="Get Tool 1" onPress={() => sendCommand(props.host, id, 'M6T1')} />
                <Button title="Get Tool 2" onPress={() => sendCommand(props.host, id, 'M6T2')} />
                <Button title="Get Tool 3" onPress={() => sendCommand(props.host, id, 'M6T3')} />
                <Button title="Get Tool 4" onPress={() => sendCommand(props.host, id, 'M6T4')} />
                <Button title="Get Tool 5" onPress={() => sendCommand(props.host, id, 'M6T5')} />
                <Button title="Get Tool 6" onPress={() => sendCommand(props.host, id, 'M6T6')} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 64, justifyContent: 'center' }}>
                <Button title="Clearance" onPress={() => sendCommand(props.host, id, 'M496.1')} />
                <Button title="Work Origin" onPress={() => sendCommand(props.host, id, 'M496.2')} />
                <Button title="X+" onPress={() => sendCommand(props.host, id, 'G91G0X10')} />
                <Button title="X-" onPress={() => sendCommand(props.host, id, 'G91G0X-10')} />
                <Button title="Y+" onPress={() => sendCommand(props.host, id, 'G91G0Y10')} />
                <Button title="Y-" onPress={() => sendCommand(props.host, id, 'G91G0Y-10')} />
                <Button title="Z+" onPress={() => sendCommand(props.host, id, 'G91G0Z10')} />
                <Button title="Z-" onPress={() => sendCommand(props.host, id, 'G91G0Z-10')} />
            </View>
            {state.status === 'alarm' && (
                <View>
                    <Button title="Unlock the machine" onPress={() => sendUnlock(props.host, id)} />
                </View>
            )}
            {state.status !== 'alarm' && (
                <View>
                    <Button title="Lock the machine" onPress={() => sendLock(props.host, id)} />
                </View>
            )}
        </View>
    );
});