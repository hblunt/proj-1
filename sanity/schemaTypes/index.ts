import { type SchemaTypeDefinition } from "sanity";

import { Author } from "./author";
import { Startup } from "./startup";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Author, Startup],
};
