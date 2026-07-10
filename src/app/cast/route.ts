import { getItensRest, registerItensRest } from "@/handlers/routes";

export const GET = getItensRest("cast");
export const POST = registerItensRest("cast");
