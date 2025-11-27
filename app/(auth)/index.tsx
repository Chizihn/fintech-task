import React, { useState } from "react";
import { View } from "react-native";
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

enum Step {
  PHONE,
  VERIFY,
  PASSCODE,
  DETAILS,
  EMAIL,
  ADDRESS,
  CHECK,
  SUCCESS,
}

export default function SignupScreen() {
  const router = useRouter();
  const { updateUser, login, user } = useOnboardingStore();
  const [step, setStep] = useState<Step>(Step.PHONE);
  const [tempData, setTempData] = useState<any>({});

  const handleBack = () => {
    if (step === Step.PHONE) {
      router.back();
    } else {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case Step.PHONE:
        return (
          <PhoneNumber
            onNext={(phoneNumber) => {
              setTempData({ ...tempData, phoneNumber });
              setStep(Step.VERIFY);
            }}
            onBack={handleBack}
          />
        );
      case Step.VERIFY:
        return (
          <Verify
            phoneNumber={tempData.phoneNumber}
            onNext={() => setStep(Step.PASSCODE)}
            onBack={handleBack}
          />
        );
      case Step.PASSCODE:
        return (
          <Passcode
            onNext={(passcode) => {
              updateUser({ passcode });
              setStep(Step.DETAILS);
            }}
            onBack={handleBack}
          />
        );
      case Step.DETAILS:
        return (
          <Details
            onNext={(details) => {
              updateUser(details);
              setStep(Step.EMAIL);
            }}
            onBack={handleBack}
          />
        );
      case Step.EMAIL:
        return (
          <Email
            onNext={(email) => {
              updateUser({ email });
              setStep(Step.ADDRESS);
            }}
            onBack={handleBack}
          />
        );
      case Step.ADDRESS:
        return (
          <Address
            onNext={(address) => {
              updateUser({ address });
              setStep(Step.CHECK);
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
              setStep(Step.SUCCESS);
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

  return <ScreenWrapper className="bg-white">{renderStep()}</ScreenWrapper>;
}
