import { deleteItensRest, getItensByIdRest, updateItensRest } from "@/handlers/routes";
import { schemaItem, zodUpdate } from "@/schemas/zod_schemas";

export const GET = getItensByIdRest("genre");
export const PUT = updateItensRest("genre", schemaItem);
export const PATCH = updateItensRest("genre", zodUpdate(schemaItem));
export const DELETE = deleteItensRest("genre");
