import { ERRORS } from "@/constants/errors";
import { ContextOnlyId, linkSelf, linksEpisode } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaEpisode, schemaId, schemaNumbersEpisodesId } from "@/schemas/zod_schemas";
import { getEpisodesBySeasonId, registerEpisode } from "@/service/episode.service";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GET = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const params = await context.params;
    const { nextUrl } = request;

    const { episodeId, number } = schemaNumbersEpisodesId.parse(
        Object.fromEntries(nextUrl.searchParams.keys().map((v) => [v, nextUrl.searchParams.getAll(v)])),
    );

    schemaId.parse(params);

    const result = await getEpisodesBySeasonId([params.id], number, episodeId);

    if (!result.length)
        throw new Error("Nenhum episódio encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });

    const response = result.map((v) => ({ ...v, _links: linksEpisode(nextUrl, v.id, v.season_id) }));
    return NextResponse.json({
        success: true,
        meta: {
            episodeId,
            number,
        },
        response,
        _links: linkSelf(nextUrl),
    });
});

export const POST = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const [body, params] = await Promise.all([request.json(), context.params]);

    schemaId.parse(params);

    const validateBody = schemaEpisode.extend({ key: z.string("A key está inválida. Ex: key:'s1e2'") }).parse(body);

    const result = await registerEpisode({ ...validateBody, season_id: params.id });

    if (!result)
        throw new Error("Temporada não encontrada. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
    const response = {
        ...result,
        _links: linksEpisode(request.nextUrl, result.id, result.season_id!),
    };
    return NextResponse.json({
        success: true,
        response,
        _links: linkSelf(request.nextUrl),
    });
});
