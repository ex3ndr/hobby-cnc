import * as React from 'react';
import { Text, View, Image } from 'react-native';

export const Home = React.memo(() => {
    const [found, setFound] = React.useState(undefined);
    React.useEffect(() => {
        
    }, []);

    return (
        <View style={{ flexGrow: 1, backgroundColor: 'white', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
            <Text style={{ fontSize: 24, color: 'black', marginTop: 32 }}>
                Hobby CNC
            </Text>
            <Text style={{ fontSize: 18, color: 'black', marginTop: 8, opacity: 0.6 }}>
                Easy way to control your CNC machine
            </Text>
        </View>
    );
});