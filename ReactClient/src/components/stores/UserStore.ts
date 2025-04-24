import axios from "axios"
import { setToken } from "./TokenSlice";
const myUrl = import.meta.env.SERVERURL

class UserStore {

    signUp = () => {
        
    }

    signIn = () => {

    }

    updateUser = async (id: string | null | undefined, user: any, token: string | null, dispatch: any) => {
        try {
            const res = await axios.put(`https://localhost:7231/api/User/update/${id}`, user, { headers: { Authorization: `Bearer ${token}` } });
            if (res) {
                alert(`user update successfully!`)
                dispatch(setToken(res.data.token))
            }

        }
        catch (error) {
            alert(`ERROR:user doesn't update !`)
            console.error('שגיאה בעדכון משתמש:', error);
        }
    }
}


export default new UserStore()