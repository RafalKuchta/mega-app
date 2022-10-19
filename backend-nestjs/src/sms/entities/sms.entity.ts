import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Sms extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    name: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    surname: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    company: string;

    @Column({
        length: 15,
        default: null,
    })
    phone: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    group: string;

    @Column({
        length: 255,
    })
    sms: string;

    @Column({
        type: 'datetime',
        default: () => 'NOW()',
    })
    created_at: string;

}
