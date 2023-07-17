import axios from 'axios'
import { URL } from '../constant/URL'

async function updateEngineersApi(body, userId) {
    debugger
    try {
        let headers = {
            headers: {
                'x-access-token': localStorage.getItem('CrmToken')
            }
        }
        let { data } = await axios.put(URL + `/crm/api/v1/user/${userId}`, body, headers)
        return data
    } catch (err) {
        console.log(err)
    }
}

export default updateEngineersApi