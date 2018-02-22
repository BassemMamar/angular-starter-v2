import { UserRole, AccessLevel } from './user-roles.enum';


export class ModuleAuthorizationInfo {
    name: string;
    rolesAccess: RolesAccess[];
    pages: PageAuthorizationInfo[];
}

export class RolesAccess {
    role: UserRole;
    accessLevel: AccessLevel;
}

export class PageAuthorizationInfo {
    name: string;
    rolesAccess: RolesAccess[];
}
