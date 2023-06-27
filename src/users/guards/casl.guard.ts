import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory/casl-ability.factory";
import { HANDLERS_KEY, RequiredRule } from "../decorators/casl-ability.decorators";
import { currentUser } from "../users.service";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.getAllAndOverride<RequiredRule[]>(HANDLERS_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // const { user } = context.switchToHttp().getRequest()
    const user = currentUser;
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      rules.forEach((rule) => 
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );

      return true;
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}