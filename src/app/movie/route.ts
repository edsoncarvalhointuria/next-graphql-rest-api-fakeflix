import { DEFAULT_LIMIT } from "@/constants/limit";
import { linkSelf, linksItem, registerContentRest } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaLimitOffset, schemaMovie } from "@/schemas/zod_schemas";
import { getAllMovie } from "@/service/movie.service";

import { NextResponse } from "next/server";

export const POST = registerContentRest("MOVIE", schemaMovie);

export const GET = tryCatchRest(async (request) => {
    const { nextUrl } = request;
    const { limit, offset } = schemaLimitOffset.parse(Object.fromEntries(nextUrl.searchParams.entries()));

    const result = await getAllMovie(limit, offset);

    const response = result?.map((v) => ({
        ...v,
        _links: linksItem(nextUrl, "movie", v.id),
    }));
    return NextResponse.json({
        success: true,
        response,
        meta: { limit, offset },
        _links: linkSelf(nextUrl),
    });
});
