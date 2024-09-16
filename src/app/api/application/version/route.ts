import { NextRequest, NextResponse } from "next/server";

import { AppVersionQuery } from "@/lib/types";
import { URL_EXTERNAL_APP_VERSION } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export const revalidate = 60 * 60 * 24; // Cache for 1 day

export const GET = async (request: NextRequest): Promise<Response> => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_APP_VERSION);
		const data = await response.json();

		if (!data) {
			return NextResponse.error();
		}

		revalidatePath(request.url);

		return NextResponse.json<AppVersionQuery>({ version: data.name });
	} catch (error) {
		return NextResponse.error();
	}
};
