import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	// Set CORS header
	response.headers.set("Access-Control-Allow-Origin", "*");
	response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
	response.headers.set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization",
	);

	// Handle preflight
	if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 204,
			headers: response.headers,
		});
	}

	return response;
}
