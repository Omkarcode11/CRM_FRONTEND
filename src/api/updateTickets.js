import axios from "axios"
import { URL } from "../constant/URL"

export default async function updateTicketApi(body, id) {
    debugger
    let headers = {
        headers: {
            'x-access-token': localStorage.getItem('CrmToken')
        }
    }
    try {
        let { data } = await axios.put(URL + `/crm/api/v1/tickets/${id}`, body, headers)
        return data

    } catch (err) {
        console.log(err)
    }
}