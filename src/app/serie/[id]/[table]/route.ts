import { addItensToContentRest, getAllContentItemRest } from "@/handlers/routes";

export const GET = getAllContentItemRest("SERIE");
export const POST = addItensToContentRest("SERIE");
