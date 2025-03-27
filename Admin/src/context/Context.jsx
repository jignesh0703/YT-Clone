import { createContext } from "react";

const StoreContext = createContext(null)

const ContextProvider = ({ children }) => {

    const URL = 'http://localhost:3000'

    const Values = {
        URL
    }

    return (
        <StoreContext.Provider value={Values}>
            {children}
        </StoreContext.Provider>
    )
}

export { ContextProvider, StoreContext }