import { FetchedGitHubRelease } from "@/lib/types/server";
import { NextResponse } from "next/server";
import { URL_EXTERNAL_APP_VERSION } from "@/lib/constants";
import { Version } from "@/lib/types";

export const GET = async (): Promise<Response> => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_APP_VERSION, { next: { revalidate: 3600 } });
		const data: FetchedGitHubRelease = await response.json();

		if (!data) {
			return NextResponse.error();
		}

		return NextResponse.json<Version>({ version: data.name });
	} catch (error) {
		return NextResponse.error();
	}
};
