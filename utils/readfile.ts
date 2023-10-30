export async function readFile(filename: string) {
    const content = await fetch(filename)
    return await content.text()
}
