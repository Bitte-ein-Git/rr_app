import { NextRequest, NextResponse } from "next/server";

import { URL_EXTERNAL_RETROREWIND_VERSION } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export const GET = async (request: NextRequest): Promise<Response> => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_RETROREWIND_VERSION);
		const data = await response.text();

		if (!data) {
			return NextResponse.error();
		}

		revalidatePath(request.url);

		return NextResponse.json({ version: data.split("\n").at(-1)!.split(" ")[0] });
	} catch (error) {
		return NextResponse.error();
	}
};
