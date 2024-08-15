import {EvmBatchProcessor} from '@subsquid/evm-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'

const CONTRACT_ADDRESS = '0x7c467a077F72c5ab2A65505fdcbBEd83A35D390b'.toLowerCase()

export const processor = new EvmBatchProcessor()
    .setGateway('https://v2.archive.subsquid.io/network/base-sepolia')
    .setRpcEndpoint({
        url: 'https://base-sepolia.g.alchemy.com/v2/mf855GPjQ_iHruHq_oPrQe8VNyUQ3xSx',
        rateLimit: 10
    })
    .setFinalityConfirmation(75)
    .setBlockRange({ from: 13979039 })
    .setFields({
        log: {
            topics: true,
            data: true,
        },
        transaction: {
            from: true,
            hash: true,
        },
    })
    .addLog({
        address: [CONTRACT_ADDRESS],
        topic0: [
            '0xf89ba9265babdf755e28beeda55f79472828c97a7d2693710a513632e263d978' // Increment event signature
        ]
    })

export const database = new TypeormDatabase()