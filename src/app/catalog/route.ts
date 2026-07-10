import { DEFAULT_LIMIT } from "@/constants/limit";
import { HAL_ROUTES } from "@/constants/routes";
import { linkSelf } from "@/handlers/routes";
import { schemaCatalogParams } from "@/schemas/zod_schemas";
import { getCatalogRest } from "@/service/catalog.service";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
    const { nextUrl } = request;
    const params = Object.fromEntries(
        nextUrl.searchParams.keys().map((v) => [v, nextUrl.searchParams.getAll(v)]),
    ) as Partial<CatalogQuerys>;
    const validate = schemaCatalogParams.parse(params);
    try {
        const result = (await getCatalogRest(validate)) as (Serie | Movie)[];
        const response = result.map((v) => {
            const type = v.type.toLowerCase() as "serie" | "movie";
            return {
                ...v,
                _links: {
                    self: {
                        href: `${nextUrl.origin}${HAL_ROUTES.update[type](v.id)}`,
                        method: "GET",
                    },
                    update: {
                        href: `${nextUrl.origin}${HAL_ROUTES.update[type](v.id)}`,
                        method: ["POST", "PATCH"],
                    },
                    delete: {
                        href: `${nextUrl.origin}${HAL_ROUTES.delete[type](v.id)}`,
                        method: "DELETE",
                    },
                    post: {
                        href: `${nextUrl.origin}${HAL_ROUTES.post[type]()}`,
                        method: "POST",
                    },
                },
            };
        });
        return NextResponse.json({
            success: true,
            response,
            meta: { limit: DEFAULT_LIMIT, ...validate },
            _links: linkSelf(nextUrl),
        });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
