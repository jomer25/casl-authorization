import { SetMetadata } from "@nestjs/common";
import { Subjects } from "src/casl/casl-ability.factory/casl-ability.factory";
import { Action } from "src/casl/enums/action.enum";

export interface RequiredRule {
  action: Action,
  subject: Subjects,
}

export const HANDLERS_KEY = 'your-key';

export const CaslAbility = (...handlers: RequiredRule[]) => 
  SetMetadata(HANDLERS_KEY, handlers)

export class CreateUserAbility implements RequiredRule {
  action: Action.Create;
  subject: Subjects;
}

export class ReadUserAbility implements RequiredRule {
  action: Action.Read;
  subject: Subjects;
}

export class UpdateUserAbility implements RequiredRule {
  action: Action.Update;
  subject: Subjects;
}

export class DeleteUserAbility implements RequiredRule {
  action: Action.Delete;
  subject: Subjects;
}

