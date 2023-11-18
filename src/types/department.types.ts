import { z } from "zod";
import { createDepartmentValidation } from "../validations/department.validation";

export namespace DepartmentTypes {
	export type CreateDepartmentParams = z.infer<typeof createDepartmentValidation>
}
