# BambiFound — APK Build Report

## Overview
- **Build Date:** Sun Oct 11 2026
- **Tested Commit Hash:** `2eca63fc34e413f3e4b0fd20fbe9b7b17b836d59`
- **Packaging Technology:** Capacitor (`@capacitor/core` 8.5.3, `@capacitor/android` 8.5.3)
- **Application Name:** BambiFound
- **Application ID:** `com.bambifound.app`
- **Target Backend API:** `https://bambifound.onrender.com/api`

## Build Details & Artifact
- **Build Commands Executed:**
  ```bash
  cd client && npm ci
  cd client && VITE_API_URL=https://bambifound.onrender.com npm run build
  cd client && npx cap sync android
  cd client/android && ./gradlew assembleDebug
  mkdir -p release && cp client/android/app/build/outputs/apk/debug/app-debug.apk release/BambiFound.apk
  ```
- **Build Result:** SUCCESSFUL
- **APK Variant:** Debug APK (`app-debug.apk`)
- **Verified APK Path:** `/app/release/BambiFound.apk`
- **File Size:** 4,383,719 bytes (~4.18 MB)

## APK Metadata Verification (`aapt dump badging`)
- **Package Name:** `com.bambifound.app`
- **Version Code:** `1`
- **Version Name:** `1.0`
- **Min SDK Version:** `24` (Android 7.0)
- **Target SDK Version:** `36`
- **Main Launch Activity:** `com.bambifound.app.MainActivity`
- **Permissions:** `android.permission.INTERNET`, `com.bambifound.app.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION`
- **Validation Status:** PASSED (Valid APK structure & manifest parsed successfully)

## Backend Connectivity & Runtime Verification
- **Production Backend Endpoint:** `https://bambifound.onrender.com/api/health`
- **Health Check Response:** `{"status":"ok","timestamp":"2026-10-11T07:57:58.383Z","services":{"database":"connected"}}`
- **Emulation / Physical Device Status:** No attached Android device/emulator was available in the headless build environment (`adb devices` returned no attached devices).
- **Runtime Connectivity Assurance:** Built with `VITE_API_URL=https://bambifound.onrender.com` set in the Vite build environment prior to Capacitor asset synchronization, embedding production API routes for all user authentication, onboarding, matching, messaging, profile, and payment requests.

## Deployment Notes
- This debug `.apk` file is located at `release/BambiFound.apk` and is ready for manual upload to QubDrive.
