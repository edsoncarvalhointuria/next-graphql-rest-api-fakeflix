import { DEFAULT_LIMIT } from "@/constants/limit";
import { HAL_ROUTES } from "@/constants/routes";
import { linkSelf, linksSeason } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaLimitOffset } from "@/schemas/zod_schemas";
import { getSeasons } from "@/service/season.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = tryCatchRest(async (request: NextRequest) => {
    const { nextUrl } = request;
    const { limit, offset } = schemaLimitOffset.parse(Object.fromEntries(nextUrl.searchParams.entries()));

    const result = await getSeasons(limit, offset);

    const response = result.map((v) => {
        const { content_id, ...item } = v;
        return {
            ...item,
            _links: linksSeason(nextUrl, v.id, content_id!),
        };
    });

    return NextResponse.json({
        success: true,
        response,
        meta: { limit, offset },
        _links: linkSelf(nextUrl),
    });
});
