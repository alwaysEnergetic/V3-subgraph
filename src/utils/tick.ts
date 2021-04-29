import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { bigDecimalExponated } from '.';
import { Tick } from '../types/schema'
import { Mint as MintEvent } from '../types/templates/Pool/Pool'
import { ONE_BD, ZERO_BD, ZERO_BI } from './constants';

export function createTick(tickId: string, tickIdx: i32, poolId: string, event: MintEvent): Tick {
    let tick = new Tick(tickId);
    tick.tickIdx = BigInt.fromI32(tickIdx)
    tick.pool = poolId;
    tick.poolAddress = poolId;

    tick.createdAtTimestamp = event.block.timestamp
    tick.createdAtBlockNumber = event.block.number
    tick.liquidityGross = ZERO_BD
    tick.liquidityNet = ZERO_BD
    tick.liquidityProviderCount = ZERO_BI

    tick.price0 = ONE_BD
    tick.price1 = ONE_BD

    // 1.0001^tick is token1/token0.
    let price0 = bigDecimalExponated(BigDecimal.fromString('1.0001'), BigInt.fromI32(tickIdx))
    tick.price0 = price0
    tick.price1 = ONE_BD.div(price0)

    tick.volumeToken0 = ZERO_BD
    tick.volumeToken1 = ZERO_BD
    tick.volumeUSD = ZERO_BD
    tick.untrackedVolumeUSD = ZERO_BD
    tick.collectedFeesToken0 = ZERO_BD
    tick.collectedFeesToken1 = ZERO_BD
    tick.collectedFeesUSD = ZERO_BD
    tick.liquidityProviderCount = ZERO_BI

    return tick;
}