import {RolesBuilder} from "nest-access-control";


export enum UserRoles {
    Admin = 'admin',
    Reader = 'reader',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(UserRoles.Reader)
    .readAny(['posts'])
    .grant(UserRoles.Admin)
    .extend(UserRoles.Reader)
    .updateAny(['posts'])
    .deleteAny('posts')