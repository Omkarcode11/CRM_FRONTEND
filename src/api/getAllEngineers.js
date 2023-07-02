import axios from "axios"
import { URL } from "../constant/URL"

async function getAllUsers(userType) {
    try {
        let config = {
            headers: {
                'x-access-token': localStorage.getItem('CrmToken')
            },
            params: {
                userType: userType
            }

        }
        let { data } = await axios.get(URL + '/crm/api/v1/user', config)
        return data
    } catch (err) {
        console.log(err)
    }


}

export default getAllUsers