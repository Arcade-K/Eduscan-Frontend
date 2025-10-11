#!/bin/bash

echo "🚀 Brainly Clone - Build Script"
echo "================================"

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g @expo/eas-cli
fi

# Check if user is logged in
if ! eas whoami &> /dev/null; then
    echo "🔐 Please login to Expo:"
    eas login
fi

echo ""
echo "🔧 Configuring EAS Build..."
eas build:configure

echo ""
echo "📱 Choose build platform:"
echo "1) Android APK"
echo "2) iOS IPA"
echo "3) Both platforms"
echo "4) Cancel"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🤖 Building Android APK..."
        eas build --platform android --profile preview
        ;;
    2)
        echo "🍎 Building iOS IPA..."
        eas build --platform ios --profile preview
        ;;
    3)
        echo "📱 Building for both platforms..."
        echo "🤖 Building Android APK..."
        eas build --platform android --profile preview
        echo "🍎 Building iOS IPA..."
        eas build --platform ios --profile preview
        ;;
    4)
        echo "❌ Build cancelled."
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Build process started!"
echo "📊 Monitor progress at: https://expo.dev"
echo "📧 You'll receive an email when builds are complete."
echo ""
echo "📋 Next steps:"
echo "1. Wait for build completion (5-15 minutes)"
echo "2. Download APK/IPA files from Expo dashboard"
echo "3. Test on devices"
echo "4. Distribute to clients"
