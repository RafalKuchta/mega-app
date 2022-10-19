import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {Phone} from "./phone.entity";

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    name: string;

    @OneToMany((type) => Phone, (entity) => entity.groups)
    phone: Phone;
}
