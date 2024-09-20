import { promises as fs } from 'fs';
export async function GET() {
    console.log('inside the photo of email')
    const file=await fs.readFile('public/image.png')
    return new Response(file,{
        headers:{
            'content-type':'image/png'
        }
    })
}
