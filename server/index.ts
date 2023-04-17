import alt from 'alt-server';
import { TfcVehicleDamageServer } from './src/server';
import * as Athena from '@AthenaServer/api';

const PLUGIN_NAME = 'TFC Vehicle Damage';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, async () => {
    TfcVehicleDamageServer.init();
    alt.log(`~lg~${PLUGIN_NAME} successfully loaded.`);
});
