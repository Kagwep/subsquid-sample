import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Counter {
    constructor(props?: Partial<Counter>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    count!: bigint

    @Column_("bytea", {nullable: false})
    lastIncrementer!: Uint8Array

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    lastIncrementTime!: bigint
}
