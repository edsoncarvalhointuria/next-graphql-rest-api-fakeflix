import { ERRORS } from "@/constants/errors";
import { DEFAULT_LIMIT } from "@/constants/limit";
import {
    ContextOnlyId,
    deleteContentRest,
    linkSelf,
    linksEpisode,
    linksItem,
    linksSeason,
    updateContentRest,
} from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaContentBase, schemaId, schemaLimitOffsetSeason, zodUpdate } from "@/schemas/zod_schemas";
import { getSerie } from "@/service/serie.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const params = await context.params;
    const { nextUrl } = request;

    schemaId.parse(params);

    const { limitSeason, offsetSeason } = schemaLimitOffsetSeason.parse(
        Object.fromEntries(nextUrl.searchParams.entries()),
    );

    const result = await getSerie(params.id, limitSeason, offsetSeason);

    if (!result)
        throw new Error("Série não encontrada. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
    const response = {
        ...result,
        cast: result.cast.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "cast", v.id) })),
        genres: result.genres.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "genre", v.id) })),
        creators: result.creators.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "creator", v.id) })),
        serieData: {
            ...result.serieData,
            seasons: result.serieData.seasons.map((v: any) => ({
                ...v,
                _links: linksSeason(nextUrl, v.id, result.id),
                episodes: v.episodes.map((v: any) => ({ ...v, _links: linksEpisode(nextUrl, v.id, v.season_id!) })),
            })),
        },
        _links: linksItem(nextUrl, "serie", result.id),
    };
    return NextResponse.json({
        success: true,
        response,
        meta: { limitSeason, offsetSeason },
        _links: linkSelf(nextUrl),
    });
});

export const PUT = updateContentRest("SERIE", schemaContentBase);
export const PATCH = updateContentRest("SERIE", zodUpdate(schemaContentBase));

export const DELETE = deleteContentRest("SERIE");
