import React, { useState } from 'react';
import client from '@/db';

const AuthComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await client.connect();

            const db = client.db('strength_triangle');

            if (isLogin) {
                // Login logic
                const user = await db.collection('users').findOne({ email, password });
                if (user) {
                    console.log('Login successful!', user);
                } else {
                    console.log('Login failed: Invalid credentials');
                }
            } else {
                const existingUser = await db.collection('users').findOne({ email });
                if (existingUser) {
                    console.log('Signup failed: User already exists');
                } else {
                    await db.collection('users').insertOne({ email, password });
                    console.log('Signup successful!');
                }
            }
        } catch (err) {
            console.error('Error during database operation:', err);
        } finally {
            await client.close();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
};

export default AuthComponent;