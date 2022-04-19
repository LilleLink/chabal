#! /usr/bin/env node
import { program } from 'commander';
import { balance } from './commands/balance';
import { config } from './commands/config';

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