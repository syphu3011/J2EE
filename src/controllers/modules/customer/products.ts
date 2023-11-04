export function getProducts() {
    const rq = `query timkiemsanpham($id: Int, $name: String, $from: Int, $to: Int) {
        timkiemsanpham(input:{ma = $id, ten = $name, gia_tu = $from, gia_den = $to}) {
            status 
            message
            data
        }
    }`
}