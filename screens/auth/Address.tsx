import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Input } from "../../components/Input";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenHeader } from "../../components/ScreenHeader";

import { Button } from "../../components/Button";

interface AddressProps {
  onNext: (address: string) => void;
  onBack: () => void;
}

export const Address: React.FC<AddressProps> = ({ onNext, onBack }) => {
  const [search, setSearch] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [unit, setUnit] = useState("");
  
  const addresses = [
    "123 Diamond Street, London, UK",
    "123 Diamond Street, Bristol, UK",
    "123 Diamond Street, Menlo Park, LA",
  ].filter(a => a.toLowerCase().includes(search.toLowerCase()));

  const handleSearchChange = (text: string) => {
    setSearch(text);
    setSelectedAddress(null);
  };

  const handleSelectAddress = (address: string) => {
    setSearch(address);
    setSelectedAddress(address);
  };

  const handleNext = () => {
    if (selectedAddress) {
      const fullAddress = unit ? `${selectedAddress}, ${unit}` : selectedAddress;
      onNext(fullAddress);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <ScreenHeader onBack={onBack} />

        <View className="mt-4 flex-1">
          <Text className="text-2xl font-bold text-slate-900 mb-2">
            Your personal address
          </Text>
          <Text className="text-base text-slate-500 mb-8">
            Search for your current residential address
          </Text>

          <Input
            label="Personal address"
            placeholder="Search address"
            value={search}
            onChangeText={handleSearchChange}
            leftIcon={selectedAddress ? undefined : "search"}
            labelPlacement={selectedAddress ? "border" : "top"}
          />

          {!selectedAddress && search.length > 0 && addresses.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between p-4 bg-slate-50 rounded-xl mb-3"
              onPress={() => handleSelectAddress(item)}
            >
              <View>
                  <Text className="font-semibold text-slate-900">{item.split(",")[0]}</Text>
                  <Text className="text-slate-500">{item.split(",").slice(1).join(",").trim()}</Text>
              </View>
              <Feather name="arrow-right" size={20} color={colors.text} />
            </TouchableOpacity>
          ))}

          {selectedAddress && (
            <View className="mt-2">
              <Input
                label="Apt, Suite, or Unit"
                placeholder="Flat 12"
                value={unit}
                onChangeText={setUnit}
                labelPlacement="border"
              />
            </View>
          )}
        </View>

        <View className="pb-8 mt-4">
            <Button
                title="Next"
                onPress={handleNext}
                variant="primary"
                size="large"
                disabled={!selectedAddress}
            />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
