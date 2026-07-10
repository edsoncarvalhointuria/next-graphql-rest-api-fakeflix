import { getItensRest, registerItensRest } from "@/handlers/routes";

export const GET = getItensRest("creator");
export const POST = registerItensRest("creator");
