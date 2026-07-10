import { DEFAULT_LIMIT } from "@/constants/limit";
import { linkSelf, linksItem, registerContentRest } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaSerie } from "@/schemas/zod_schemas";
import { getAllSerie } from "@/service/serie.service";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = registerContentRest("SERIE", schemaSerie);

export const GET = tryCatchRest(async (request: NextRequest) => {
    const { nextUrl } = request;
    const limit = Number(nextUrl.searchParams.get("limit")) || DEFAULT_LIMIT;
    const offset = Number(nextUrl.searchParams.get("offset")) || undefined;

    const result = await getAllSerie(limit, offset);

    const response = result?.map((v) => ({ ...v, _links: linksItem(nextUrl, "serie", v.id) }));

    return NextResponse.json({
        success: true,
        response,
        meta: { limit, offset },
        _links: linkSelf(nextUrl),
    });
});
