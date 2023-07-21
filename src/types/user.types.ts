import { z } from "zod";
import { idValidation } from "~/validations/generic.validation";
import { registerUserValidation } from "~/validations/user.validation";

export namespace UserTypes {
  export type RegisterParams = z.infer<typeof registerUserValidation>
  export type GetByIdParams = z.infer<typeof idValidation>
}
