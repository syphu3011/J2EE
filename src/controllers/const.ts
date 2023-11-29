const ENV="development"
const LOCAL = "localhost"
const DEPLOY="vmtp.id.vn"
const DEFAULT_URL = "https://"+(ENV=='development' ? LOCAL:DEPLOY)+":3301"
const BASE_URL = "https://"+(ENV=='development' ? LOCAL:DEPLOY)+":8080"
enum CONFIG_CALL {
    DEFAULT_URL = "https://vmtp.id.vn:3301",
    BASE_URL = "https://vmtp.id.vn:8080"
}
export default CONFIG_CALL