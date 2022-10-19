import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Group} from "./group.entity";

@Entity()
export class Phone extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    name: string;

    @Column({
        length: 255,
    })
    surname: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    position: string;

    @Column({
        length: 255,
    })
    company: string;

    @Column({
        length: 15,
    })
    phone: string;

    @ManyToOne((type) => Group, (entity) => entity.phone, /*{eager: true}*/)
    @JoinColumn()
    groups: Group;

}
