import axios from 'axios'
import URL from '../constant/URL'


async function usePostApi(path, body) {
    debugger
    let { data } = await axios.post(URL + path, body)
    console.log(data)
    return data
}

export default usePostApi