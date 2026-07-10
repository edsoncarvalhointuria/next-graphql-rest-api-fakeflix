import { ERRORS } from "@/constants/errors";
import { HAL_ROUTES } from "@/constants/routes";
import { ContextOnlyId, linkSelf, linksEpisode, linksSeason } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaEpisodeId, schemaId, schemaSeason, zodUpdate } from "@/schemas/zod_schemas";
import { deleteBaseItens, updateBaseItens } from "@/service/base.service";
import { getSeasonByContentId, getSeasonById } from "@/service/season.service";
import { db } from "@/sql/seed";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schemaSeasonUpd = schemaSeason.omit({ episodes: true });
const updateSeason = (schema: z.ZodObject) => {
    return tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
        const [body, params] = await Promise.all([request.json(), context.params]);
        const { nextUrl } = request;

        const validateId = schemaId.parse(params);
        const validateBody = schema.parse(body);

        const result = await updateBaseItens("season", { ...validateBody, id: params.id });
        if (!result)
            throw new Error("Temporada não encontrada. Verifique o id presente na url.", {
                cause: ERRORS.NOT_FOUND_SQL,
            });
        const { serie_id, ...season } = result;
        const serie = await db.get("SELECT content_id FROM serie WHERE id = ?", serie_id);
        const response = {
            ...season,
            _links: linksSeason(nextUrl, validateId.id, serie.content_id),
        };

        return NextResponse.json({
            success: true,
            response,
            _links: linkSelf(nextUrl),
        });
    });
};

export const GET = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const params = await context.params;

    const { nextUrl } = request;
    const { episodeId } = schemaEpisodeId.parse({ episodeId: request.nextUrl.searchParams.getAll("episodeId") });

    schemaId.parse(params);

    const result = await getSeasonById(params.id, episodeId);

    if (!result)
        throw new Error("Temporada não encontrada. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });

    const { content_id, ...season } = result;
    const response = {
        ...season,
        episodes: result.episodes.map((v: Episode) => ({ ...v, _links: linksEpisode(nextUrl, v.id, v.season_id!) })),
        _links: linksSeason(nextUrl, params.id, content_id!),
    };

    return NextResponse.json({
        success: true,
        response,
        meta: { episodeId },
        _links: linkSelf(nextUrl),
    });
});

export const DELETE = tryCatchRest(async (request, context: ContextOnlyId) => {
    const params = await context.params;

    schemaId.parse(params);

    const response = await deleteBaseItens("season", { [`seasonId`]: params.id });

    if (!response)
        throw new Error("Temporada não encontrada. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
    return NextResponse.json({
        success: true,
        message: "A temporada e todas suas relações foram deletadas com sucesso.",
        _links: { collection: { href: `${request.nextUrl.origin}/season`, method: "GET" } },
    });
});

export const PUT = updateSeason(schemaSeasonUpd);

export const PATCH = updateSeason(zodUpdate(schemaSeasonUpd));
