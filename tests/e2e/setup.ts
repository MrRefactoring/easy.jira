import * as dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TelemetryClient } from 'telemetry.jira.js';

dotenv.config();

TelemetryClient.prototype.sendTelemetry = () => Promise.resolve();
