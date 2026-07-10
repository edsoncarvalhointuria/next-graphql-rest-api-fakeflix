import { ERRORS } from "@/constants/errors";
import { ContextOnlyId, deleteContentRest, linkSelf, linksItem, updateContentRest } from "@/handlers/routes";
import { tryCatchRest } from "@/handlers/wrapper";
import { schemaContentBase, schemaId, schemaMovieData, zodUpdate } from "@/schemas/zod_schemas";
import { getMovie } from "@/service/movie.service";
import { NextRequest, NextResponse } from "next/server";

const schema = schemaContentBase.extend({
    movieData: schemaMovieData,
});

export const GET = tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
    const params = await context.params;
    const { nextUrl } = request;

    schemaId.parse(params);
    const result = await getMovie(params.id);

    if (!result)
        throw new Error("Filme não encontrado. Verifique o id presente na url", { cause: ERRORS.NOT_FOUND_SQL });

    const response = {
        ...result,
        cast: result.cast.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "cast", v.id) })),
        genres: result.genres.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "genre", v.id) })),
        creators: result.creators.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "creator", v.id) })),
        _links: linksItem(nextUrl, "movie", result.id),
    };

    return NextResponse.json({ success: true, response, _links: linkSelf(nextUrl) });
});

export const PUT = updateContentRest("MOVIE", schema);
export const PATCH = updateContentRest("MOVIE", zodUpdate(schema));
export const DELETE = deleteContentRest("MOVIE");
