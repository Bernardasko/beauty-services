import { createContext, useState, useEffect } from 'react';
import { getallData, getCategories, getUsers } from '../services/get';


export const StateContext = createContext();


export const StateProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [beauty, setBeauty] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUser] = useState([]);
    const [update, setUpdate] = useState(0);


    const fetchData = async () => {
        try {
            const { data: { beauty } } = await getallData();
            setBeauty(beauty);
            console.log(beauty);
        } catch (error) {
            console.log(error);
        }
    }

    //Categories
    const fetchCategories = async () => {
        try {
            const { data: { categories } } = await getCategories();
            setCategories(categories);
        } catch (error) {
            console.log(error);
        }
    }

    //User
    const fetchUser = async () => {
        try {
            const { data: { users } } = await getUsers();
            console.log(users);
            setUser(users);
        } catch (error) {
            console.log(error);
        }
    }

    
    useEffect(() => {
        fetchData();
        fetchCategories();
        fetchUser();
    }, [update])

    return(
        <StateContext.Provider value={{open, setOpen, opens, setOpens, beauty, setBeauty,  categories, setCategories, users, setUser, update, setUpdate, }}>
            {children}
        </StateContext.Provider>
    )

}