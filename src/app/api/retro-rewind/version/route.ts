import { NextResponse } from "next/server";
import { URL_EXTERNAL_RETROREWIND_VERSION } from "@/lib/constants";
import { Version } from "@/lib/types";

export const GET = async (): Promise<Response> => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_RETROREWIND_VERSION, {
			next: { revalidate: 3600 },
		});
		const data: string = await response.text();

		if (!data) {
			return NextResponse.error();
		}

		return NextResponse.json<Version>({ version: data.split("\n").at(-1)!.split(" ")[0] });
	} catch (error) {
		return NextResponse.error();
	}
};
