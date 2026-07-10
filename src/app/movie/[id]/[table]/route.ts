import { addItensToContentRest, getAllContentItemRest } from "@/handlers/routes";

export const GET = getAllContentItemRest("MOVIE");
export const POST = addItensToContentRest("MOVIE");
