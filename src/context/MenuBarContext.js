import {useState, createContext, useContext } from 'react';

const MenuContext = createContext();

export const MenuContextProvider = ({ children }) =>{
    const [showSideBar, setShowSideBar] = useState(false);

    const hideMenu = () =>{
        setShowSideBar(false);
    }

    const showMenu = () =>{
        setShowSideBar(true);
    }

    return (
        <MenuContext.Provider value={{showSideBar, hideMenu, showMenu, setShowSideBar}}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenuBar = () =>{
    return useContext(MenuContext)
}