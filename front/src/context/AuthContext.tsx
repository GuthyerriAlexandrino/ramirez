import React, { 
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState 
} from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useNotify } from "./NotifyContext";
import { ref, storage } from "../utils/keys/firebaseconfig";
import { getDownloadURL } from "firebase/storage";

type User = {
    email: string;
    password: string;
}

type AuthContextProps = {
    verifyTokenExpiration: () => boolean;
    getProfileImage: () => void;
    removeToken: () => void;
    userProfileImage: string;
    handleLogin: (value: User) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {

    const [userProfileImage, setUserProfileImage] = useState("");

    const {
        notifySuccess,
        notifyError
    } = useNotify();


    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies['ramirez-user']

        if (token) {
            if (Router.asPath === "/login") {
                Router.push("/search")
            }
            // getProfileImage();
        } 

    }, [])

    async function getProfileImage() {
        const cookies = parseCookies();
        const token = cookies['ramirez-user']
        const id = cookies['ramirez-user-id']

        const data = await fetch(`http://localhost:3001/users/${id}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json());

        if (data.profile_img === "") {
            return;
        }

        const foresRef = ref(storage, data.profile_img);
        await getDownloadURL(foresRef)
        .then(url => {
            setUserProfileImage(url)
        })
        .catch(error => console.log(error));
    }

    function verifyTokenExpiration() {
        const cookies = parseCookies();
        const token = cookies['ramirez-user']

        if (!token) {
            return false;
        } 
        return true;
    }

    function removeToken() {
        destroyCookie(null, "ramirez-user")
        destroyCookie(null, "ramirez-user-id")
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

        if (res.error) {
            notifyError("Falha no login! Verifique os campos preenchidos.")
        } else {

            setCookie(undefined, "ramirez-user", res.token, {
                expires: new Date(res.exp)
            })

            setCookie(undefined, "ramirez-user-id", res.user.$oid, {
                expires: new Date(res.exp)
            })
    
            notifySuccess("Login feito com sucesso!")
            Router.push("/search")
        }
    }

    return (
        <AuthContext.Provider
            value={{
                userProfileImage,
                getProfileImage,
                removeToken,
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