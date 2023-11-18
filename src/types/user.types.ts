import { z } from "zod";
import { idValidation } from "../validations/generic.validation";
import { registerUserValidation, updateUserValidation } from "../validations/user.validation";

export namespace UserTypes {
  export type RegisterParams = z.infer<typeof registerUserValidation>;
  export type GetByIdParams = z.infer<typeof idValidation>;
	export type Filters = { name: string, email: string, enabled: string };
	export type UpdateParams = z.infer<typeof updateUserValidation>;
}
