// middleware.ts
import {NextRequest} from 'next/server';
import {middlewareHomeRedirect} from '@/utils/middlewares/middlewareHomeRedirect';
import {middlewareAuth} from "@/utils/middlewares/middlewareAuth";
import {middlewareLoginRedirect} from "@/utils/middlewares/middlewareLoginRedirect";
import {middlewareAuthAPI} from "@/utils/middlewares/middlewareAuthAPI";


export function middleware(request: NextRequest) {
    // if (request.nextUrl.pathname.startsWith('/api')) {
    //     return middlewareAuthAPI(request);
    // }
    //
    //
    // let response = middlewareLoginRedirect(request);
    // if (response.headers.get('x-middleware-next')) {
    //     response =  middlewareHomeRedirect(request);
    //     if (response.headers.get('x-middleware-next')) {
    //         response = middlewareAuth(request);
    //     }
    // }
    // return response;
}

