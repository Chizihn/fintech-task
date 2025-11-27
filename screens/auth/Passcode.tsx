import React from "react";
import { PasscodeView } from "../../components/PasscodeView";

interface PasscodeProps {
  onNext: (passcode: string) => void;
  onBack: () => void;
}

export const Passcode: React.FC<PasscodeProps> = ({ onNext, onBack }) => {
  return (
    <PasscodeView
      title="Create a passcode"
      subtitle="Create a passcode for your app login"
      onComplete={onNext}
      onBack={onBack}
    />
  );
};
