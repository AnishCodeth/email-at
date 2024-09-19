import { promises as fs } from 'fs';
export async function GET() {
    console.log('inside the photo of email')
    const file=await fs.readFile('public/image.png','base64')
    return Response.json(file,{
        headers:{
            'content-type':'image/png'
        }
    })
}
