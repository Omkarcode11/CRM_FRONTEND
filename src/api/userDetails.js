import axios from "axios"
import { URL } from "../constant/URL"


async function userDetails(userId) {
  
  try {
    let headers = {
      headers: {
        'x-access-token': localStorage.getItem('CrmToken')
      }
    }
    let { data } = await axios.get(URL + `/crm/api/v1/user/${userId}`,headers)
    return data
  } catch (err) {
    console.log(err)
  }
}

export default userDetails