import { URL_EXTERNAL_RETROREWIND_ROOMS } from "@/lib/constants";

export const GET = async (): Promise<Response> => {
	try {
		const response: Response = await fetch(URL_EXTERNAL_RETROREWIND_ROOMS);
		const data = await response.json();

		if (!data) {
			return Response.error();
		}

		return Response.json(data);
	} catch (error) {
		return Response.error();
	}
};
