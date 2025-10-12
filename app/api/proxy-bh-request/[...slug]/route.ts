import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{slug: string[]}> }) {
  try {
    const slug = (await params).slug;
    const bhPath = slug.join('/');
    const bhUrl = `https://biologhelp.pl/${bhPath}`;
    
    const forwardedHeaders: Record<string, string> = {
      'User-Agent': request.headers.get('user-agent') || '',
      'Accept': request.headers.get('accept') || '*/*',
    };
    
    const bhResponse = await axios.get(bhUrl, {
      headers: forwardedHeaders,
      responseType: 'arraybuffer',
      validateStatus: () => true,  
    });
    
    const contentType = bhResponse.headers['content-type'] || 'application/octet-stream';

    return new NextResponse(bhResponse.data, {
      status: bhResponse.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

