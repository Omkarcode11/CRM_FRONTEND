import axios from "axios"

async function getAllUsers(userType) {
    try {
        debugger
        let config = {
            headers: {
                'x-access-token': localStorage.getItem('CrmToken')
            },
            params: {
                userType: userType
            }

        }

        // let query = { userType: "ENGINEER" }
        let { data } = await axios.get('http://localhost:8080' + '/crm/api/v1/user', config)
        return data
    } catch (err) {
        console.log(err)
    }


}

export default getAllUsers