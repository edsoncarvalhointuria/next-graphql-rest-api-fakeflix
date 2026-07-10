import { deleteItensRest, getItensByIdRest, updateItensRest } from "@/handlers/routes";
import { schemaItem, zodUpdate } from "@/schemas/zod_schemas";

export const GET = getItensByIdRest("creator");
export const PUT = updateItensRest("creator", schemaItem);
export const PATCH = updateItensRest("creator", zodUpdate(schemaItem));
export const DELETE = deleteItensRest("creator");
