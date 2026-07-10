import { ERRORS } from "@/constants/errors";
import { HAL_ROUTES } from "@/constants/routes";
import { ContextOnlyId, linkSelf, linksEpisode } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaEpisode, schemaId, zodUpdate } from "@/schemas/zod_schemas";
import { deleteBaseItens, getBaseItensById, updateBaseItens } from "@/service/base.service";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const updateEpisode = (schema: z.ZodObject) => {
    return tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
        const [body, params] = await Promise.all([request.json(), context.params]);

        const { nextUrl } = request;
        schemaId.parse(params);
        const validateBody = schema.parse(body);

        const result = await updateBaseItens("episode", { ...validateBody, id: params.id });
        if (!result)
            throw new Error("Nenhum episódio encontrado. Verifique o id presente na url.", {
                cause: ERRORS.NOT_FOUND_SQL,
            });

        const response = {
            ...result,
            _links: linksEpisode(nextUrl, result.id, result.season_id),
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

    schemaId.parse(params);

    const result = await getBaseItensById("episode", params.id);

    if (!result)
        throw new Error("Nenhum episódio encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
    const response = {
        ...result,
        _links: linksEpisode(nextUrl, params.id, result.season_id),
    };
    return NextResponse.json({
        success: true,
        response,
        _links: linkSelf(nextUrl),
    });
});

export const PUT = updateEpisode(schemaEpisode);

export const PATCH = updateEpisode(zodUpdate(schemaEpisode));

export const DELETE = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const params = await context.params;

    schemaId.parse(params);

    const response = await deleteBaseItens("episode", { ["episodeId"]: params.id });

    if (!response)
        throw new Error("Nenhum episódio encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
    return NextResponse.json({
        success: true,
        message: "Episódio deletado com Sucesso!",
        _links: { collection: { href: `${request.nextUrl.origin}/episode` }, method: "GET" },
    });
});
