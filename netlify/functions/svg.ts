import { Config } from "@netlify/functions";
import { Base64_decode , URL_decode } from "./utils";

export default async (req: Request) => {

    let param = new URL(req.url).searchParams
    var data = Base64_decode( URL_decode( param.get('xml') || "") )

    return new Response(data,
        {headers:[['Content-Type','image/svg+xml;charset=utf-8']]}
    );

}

export const config:Config = {
    path: "/svg"
}