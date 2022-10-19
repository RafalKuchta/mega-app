import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRoles} from "../auth/user.roles";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    email: string;

    @Column()
    pwdHash: string;

    @Column({
        nullable: true,
        default: null,
    })
    currentTokenId: string | null;

    @Column({
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.Reader,
    })
    roles: UserRoles;


}