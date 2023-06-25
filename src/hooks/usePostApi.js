import axios from 'axios'
import { URL } from '../constant/URL'



async function usePostApi(path, body) {
    try {

        let { data } = await axios.post(URL + path, body)
        console.log(data)
        return data
    } catch (err) {
        return err
    }
}

export default usePostApi