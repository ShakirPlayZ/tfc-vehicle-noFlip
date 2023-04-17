import * as alt from 'alt-client';
import * as native from 'natives';
import { TFC_VEHICLE_EVENTS } from '../../shared/events';
import { OwnedVehicle } from '@AthenaShared/interfaces/vehicleOwned';

let disableFlippingControls = false;
let everyTickControls: number;
let everyTickAttacks: number;

export class TfcVehicleDamageClient {
    static init() {
        alt.onServer(TFC_VEHICLE_EVENTS.CHECK_VEHICLE_ROT, this.checkRotation);
    }

    static checkRotation(player: alt.Player) {
        let currentRotation = native.getEntityRoll(player.vehicle.scriptID);

        if (currentRotation > 100 || currentRotation < -100) {
            //console.log('ROTATION: ', currentRotation);
            disableFlipping(true);
        } else {
            disableFlipping(false);
        }
    }
}

export function disableFlipping(value: boolean) {
    if (everyTickAttacks) {
        alt.clearInterval(everyTickAttacks);
        everyTickAttacks = null;
    }

    if (value) {
        everyTickAttacks = alt.setInterval(handleDisablingFlipps, 0);
        return;
    }
}

export function handleDisablingFlipps() {
    native.disableControlAction(2, 59, false); // Left Right
    native.disableControlAction(2, 60, false); // Up Down

    native.disableControlAction(0, 59, false); // Left Right
    native.disableControlAction(0, 60, false); // Up Down

    native.disableControlAction(0, 34, false);
    native.disableControlAction(0, 35, false);

    //native.disableControlAction(0, 63, false);
    //native.disableControlAction(0, 64, false);
}
