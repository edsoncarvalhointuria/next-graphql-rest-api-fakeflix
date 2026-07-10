import { getContentItemByIdRest, removeItensFromContentRest } from "@/handlers/routes";

export const GET = getContentItemByIdRest("MOVIE");
export const DELETE = removeItensFromContentRest("MOVIE");
