# Fintech App

A modern, high-performance fintech application built with React Native and Expo. This app features a sleek user interface, robust authentication flow, and a component-driven architecture using Tailwind CSS for styling.

## Features

- **Onboarding Flow**: Smooth onboarding experience for new users.
- **Authentication**:
  - **Phone Verification**: Secure phone number entry and verification.
  - **Email Registration**: Email capture and validation.
  - **Passcode Security**: Custom passcode creation with reveal animation and secure storage.
- **User Profile**:
  - **Personal Details**: Capture first, middle, and last names.
  - **Address Management**: Smart address search with two-state selection (Search & Detailed View).
  - **Review Screen**: Summary screen to verify user details before submission.
- **UI/UX**:
  - **Modern Design**: Clean aesthetics using Tailwind CSS.
  - **Interactive Elements**: Custom buttons, inputs with icon support, and smooth transitions.
  - **Responsive Layouts**: Optimized for various screen sizes with safe area handling.

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via NativeWind)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Icons**: [Expo Vector Icons](https://docs.expo.dev/guides/icons/) (Feather)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/client) app on your iOS or Android device (or an emulator).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd fintech
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npx expo start
```

- **Scan the QR code** with the Expo Go app (Android) or Camera app (iOS).
- Press `a` to open in Android Emulator.
- Press `i` to open in iOS Simulator.
- Press `w` to open in Web Browser.

## Project Structure

- **`app/`**: Application routes and layout (Expo Router).
- **`components/`**: Reusable UI components (`Button`, `Input`, `ScreenWrapper`, etc.).
- **`screens/`**: Feature-specific screens (`Address`, `Email`, `Passcode`, etc.).
- **`constants/`**: App-wide constants (Colors, Typography).
- **`assets/`**: Images and static resources.

## Key Components

- **`Input`**: A versatile text input component with support for icons, labels, and different layout modes (`top` vs `border` labels).
- **`PasscodeView`**: A specialized view for entering and creating passcodes with security animations.
- **`ScreenWrapper`**: A wrapper component that handles safe area insets and background colors consistently.
