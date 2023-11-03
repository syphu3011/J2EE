import axios_default from "../../../utils/axios"
import CONFIG_CALL from "../const"

export async function request(rq, variables = {}) {
    try {
        const rsToServer = axios_default.post(CONFIG_CALL.DEFAULT_URL,
            { query: rq, variables: variables})
        let rs = rsToServer.then(response => {
            return response.data
        }
        ).catch(e => {
            console.log(e)
            return {
                status: 400,
                message: "Có lỗi xảy ra!",
                data: e
            }
        })
        return rs
    }
    catch (e) {
        console.log(e)
        return {
            status: 400,
            message: "Có lỗi xảy ra!",
            data: null
        }
    }
}