import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { MongoClient } from 'mongodb';

export const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignup = async () => {
        const uri = "mongodb+srv://majadomalewska:thestrengthtriangle@thestrengthtriangle.xibbo.mongodb.net/?retryWrites=true&w=majority&appName=TheStrengthTriangle"; 
        const client = new MongoClient(uri);

        try {
            await client.connect();
            const database = client.db('strength_triangle');
            const usersCollection = database.collection('users');

            // Insert the user into the database
            const result = await usersCollection.insertOne({ email, password });
            if (result.acknowledged) {
                Alert.alert("Signup Successful", "You have successfully signed up!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            Alert.alert("Signup Failed", "An error occurred during signup.");
        } finally {
            await client.close();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={newText => setEmail(newText)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={newText => setPassword(newText)}
                value={password}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignup} />
            <Text style={styles.text}>
                {email.split("").join("")}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#25292e',
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});

export default Signup;