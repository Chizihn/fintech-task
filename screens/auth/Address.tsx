import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Input } from "../../components/Input";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";

interface AddressProps {
  onNext: (address: string) => void;
  onBack: () => void;
}

export const Address: React.FC<AddressProps> = ({ onNext, onBack }) => {
  const [search, setSearch] = useState("");
  
  const addresses = [
    "123 Diamond Street, London, UK",
    "123 Diamond Street, Bristol, UK",
    "123 Diamond Street, Menlo Park, LA",
  ].filter(a => a.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-row items-center py-4">
        <TouchableOpacity onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

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
          onChangeText={setSearch}
          leftIcon="search"
        />

        <FlatList
          data={addresses}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center justify-between p-4 bg-slate-50 rounded-xl mb-3"
              onPress={() => onNext(item)}
            >
              <View>
                  <Text className="font-semibold text-slate-900">{item.split(",")[0]}</Text>
                  <Text className="text-slate-500">{item.split(",").slice(1).join(",").trim()}</Text>
              </View>
              <Feather name="arrow-right" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
