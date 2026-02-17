export interface User {
    _id: string,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    admin: boolean,
    active: boolean
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
}