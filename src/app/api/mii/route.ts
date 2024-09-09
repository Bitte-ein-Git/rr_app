import { URL_EXTERNAL_MII_IMAGE, URL_EXTERNAL_MII_STUDIO } from "@/lib/constants";
import { arrayBufferToBase64, base64ToBlob, blobToBase64Async } from "@/lib/util";

import { NextRequest } from "next/server";

export const GET = async (request: NextRequest): Promise<Response> => {
	try {
		const data = request.nextUrl.searchParams.get("data");

		if (!data) {
			return Response.error();
		}

		const formData: FormData = new FormData();
		formData.append("platform", "wii");
		formData.append("data", new Blob([Buffer.from(data, "base64")]), "mii.dat");

		const studioResponse: Response = await fetch(URL_EXTERNAL_MII_STUDIO, {
			method: "POST",
			body: formData,
		});
		const studioJson = await studioResponse.json();

		if (!studioResponse.ok || !studioJson) {
			return Response.error();
		}

		const searchParams: URLSearchParams = new URLSearchParams();
		searchParams.append("data", studioJson.mii);
		searchParams.append("bgColor", "FFFFFF00");
		searchParams.append("cameraXRotate", "0");
		searchParams.append("cameraYRotate", "0");
		searchParams.append("cameraZRotate", "0");
		searchParams.append("characterXRotate", "0");
		searchParams.append("characterYRotate", "0");
		searchParams.append("characterZRotate", "0");
		searchParams.append("clothesColor", "default");
		searchParams.append("expression", "normal");
		searchParams.append("instanceCount", "1");
		searchParams.append("instanceRotationMode", "model");
		searchParams.append("lightDirectionMode", "none");
		searchParams.append("type", "face");
		searchParams.append("width", "270");

		const imageResponse: Response = await fetch(`${URL_EXTERNAL_MII_IMAGE}?${searchParams.toString()}`);
		const imageBuffer = await imageResponse.arrayBuffer();

		if (!imageResponse.ok || !imageBuffer) {
			return Response.error();
		}

		return Response.json({
			image: Buffer.from(imageBuffer).toString("base64"),
		});
	} catch (error) {
		return Response.error();
	}
};
