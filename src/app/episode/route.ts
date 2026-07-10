import { linkSelf, linksEpisode } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaLimitOffset } from "@/schemas/zod_schemas";
import { getEpisodes } from "@/service/episode.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = tryCatchRest(async (params: NextRequest) => {
    const { nextUrl } = params;

    const { limit, offset } = schemaLimitOffset.parse(Object.fromEntries(nextUrl.searchParams.entries()));

    const result = (await getEpisodes(limit, offset)) as Episode[];

    const response = result.map((v) => ({
        ...v,
        _links: linksEpisode(nextUrl, v.id, v.season_id!),
    }));
    return NextResponse.json({
        success: true,
        response,
        meta: { limit, offset },
        _links: linkSelf(nextUrl),
    });
});
