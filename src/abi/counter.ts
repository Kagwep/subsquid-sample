import * as p from '@subsquid/evm-codec'
import { event, fun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Increment: event("0xf89ba9265babdf755e28beeda55f79472828c97a7d2693710a513632e263d978", 'Increment(uint256,address,uint256)',{"newCount": p.uint256, "incrementer":indexed(p.address),"timestamp":p.uint256}),
}

export const functions = {
    getCount: fun('0xa87d942c', 'getCount()', {}, p.uint256),
    getLastIncrementTime: fun('0x93ccde02', 'getLastIncrementTime()', {}, p.uint256),
    getLastIncrementer: fun('0x9fcf48a4', 'getLastIncrementer()', {}, p.address),
    increment: fun('0xd09de08a', 'increment()', {}, undefined),
}

export class Contract extends ContractBase {

    getCount() {
        return this.eth_call(functions.getCount, {})
    }

    getLastIncrementer() {
        return this.eth_call(functions.getLastIncrementer, {})
    }

    getLastIncrementTime() {
        return this.eth_call(functions.getLastIncrementTime, {})
    }
}

/// Event types
export type IncrementEventArgs = EParams<typeof events.Increment>

export type GetCountParams = FunctionArguments<typeof functions.getCount>
export type GetCountReturn = FunctionReturn<typeof functions.getCount>

export type GetLastIncrementerParams = FunctionArguments<typeof functions.getLastIncrementer>
export type GetLastIncrementerReturn = FunctionReturn<typeof functions.getLastIncrementer>

export type GetLastIncrementTimeParams = FunctionArguments<typeof functions.getLastIncrementTime>
export type GetLastIncrementTimeReturn = FunctionReturn<typeof functions.getLastIncrementTime>