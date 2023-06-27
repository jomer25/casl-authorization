import { 
  AbilityBuilder, 
  ExtractSubjectType, 
  InferSubjects, 
  MongoAbility, 
  createMongoAbility
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "../enums/action.enum";
import { User } from "../classes/user.class";

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if(user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Create, User);
      can(Action.Read, User);
      cannot(Action.Update, User);
      cannot(Action.Delete, User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
