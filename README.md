debug:
rm -rf /tmp/haste-map-metro-4-* && rm -rf android/.gradle/ && rm -rf android/app/build/ && watchman watch-del-all && watchman shutdown-server
npx react-native start --reset-cache
npx react-native run-android