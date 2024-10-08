import React, { createContext, useState } from 'react'
export const authContext = createContext()
const Auth = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    return (
        <authContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </authContext.Provider>
    )
}

export default Auth