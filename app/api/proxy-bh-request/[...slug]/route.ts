import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{slug: string[]}> }) {
  try {
    const slug = (await params).slug;
    const bhPath = slug.join('/');
    const bhUrl = `https://biologhelp.pl/${bhPath}`;

    const headersToForward = ['user-agent', 'accept', 'accept-language'];
    const forwardedHeaders: Record<string, string> = {};
    headersToForward.forEach((header) => {
      const value = request.headers.get(header);
      if (value) forwardedHeaders[header] = value;
    });

    const bhResponse = await axios.get(bhUrl, {
      headers: forwardedHeaders,
      responseType: 'arraybuffer',
      validateStatus: () => true,
    });

    const responseHeaders: Record<string, string> = {};
    if (bhResponse.headers['content-type']) {
      responseHeaders['content-type'] = bhResponse.headers['content-type'];
    }
    responseHeaders['Access-Control-Allow-Origin'] = '*';

    return new NextResponse(bhResponse.data, {
      status: bhResponse.status,
      headers: responseHeaders,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
