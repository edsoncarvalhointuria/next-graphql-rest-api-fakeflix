import { deleteItensRest, getItensByIdRest, updateItensRest } from "@/handlers/routes";
import { schemaItem, zodUpdate } from "@/schemas/zod_schemas";

export const GET = getItensByIdRest("cast");
export const PUT = updateItensRest("cast", schemaItem);
export const PATCH = updateItensRest("cast", zodUpdate(schemaItem));
export const DELETE = deleteItensRest("cast");
