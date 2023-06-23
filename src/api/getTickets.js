import axios from "axios";
import { URL } from "../constant/URL";



export async function getTickets() {
    try {
       
        let headers = {
            headers: {
                'x-access-token': localStorage.getItem('CrmToken')
            }
        }
        let { data } = await axios.get(URL + "/crm/api/v1/tickets/", headers)
        return data
    } catch (err) {
        console.log(err)
    }

}


