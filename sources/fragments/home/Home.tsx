import * as React from 'react';
import { Text, View, Image, Button, ActivityIndicator } from 'react-native';
import { backoff } from '../../utils/time';
import { checkServer } from '../../api/checkServer';
import { useNavigation } from '@react-navigation/native';

export const Home = React.memo(() => {
    const navigation = useNavigation();
    const [found, setFound] = React.useState<boolean | undefined>(undefined);
    React.useEffect(() => {
        let exited = false;
        backoff(async () => {
            if (exited) {
                return;
            }
            if (await checkServer('devcnc.home:3000')) {
                setFound(true);
            } else {
                setFound(false);
            }
        });
        return () => {
            exited = true;
        };
    }, []);

    return (
        <View style={{ flexGrow: 1, backgroundColor: 'white', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200 }} />
            <Text style={{ fontSize: 24, color: 'black', marginTop: 32 }}>
                Hobby CNC
            </Text>
            <Text style={{ fontSize: 18, color: 'black', marginTop: 8, opacity: 0.6 }}>
                Easy way to control your CNC machine
            </Text>
            <View style={{ width: 480, height: 64, justifyContent: 'center', alignItems: 'center', marginTop: 48 }}>
                {found === undefined && (
                    <ActivityIndicator />
                )}
                {found === false && (
                    <Text>
                        Controller not found
                    </Text>
                )}
                {found === true && (
                    <Button title='Connect to Controller' onPress={() => (navigation as any).navigate('controller')} />
                )}
            </View>
        </View>
    );
});