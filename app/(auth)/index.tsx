import React, { useState, useEffect } from "react";
import { View, LayoutAnimation, Platform, UIManager } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { useOnboardingStore } from "../../store/onboardingStore";

// Components
import { PhoneNumber } from "../../screens/auth/PhoneNumber";
import { Verify } from "../../screens/auth/Verify";
import { Passcode } from "../../screens/auth/Passcode";
import { Details } from "../../screens/auth/Details";
import { Email } from "../../screens/auth/Email";
import { Address } from "../../screens/auth/Address";
import { Check } from "../../screens/auth/Check";
import { Success } from "../../screens/auth/Success";
import { NotificationInfo } from "../../screens/auth/NotificationInfo";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

enum Step {
  PHONE,
  VERIFY,
  NOTIFICATION,
  PASSCODE,
  DETAILS,
  EMAIL,
  ADDRESS,
  CHECK,
  SUCCESS,
}

export default function SignupFlowScreen() {
  const router = useRouter();
  const { updateUser, login, user } = useOnboardingStore();
  const [step, setStep] = useState<Step>(Step.PHONE);
  const [tempData, setTempData] = useState<any>({});

  const changeStep = (newStep: Step) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(newStep);
  };

  const handleBack = () => {
    if (step === Step.PHONE) {
      router.back();
    } else {
      changeStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case Step.PHONE:
        return (
          <PhoneNumber
            onNext={(phoneNumber) => {
              setTempData({ ...tempData, phoneNumber });
              changeStep(Step.VERIFY);
            }}
            onBack={handleBack}
          />
        );
      case Step.VERIFY:
        return (
          <Verify
            phoneNumber={tempData.phoneNumber}
            onNext={() => changeStep(Step.NOTIFICATION)}
            onBack={handleBack}
          />
        );
      case Step.NOTIFICATION:
        return (
          <NotificationInfo
            onNext={() => changeStep(Step.PASSCODE)}
          />
        );
      case Step.PASSCODE:
        return (
          <Passcode
            onNext={(passcode) => {
              updateUser({ passcode });
              changeStep(Step.DETAILS);
            }}
            onBack={handleBack}
          />
        );
      case Step.DETAILS:
        return (
          <Details
            onNext={(details) => {
              updateUser(details);
              changeStep(Step.EMAIL);
            }}
            onBack={handleBack}
          />
        );
      case Step.EMAIL:
        return (
          <Email
            onNext={(email) => {
              updateUser({ email });
              changeStep(Step.ADDRESS);
            }}
            onBack={handleBack}
          />
        );
      case Step.ADDRESS:
        return (
          <Address
            onNext={(address) => {
              updateUser({ address });
              changeStep(Step.CHECK);
            }}
            onBack={handleBack}
          />
        );
      case Step.CHECK:
        return (
          <Check
            user={{ ...user, ...tempData }}
            onNext={() => {
              login({ ...user, ...tempData });
              changeStep(Step.SUCCESS);
            }}
            onBack={handleBack}
          />
        );
      case Step.SUCCESS:
        return (
          <Success
            onNext={() => router.replace("/")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenWrapper
      className={step === Step.PASSCODE ? "bg-[#1A3EEC]" : "bg-white"}
      backgroundColor={step === Step.PASSCODE ? "#1A3EEC" : undefined}
      useSafeArea={step !== Step.PASSCODE}
    >
      {renderStep()}
    </ScreenWrapper>
  );
}
