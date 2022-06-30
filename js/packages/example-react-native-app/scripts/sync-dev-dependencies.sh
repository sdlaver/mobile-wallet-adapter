#!/bin/sh

rsync -avz --delete --exclude '.git' --exclude 'node_modules' ../mobile-wallet-adapter-protocol ./node_modules/@solana-mobile/