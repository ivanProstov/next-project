import {NextRequest, NextResponse} from "next/server";
import {nameAccessToken, nameUsersInHeaders} from "@/utils/constants";

export function middlewareAuthAPI(request: NextRequest & {user?: Record<string, any>} ) {

    const token = request.cookies.get(nameAccessToken);
    if(!token) {
        return new NextResponse(JSON.stringify({ error: 'Invalid Token' }), { status: 401 })
    }
    const response = NextResponse.next();
    response.headers.set(nameUsersInHeaders, JSON.stringify({id: token.value, user: "ivolkov"}));
    return response;
}

