import React, { createContext, useContext } from "react";

type NotifyContextProps = {
    notifySuccess: (message: string) => void;
    notifyError: (message: string) => void
}

export const NotifyContext = createContext({} as NotifyContextProps);

type NotifyProvider = {
    children: React.ReactNode;
}

import { toast } from 'react-toastify';

export function NotifyProvider({children}: NotifyProvider) {

    const notifySuccess = (message: string) => {
        toast.success(message, {
          autoClose: 3000,
          theme: "dark"
        })
    }

    const notifyError = (message: string) => {
        toast.error(message, {
          autoClose: 3000,
          theme: "dark"
        })
    }

    return (
        <NotifyContext.Provider
            value={{
                notifySuccess,
                notifyError
            }}
        >
            {children}
        </NotifyContext.Provider>
    )
}

export const useNotify = () => {
    return useContext(NotifyContext);
}