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
        if (state.data.state === 'not_configured') {
            return (<View><Text>Not Configured</Text></View>);
        }
        if (state.data.state === 'configured') {
            return <MachineView host={host} controller={state.data.controller} />;
        }
        return (<View><Text>Unknown controller state</Text></View>);
    }
    else {
        return (<View><Text>Loading...</Text></View>);
    }
});