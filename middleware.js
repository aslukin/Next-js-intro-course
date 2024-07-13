import { NextResponse } from 'next/server';
import { auth } from './app/_lib/auth';
/*
export function middleware(request) {
    const redirectTo = new URL('/about', request.url);
    return NextResponse.redirect(redirectTo);
}
*/

export const middleware = auth;

export const config = {
    matcher: ['/account'],
};
