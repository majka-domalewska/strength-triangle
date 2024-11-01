import React from 'react';
import { StyleSheet, View } from 'react-native';
import Signup from '@/components/signup';
import TestAsync from '@/components/await_test';

const App: React.FC = () => {
    return (
        <View style={styles.container}>
            <TestAsync />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
    },
});

export default App;
