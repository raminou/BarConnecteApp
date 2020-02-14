# BarConnecteApp

## Dependencies
Tested on node 10.18.1
This need multiple softwares. Use this tutorial [https://facebook.github.io/react-native/docs/getting-started](https://facebook.github.io/react-native/docs/getting-started) in the section **React Native CLI Quickstart**.

DO NOT USE **EXPO CLI Quickstart**.

After that, install the node dependencies: `npm install`.

Configure the *.env* file by copying *.env.test* file and modifying it.

## Run

After installing the dependencies, the app should be able to build.

You have to 2 consoles:

- `./start.sh`: to start the development server. This script reset everything related to watchman and adb, to prevent bugs which often occure during the project
- `npx react-native run-android`: to run the app on the Android Smartphone. It can be an emulator or a real device. If it is a real device make sure that the *Developer Options* are enable. It can be check by running `adb devices`.
