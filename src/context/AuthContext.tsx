import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authAPI } from "../services/api";
import { User } from "../types";

interface AuthContextType {
    user: User | null,
    token: string | null,
    loading: boolean,
    isAuthenticated: boolean,
    login: (credentials: { email: string; password: string }) => Promise<{ success: boolean, error?: string }>,
    register: (data: object) => Promise<{ success: boolean, error?: string }>,
    logout: () => void
}


const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be inside AuthProvider');
    return ctx;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restore = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                const storedUser = await AsyncStorage.getItem('user');

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                await AsyncStorage.multiRemove(['token', 'user']);
            } finally {
                setLoading(false);
            }
        };
        restore();
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const res = await authAPI.login(credentials);
            const { token: newToken, user: userData } = res.data;
            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setToken(newToken);
            setUser(userData);
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (data: object) => {
        try {
            const res = await authAPI.register(data);
            const { token: newToken, user: userData } = res.data;
            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setToken(newToken);
            setUser(userData);
            return { success: true };
        } catch (e: any) {
            return { success: false, error: e.response?.data?.message || 'Registration failed' };
        }
    }

    const logout = async () => {
        await AsyncStorage.multiRemove(['token', 'user']);
        setToken(null);
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!token, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
    
}