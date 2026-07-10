import { ERRORS } from "@/constants/errors";
import { ContextOnlyId, linkSelf, linksEpisode, linksSeason } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaId, schemaNumbersEpisodesId, schemaSeason } from "@/schemas/zod_schemas";
import { getSeasonByContentId, registerSeason } from "@/service/season.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const [body, params] = await Promise.all([request.json(), context.params]);
    const { nextUrl } = request;

    schemaId.parse(params);

    const validadeBody = schemaSeason.parse(body);

    const season = { ...validadeBody, content_id: params.id };
    const result = await registerSeason(season);

    if (!result)
        throw new Error("Série não encontrada. Verique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
    const response = {
        ...result,
        episodes: result.episodes.map((v: any) => ({ ...v, _links: linksEpisode(nextUrl, v.id, v.season_id) })),
        _links: linksSeason(nextUrl, result.id, params.id),
    };

    return NextResponse.json({ success: true, response, _links: linkSelf(nextUrl) }, { status: 201 });
});

export const GET = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const { nextUrl } = request;
    const params = await context.params;
    const validate = schemaNumbersEpisodesId.parse(
        Object.fromEntries(nextUrl.searchParams.keys().map((v) => [v, nextUrl.searchParams.getAll(v)])),
    );

    const numbers = validate.number;
    const episodeIds = validate.episodeId;

    schemaId.parse(params);

    const result = await getSeasonByContentId(params.id, numbers, episodeIds);

    if (!result)
        throw new Error("Série não encontrada. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });

    const response = {
        ...result,
        episodes: result.episodes.map((v: any) => ({ ...v, _links: linksEpisode(nextUrl, v.id, v.season_id) })),
        _links: linksSeason(nextUrl, result.id, params.id),
    };
    return NextResponse.json({ success: true, response, _links: linkSelf(nextUrl) });
});
