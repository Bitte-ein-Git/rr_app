import { URL_EXTERNAL_RETROREWIND_VERSION } from "@/lib/constants";

export const GET = async () => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_RETROREWIND_VERSION);
		const data = await response.text();

		if (!data) {
			Response.error();
		}

		return Response.json({ version: data.split("\n").at(-1)!.split(" ")[0] });
	} catch (error) {
		return Response.error();
	}
};
