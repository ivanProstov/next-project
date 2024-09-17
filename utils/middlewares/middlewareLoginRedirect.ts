import {NextRequest, NextResponse} from "next/server";
import {nameAccessToken} from "@/utils/constants";
import {Path} from "@/utils/router-config/routes";

export function middlewareLoginRedirect(request: NextRequest) {
    const token = request.cookies.get(nameAccessToken);
    if(request.nextUrl.pathname === '/login') {
        if(token){
            return NextResponse.redirect(new URL(Path.HOME, request.url));
        }

    }
    return NextResponse.next();
}