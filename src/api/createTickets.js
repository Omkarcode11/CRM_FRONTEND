import axios from "axios"
import { URL } from "../constant/URL"

export async function createTicketApi(body) {
    try {

        let headers = {
            headers: {
                'x-access-token': localStorage.getItem('CrmToken')
            }
        }
        let data = await axios.post(URL + '/crm/api/v1/tickets/', body, headers)
        return data
    } catch (err) {
        console.log(err)
    }

}
