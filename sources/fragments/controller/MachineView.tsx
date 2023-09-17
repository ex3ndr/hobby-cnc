import * as React from 'react';
import { MachineState } from '../../api/queryState';
import { Button, ScrollView, Text, View } from 'react-native';
import { sendCommand } from '../../api/sendCommand';

const AxisView = React.memo((props: { axis: string, machine: number, work: number }) => {
    return (
        <View style={{ width: 200, height: 64, borderColor: 'red', borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{props.axis}: {props.work} mm</Text>
        </View>
    )
});

const MessageView = React.memo((props: { message: string }) => {
    return <View><Text>{props.message}</Text></View>;
});

export const MachineView = React.memo((props: { host: string, state: MachineState }) => {

    if (props.state.state.status === 'connecting') {
        return <MessageView message='Connecting to machine...' />;
    }
    if (props.state.state.status === 'connected') {
        return <MessageView message='Preparing machine...' />;
    }
    if (props.state.state.status === 'disconnected') {
        return <MessageView message='Machine disconnected' />;
    }
    if (props.state.state.status !== 'ready') {
        return <MessageView message='Unknown error' />;
    }
    const state = props.state.state;

    return (
        <View style={{ flexDirection: 'column', backgroundColor: 'white', flexGrow: 1, flexBasis: 0 }}>
            <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <AxisView axis='X' machine={state.state.machinePosition.x} work={state.state.workPosition.x} />
                    <AxisView axis='Y' machine={state.state.machinePosition.y} work={state.state.workPosition.y} />
                </View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <AxisView axis='Z' machine={state.state.machinePosition.z} work={state.state.workPosition.z} />
                    <AxisView axis='A' machine={state.state.machinePosition.a} work={state.state.workPosition.a} />
                </View>
            </View>
            <View>
                <Text>Tool</Text>
                <View>
                    <Text>Current tool: {state.state.tool.index.toString()}</Text>
                </View>
                <Button title="Drop Tool" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T-1')} />
                <Button title="Get Probe" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T0')} />
                <Button title="Get Tool 1" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T1')} />
                <Button title="Get Tool 2" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T2')} />
                <Button title="Get Tool 3" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T3')} />
                <Button title="Get Tool 4" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T4')} />
                <Button title="Get Tool 5" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T5')} />
                <Button title="Get Tool 6" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M6T6')} />
            </View>
            <View>
                <Text>GoTo</Text>
                <Button title="Clearance" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M496.1')} />
                <Button title="Work Origin" onPress={() => sendCommand(props.host, props.state.id, state.id, 'M496.2')} />

                <Button title="X+" onPress={() => sendCommand(props.host, props.state.id, state.id, 'G91G0X10')} />
                <Button title="X-" onPress={() => sendCommand(props.host, props.state.id, state.id, 'G91G0X-10')} />
                <Button title="Y+" onPress={() => sendCommand(props.host, props.state.id, state.id, 'G91G0Y10')} />
                <Button title="Y-" onPress={() => sendCommand(props.host, props.state.id, state.id, 'G91G0Y-10')} />
                <Button title="Z+" onPress={() => sendCommand(props.host, props.state.id, state.id, 'G91G0Z10')} />
                <Button title="Z-" onPress={() => sendCommand(props.host, props.state.id, state.id, 'G91G0Z-10')} />
            </View>
        </View>
    );
});