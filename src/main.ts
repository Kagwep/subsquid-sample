import {TypeormDatabase} from '@subsquid/typeorm-store'
import {processor} from './processor'
import {Counter, IncrementEvent} from './model'

function hexToBigInt(hex: string): bigint {
    if (hex.startsWith('0x')) {
        hex = hex.slice(2);
    }
    return hex ? BigInt(`0x${hex}`) : BigInt(0);
}

function hexToUint8Array(hex: string): Uint8Array {
    if (hex.startsWith('0x')) {
        hex = hex.slice(2);
    }
    return Uint8Array.from(Buffer.from(hex, 'hex'));
}

processor.run(new TypeormDatabase(), async (ctx) => {
    const counterAddress = '0x7c467a077F72c5ab2A65505fdcbBEd83A35D390b'.toLowerCase()
    
    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            if (log.address === counterAddress && log.topics[0] === '0xf89ba9265babdf755e28beeda55f79472828c97a7d2693710a513632e263d978') {
                console.log('Processing Increment event:', log);

                // Decode the event data
                // Assuming the event structure is: Increment(uint256 newCount, uint256 timestamp)
                // with the incrementer as the second topic
                const newCount = hexToBigInt(log.data.slice(0, 66));
                const timestamp = hexToBigInt('0x' + log.data.slice(66));
                const incrementer = log.topics[1]; // The incrementer is the second topic

                console.log('Decoded event data:', { newCount, incrementer, timestamp });

                if (!log.transaction) {
                    console.warn('Transaction data is missing for log:', log.id);
                }

                // Update Counter entity
                let counter = await ctx.store.get(Counter, counterAddress)
                if (!counter) {
                    counter = new Counter({
                        id: counterAddress,
                        count: 0n,
                        lastIncrementer: new Uint8Array(20),
                        lastIncrementTime: 0n
                    })
                }
                counter.count = newCount
                counter.lastIncrementer = hexToUint8Array(incrementer)
                counter.lastIncrementTime = timestamp
                await ctx.store.save(counter)

                // Create IncrementEvent entity
                const event = new IncrementEvent({
                    id: log.id,
                    newCount: newCount,
                    incrementer: hexToUint8Array(incrementer),
                    timestamp: timestamp,
                    block: BigInt(block.header.height),
                    transactionHash: log.transaction?.hash || ''
                })
                await ctx.store.save(event)

                console.log('Saved event:', event);
            }
        }
    }
})