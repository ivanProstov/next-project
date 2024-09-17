import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {Path} from "@/utils/router-config/routes";

export function middlewareHomeRedirect(request: NextRequest) {

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL(Path.HOME, request.url));
    }
    return NextResponse.next();
}
