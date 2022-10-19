import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Sm extends BaseEntity {
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
    })
    company: string;

    @Column({
        length: 15,
    })
    phone: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    group: string;

}
