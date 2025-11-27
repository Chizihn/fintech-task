import React, { useState, useMemo } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, TextInput, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/Color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface CountryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCountryCode: string;
}

export const countries: Country[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "IT", name: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dialCode: "+55" },
];

export const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCountryCode,
}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    );
  }, [searchQuery]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/60"
      >
        <View className="bg-white rounded-t-[32px] h-[85%] overflow-hidden">
          {/* Header */}
          <View className="px-6 pt-6 pb-4 border-b border-slate-100">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-slate-900">Select Country</Text>
              <TouchableOpacity 
                onPress={onClose}
                className="w-8 h-8 items-center justify-center bg-slate-100 rounded-full"
              >
                <Feather name="x" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-slate-100 rounded-2xl px-4 py-3.5">
              <Feather name="search" size={20} color={colors.textLight} />
              <TextInput
                className="flex-1 ml-3 text-base text-slate-900 font-medium"
                placeholder="Search country or code"
                placeholderTextColor={colors.textLight}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Feather name="x-circle" size={18} color={colors.textLight} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* List */}
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20, paddingTop: 8 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedCountryCode === item.code;
              return (
                <TouchableOpacity
                  className={`flex-row items-center justify-between px-6 py-4 mx-4 mb-2 rounded-2xl ${
                    isSelected ? "bg-blue-50" : "bg-transparent"
                  }`}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center flex-1">
                    <Text className="text-4xl mr-4">{item.flag}</Text>
                    <View className="flex-1">
                      <Text className={`text-base font-bold ${isSelected ? "text-primary" : "text-slate-900"}`}>
                        {item.name}
                      </Text>
                      <Text className={`text-sm font-medium ${isSelected ? "text-primary/80" : "text-slate-500"}`}>
                        {item.dialCode}
                      </Text>
                    </View>
                  </View>
                  
                  {isSelected ? (
                    <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <Feather name="check" size={14} color="white" />
                    </View>
                  ) : (
                    <Feather name="chevron-right" size={20} color={colors.border} />
                  )}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <View className="items-center justify-center py-12">
                <Feather name="search" size={48} color={colors.border} />
                <Text className="text-slate-500 mt-4 text-center font-medium">
                  No countries found matching "{searchQuery}"
                </Text>
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
