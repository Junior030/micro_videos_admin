import { validateSync } from "class-validator";
import { FieldsErrors, IValidatorFields } from "./validator-fields-interface";

export abstract class ClassValidatorFields<PropsValidated>
  implements IValidatorFields<PropsValidated>
{
  erros: FieldsErrors | null = null;
  validateData: PropsValidated | null = null;

  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.erros = {};
      for (const error of errors) {
        const field = error.property;
        this.erros[field] = Object.values(error.constraints!);
      }
    } else {
      this.validateData = data;
    }
    return !errors.length;
  }
}
