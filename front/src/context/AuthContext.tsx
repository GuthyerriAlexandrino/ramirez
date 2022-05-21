import React, { 
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState 
} from "react";
import Router from "next/router";
import { setCookie, parseCookies } from "nookies";

type Token = {
    token: string;
	exp: string;
	user: {
		$oid: string;
	}
}

type User = {
    email: string;
    password: string;
}

type AuthContextProps = {
    isAuthenticated: boolean;
    token: Token;
    user: User | null;
    setToken: (value: Token) => void;
    verifyTokenExpiration: () => boolean;
    handleLogin: (value: User) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<Token>({} as Token);

    const isAuthenticated = !!user;

    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies['ramirez-user']

        if (token) {
            // Router.push("/search")
        } 

    }, [])

    function verifyTokenExpiration() {
        const cookies = parseCookies();
        const token = cookies['ramirez-user']

        if (!token) {
            return false;
        } 
        return true;
    }

    async function handleLogin({email, password}: User) {
        const user = {
            user: {
                email: email, 
                password: password
            }
        }

        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Acess-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        console.log(res)

        if (res.error) {
            alert("Invalid credentials")
        } else {
            setCookie(undefined, "ramirez-user", res.token, {
                expires: new Date(res.exp)
            })
    
            setUser(user.user);
            Router.push("/search")

        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                user,
                setToken,
                verifyTokenExpiration,
                handleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthLogin = () => {
    return useContext(AuthContext);
}