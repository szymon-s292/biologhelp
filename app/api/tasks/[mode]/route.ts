import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: Promise<{ mode: string }> }) {
  const mode = (await params).mode;
  const body = await req.json();

  if (!mode || !(mode === 'biology' || mode === 'chemistry')) {
    return NextResponse.json(null, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || 1;

  const axiosParams: { [key: string]: any } = {
    page: Number(page),
    items_per_page: 10,
    view_name: 'tasks_browser',
    view_display_id: mode === 'biology' ? 'biology_page' : 'chemistry_page',
    view_base_path: 'matura',
    pager_element: 0,
  };

  if (body?.categories && Array.isArray(body.categories)) {
    axiosParams['kategoria[]'] = body.categories;
  }

  try {
    const response = await axios.get('https://biologhelp.pl/views/ajax', {
      params: axiosParams,
      headers: {
        'User-Agent': 'PostmanRuntime/7.48.0',
      },
      paramsSerializer: params => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
          } else {
            searchParams.append(key, value);
          }
        });
        return searchParams.toString();
      }
    });

    if (response.status !== 200) {
      return NextResponse.json(null, { status: 503 });
    }

    const data = response.data;
    let result = "";

    if (Array.isArray(data)) {
      const insert = data.filter((o: any) => o.command === "insert");
      try {
        result = JSON.stringify(insert[0]?.data);
      } catch (err) {
        return NextResponse.json(null, { status: 500 });
      }
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
