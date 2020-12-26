#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RuuviStack } from '../lib/ruuvi-stack';

const app = new cdk.App();
new RuuviStack(app, 'RuuviStack');
