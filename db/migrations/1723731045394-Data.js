module.exports = class Data1723731045394 {
    name = 'Data1723731045394'

    async up(db) {
        await db.query(`CREATE TABLE "counter" ("id" character varying NOT NULL, "count" numeric NOT NULL, "last_incrementer" bytea NOT NULL, "last_increment_time" numeric NOT NULL, CONSTRAINT "PK_012f437b30fcf5a172841392ef3" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "increment_event" ("id" character varying NOT NULL, "new_count" numeric NOT NULL, "incrementer" bytea NOT NULL, "timestamp" numeric NOT NULL, "block" numeric NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_04ba5c2a6d0f97e3787a43cdc65" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "counter"`)
        await db.query(`DROP TABLE "increment_event"`)
    }
}
