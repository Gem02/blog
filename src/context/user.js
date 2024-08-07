import {useState, createContext, useContext, useEffect} from 'react';
 import axios from 'axios';

const UserContext = createContext();

export const UserContextProvider = ({children}) =>{

    const [login, setLogin] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [usernames, setUserNames] = useState('');

    axios.defaults.withCredentials = true;

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/userInfo`);
            if(response.status === 200){
                console.log('Context refreshed correctly');
                setLogin(true);
                setUserEmail(response.data.email);
                setUserNames(response.data.username);
            }
            
        } catch (error) {
            console.log('No information about user'); 
        }
     };

    useEffect(() => {

     
           fetchUser();
        

    }, [login]); 
    



    return(
        <UserContext.Provider value={{login, setLogin, setUserEmail, setUserNames, userEmail, usernames}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () =>{
    return useContext(UserContext);
}