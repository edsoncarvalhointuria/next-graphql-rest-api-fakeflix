import { getContentItemByIdRest, removeItensFromContentRest } from "@/handlers/routes";

export const GET = getContentItemByIdRest("SERIE");
export const DELETE = removeItensFromContentRest("SERIE");
