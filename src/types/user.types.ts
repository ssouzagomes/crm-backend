import { z } from "zod";
import { registerUserValidation } from "~/validations/user.validation";

export namespace UserTypes {
  export type RegisterParams = z.infer<typeof registerUserValidation>
}