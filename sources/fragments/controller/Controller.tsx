import * as React from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { queryState } from '../../api/queryState';
import { MachineView } from './MachineView';

export const Controller = React.memo(() => {
    let { host } = useRoute().params as { host: string };
    let state = useQuery(['state', host], async () => { return queryState(host) }, { refetchInterval: 1000 });
    if (state.isSuccess) {
        if (state.data.machines.length === 0) {
            return (<View><Text>Empty</Text></View>);
        }

        return <MachineView host={host} state={state.data.machines[0]} />;
    }
    else {
        return (<View><Text>Loading...</Text></View>);
    }
});