import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CountryPickerModal, countries } from "../../components/CountryPickerModal";
import { ScreenHeader } from "../../components/ScreenHeader";

interface PhoneNumberProps {
  onNext: (phoneNumber: string) => void;
  onBack: () => void;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({ onNext, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to UK

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        bounces={false}
      >
        <ScreenHeader onBack={onBack} />

        <View className="mt-4 flex-1">
          <Text className="text-2xl font-bold text-slate-900 mb-2">
            Enter your phone number
          </Text>
          <Text className="text-base text-slate-500 mb-8">
            We use your mobile number to identify your account
          </Text>

          <Input
            label="Phone number"
            placeholder="1234 567891"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            leftComponent={
              <TouchableOpacity 
                className="flex-row items-center mr-3 border-r border-slate-200 pr-3"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-xl mr-2">{selectedCountry.flag}</Text>
                <Text className="text-base font-medium text-slate-900">{selectedCountry.dialCode}</Text>
                <Feather name="chevron-down" size={16} color={colors.textLight} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            }
          />
          
           <Text className="text-md text-textLight mt-2">
            By tapping Get started, you agree to the Terms & Conditions
          </Text>
        </View>

        <View className="justify-end pb-8 mt-auto">
          <Button
            title="Get started"
            size="large"
            onPress={() => onNext(`${selectedCountry.dialCode}${phoneNumber}`)}
            disabled={phoneNumber.length < 5} 
          />
        </View>
      </KeyboardAwareScrollView>

      <CountryPickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={setSelectedCountry}
        selectedCountryCode={selectedCountry.code}
      />
    </View>
  );
};
