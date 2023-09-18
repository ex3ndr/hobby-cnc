import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import { queryState } from '../../api/queryState';

export const JogFragment = React.memo(() => {
    let { host } = useRoute().params as { host: string };
    let state = useQuery(['state', host], async () => { return queryState(host) }, { refetchInterval: 1000 });
    return (
        <View style={{ flexGrow: 1, backgroundColor: 'white' }}>
            
        </View>
    );
});