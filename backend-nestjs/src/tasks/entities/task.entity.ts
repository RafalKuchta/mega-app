import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 1000
    })
    name: string;

    @Column({
        default: false,
    })
    completed: boolean;

    @Column({
        length: 255,
    })
    user: string;

}
