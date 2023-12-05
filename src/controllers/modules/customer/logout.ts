import { request } from '../request';

export async function logout() {
    const query = `
    mutation logout {
        dangxuat {
            status
            message
        }
    }
    `
    return request(query)
}