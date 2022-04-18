#! /usr/bin/env node
import { program } from 'commander';
import { balance } from './commands/balance.js';
import { config } from './commands/config.js';

// Balance command (default *)
program
    .command('get')
    .description('Get student union card balance')
    .action(balance);

// Configuration
program
    .command('config <cid> <password>')
    .description('Configure cid and password')
    .action(config);

program.parse();