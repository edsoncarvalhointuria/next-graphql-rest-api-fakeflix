import { ERRORS } from "@/constants/errors";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const handleError = (err: any, link: string, origin: string) => {
    if (err instanceof SyntaxError)
        return NextResponse.json(
            {
                success: false,
                type: `${origin}/#models`,
                title: "O JSON está inválido",
                status: 400,
                detail: "O JSON enviado está inválido. Verifique se os campos estão preenchidos corretamente e tente novamente.",
                instance: link,
            },
            { status: 400 },
        );
    if (err instanceof z.ZodError)
        return NextResponse.json(
            {
                success: false,
                type: `${origin}/`,
                title: "Dados estão inválidos.",
                status: 400,
                detail: z.treeifyError(err),
                instance: link,
            },
            { status: 400 },
        );
    if (err.message.includes("UNIQUE constraint failed"))
        return NextResponse.json(
            {
                success: false,
                type: `${origin}/`,
                title: "Essa relação já existe.",
                status: 400,
                detail: "Essa relação já existe no banco de dados. Verifique os ids adicionados e tente novamente.",
                instance: link,
            },
            { status: 400 },
        );
    if (err.message.includes("SQLITE_CONSTRAINT: FOREIGN KEY constraint failed"))
        return NextResponse.json(
            {
                success: false,
                type: `${origin}/`,
                title: "Ids não encontrados.",
                status: 400,
                detail: "Uma das chaves de referência informadas não existe no sistema. Verifique os dados enviados ou o id presente na url.",
                instance: link,
            },
            { status: 400 },
        );
    if (err.cause === ERRORS.NOT_FOUND_SQL)
        return NextResponse.json(
            {
                success: false,
                type: `${origin}/`,
                title: "Não encontrado",
                status: 404,
                detail: err.message,
                instance: link,
            },
            { status: 404 },
        );

    console.log(err);

    return NextResponse.json(
        {
            success: false,
            type: "about:blank",
            title: "ERRO INTERNO",
            status: 500,
            detail: "Houve um erro interno, tente novamente ou entre em contato",
            instance: link,
        },
        { status: 500 },
    );
};

export const tryCatchRest = <T>(callback: (request: NextRequest, context: T) => any) => {
    return async (request: NextRequest, context: T) => {
        try {
            return await callback(request, context);
        } catch (err: any) {
            return handleError(err, request.nextUrl.href, request.nextUrl.origin);
        }
    };
};
