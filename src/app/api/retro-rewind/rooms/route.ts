import { NextRequest, NextResponse } from "next/server";

import { RetroRewindRoomsQuery } from "@/lib/types";
import { URL_EXTERNAL_RETROREWIND_ROOMS } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export const revalidate = 15; // Cache for 15ec

export const GET = async (request: NextRequest): Promise<Response> => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_RETROREWIND_ROOMS);
		const data = await response.json();

		if (!data) {
			return NextResponse.error();
		}

		revalidatePath(request.url);

		return NextResponse.json<RetroRewindRoomsQuery>(data);
	} catch (error) {
		return NextResponse.error();
	}
};
