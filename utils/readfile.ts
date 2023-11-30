import CONFIG_CALL from '../src/controllers/const'
export async function readFile(filename: string) {
    const content = await fetch(filename)
    return await content.text()
}
export async function fetchImage(imageName: string) {
    const res = await fetch(CONFIG_CALL.DEFAULT_URL + "/image/" + imageName);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
}
