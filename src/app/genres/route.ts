import { getItensRest, registerItensRest } from "@/handlers/routes";

export const GET = getItensRest("genre");
export const POST = registerItensRest("genre");
