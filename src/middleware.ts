import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protect /admin routes
    if (path.startsWith('/admin') && path !== '/admin/login') {
        // Check for admin token in cookies
        const adminToken = request.cookies.get('admin_token')?.value;

        if (!adminToken) {
            // Redirect to admin login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Verify token (basic check - you can enhance with JWT verification)
        try {
            // In production, verify JWT token here
            // For now, we just check if it exists
            if (!adminToken || adminToken === '') {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
