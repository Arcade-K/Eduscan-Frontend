# 📱 Building APK and IPA Files for Client Distribution

## Overview
This guide will help you create production-ready APK (Android) and IPA (iOS) files for your Brainly Clone app.

## Prerequisites

### 1. Install Required Tools
```bash
# Install Expo CLI globally (if you have permission issues, use npx)
npm install -g @expo/cli

# Or use npx for each command (recommended)
npx @expo/cli --version
```

### 2. Set Up Expo Account
1. Create an account at [expo.dev](https://expo.dev)
2. Login in your terminal:
```bash
npx expo login
```

## 🔧 Configuration Updates

### Update app.json for Production
Your current `app.json` needs some updates for production builds:

```json
{
  "expo": {
    "name": "Brainly Clone",
    "slug": "brainly-clone",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.brainlyclone",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.yourcompany.brainlyclone",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-barcode-scanner"
    ],
    "extra": {
      "eas": {
        "projectId": "your-project-id-here"
      }
    }
  }
}
```

## 🚀 Building APK (Android)

### Method 1: Using EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Build APK for Android
eas build --platform android --profile preview
```

### Method 2: Local Build (Advanced)
```bash
# Generate Android project
npx expo run:android

# Build APK locally
cd android
./gradlew assembleRelease
```

## 🍎 Building IPA (iOS)

### Method 1: Using EAS Build (Recommended)
```bash
# Build IPA for iOS
eas build --platform ios --profile preview
```

### Method 2: Local Build (Requires macOS + Xcode)
```bash
# Generate iOS project
npx expo run:ios

# Open in Xcode and build
open ios/YourApp.xcworkspace
```

## 📋 Step-by-Step Build Process

### 1. Prepare Your Project
```bash
# Stop development servers
pkill -f "expo start"
pkill -f "node src/index.js"

# Clean and install dependencies
rm -rf node_modules
npm install

# Update app.json with production settings
```

### 2. Configure EAS Build
```bash
# Initialize EAS
npx eas build:configure

# This creates eas.json with build profiles
```

### 3. Build for Android
```bash
# Build APK
npx eas build --platform android --profile preview

# Or build AAB (Google Play Store format)
npx eas build --platform android --profile production
```

### 4. Build for iOS
```bash
# Build IPA
npx eas build --platform ios --profile preview

# Or build for App Store
npx eas build --platform ios --profile production
```

## 🔐 Signing and Certificates

### Android Signing
- EAS Build handles signing automatically
- For local builds, you'll need a keystore

### iOS Signing
- Requires Apple Developer Account ($99/year)
- EAS Build can manage certificates automatically
- Or use manual certificate management

## 📦 Distribution Options

### APK Distribution
1. **Direct APK**: Send APK file directly to clients
2. **Google Play Store**: Upload AAB file to Play Console
3. **Enterprise Distribution**: Use MDM solutions

### IPA Distribution
1. **TestFlight**: Apple's beta testing platform
2. **App Store**: Submit for public distribution
3. **Enterprise Distribution**: Requires Enterprise Developer Account
4. **Ad Hoc Distribution**: Limited to 100 devices

## 🛠️ Build Profiles (eas.json)

Create `eas.json` in your project root:

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## 🚨 Important Notes

### Before Building
1. **Update Version Numbers**: Increment version in app.json
2. **Test Thoroughly**: Ensure all features work
3. **Backend Configuration**: Update API URLs for production
4. **Environment Variables**: Set production environment variables

### Production Considerations
1. **API Endpoints**: Update to production server URLs
2. **Database**: Use production database
3. **Security**: Enable HTTPS, update CORS settings
4. **Performance**: Optimize images and assets

## 📱 Quick Start Commands

```bash
# 1. Install EAS CLI
npm install -g @expo/eas-cli

# 2. Login to Expo
eas login

# 3. Configure build
eas build:configure

# 4. Build APK
eas build --platform android --profile preview

# 5. Build IPA
eas build --platform ios --profile preview
```

## 🔍 Troubleshooting

### Common Issues
1. **Permission Errors**: Use `npx` instead of global installs
2. **Build Failures**: Check app.json configuration
3. **Signing Issues**: Verify certificates and provisioning profiles
4. **Network Issues**: Ensure stable internet connection

### Getting Help
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Discord Community](https://chat.expo.dev/)

## 📊 Build Status
After starting a build, you can:
- Monitor progress at [expo.dev](https://expo.dev)
- Download builds when complete
- Share download links with clients

## 🎯 Next Steps
1. Set up EAS Build account
2. Configure build profiles
3. Test with preview builds
4. Create production builds
5. Distribute to clients

Remember: EAS Build runs in the cloud, so you don't need Android Studio or Xcode installed locally!
