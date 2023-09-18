import * as React from 'react';
import { Text, View } from 'react-native';

export const CardButton = React.memo((props: { title: string, value: string }) => {
    return (
        <View style={{ width: 200, height: 64, backgroundColor: 'rgba(242, 243, 245, 1)', borderRadius: 8, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 18, color: 'black', opacity: 0.5, marginRight: 18 }}>{props.title}</Text>
            <Text style={{ fontWeight: '600', fontSize: 18, color: 'black' }}>{props.value}</Text>
        </View>
    )
});