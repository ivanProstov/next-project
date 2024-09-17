// utils/middlewares/middlewareAuth.js

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {routes} from "@/utils/router-config/routes";
import {nameAccessToken, nameUsersInHeaders} from "@/utils/constants";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";



export function middlewareAuth(request: NextRequest & {user?: Record<string, any>}) {
    const token = request.cookies.get(nameAccessToken);
    const isAuthenticated = checkAuth(request, token); // Ваша логика проверки аутентификации
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    const response = NextResponse.next();
    response.headers.set(nameUsersInHeaders, JSON.stringify({id: token?.value, user: "ivolkov"}));
    return response;
}

// Функция для проверки аутентификации
function checkAuth(request: NextRequest, token: RequestCookie | undefined) {

    const publicPaths = routes.map(({path}) => path);
    // Ваша логика проверки аутентификации
    if (publicPaths.includes(request.nextUrl.pathname) && !token) {
        return false
    }
    return true;
}
