#!/usr/bin/env node

/**
 * Hook that adds Firebase SPM dependencies to Package.swift after Capacitor sync.
 * Capacitor CLI manages this file and overwrites it on every sync.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageSwiftPath = path.join(__dirname, 'ios', 'App', 'CapApp-SPM', 'Package.swift');

if (!fs.existsSync(packageSwiftPath)) {
  console.error('[firebase-spm-hook] Package.swift not found');
  process.exit(0);
}

let content = fs.readFileSync(packageSwiftPath, 'utf8');

// Add Firebase package to dependencies
const firebasePackage = `        .package(url: "https://github.com/firebase/firebase-ios-sdk.git", exact: "11.10.0"),`;

if (!content.includes('firebase-ios-sdk')) {
  content = content.replace(
    /(\s+)(\.package\(name: "CapacitorApp")/,
    `$1${firebasePackage}\n$1$2`
  );
}

// Add Firebase products to target dependencies
const firebaseProducts = `                .product(name: "FirebaseCore", package: "firebase-ios-sdk"),
                .product(name: "FirebaseMessaging", package: "firebase-ios-sdk")`;

// Find the last product in the target dependencies and add Firebase after it
if (!content.includes('FirebaseCore')) {
  content = content.replace(
    /(\.product\(name: "CapacitorPushNotifications", package: "CapacitorPushNotifications"\))(\s+\]\))/,
    `$1,\n${firebaseProducts}\n$2`
  );
}

fs.writeFileSync(packageSwiftPath, content, 'utf8');
console.log('[firebase-spm-hook] Firebase SPM dependencies added to Package.swift');
