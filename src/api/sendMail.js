import axios from 'axios'

async function sendMail(body) {
    try {
        let { data } = await axios.post("https://notification-service-iq18.onrender.com/notificationService/api/v1/notifications/send/email", body)
        return data
    } catch (err) {
        console.log(err)
    }
}

export default sendMail