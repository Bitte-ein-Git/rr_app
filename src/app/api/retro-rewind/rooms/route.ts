import { URL_EXTERNAL_RETROREWIND_ROOMS } from "@/lib/constants";

export const GET = async () => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_RETROREWIND_ROOMS);
		const data = await response.json();

		if (!data) {
			Response.error();
		}

		return Response.json(data);
	} catch (error) {
		return Response.error();
	}
};
