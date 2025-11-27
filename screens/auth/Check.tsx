import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/Color";
import { Image } from "react-native";

interface CheckProps {
  user: any;
  onNext: () => void;
  onBack: () => void;
}

export const Check: React.FC<CheckProps> = ({ user, onNext, onBack }) => {
  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-row items-center py-4">
        <TouchableOpacity onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-2xl font-bold text-slate-900 mb-2">
          Check your details
        </Text>
        <Text className="text-base text-slate-500 mb-8">
          Are the details below correct? If they're not, we'll have trouble progressing your application.
        </Text>

        {/* Map placeholder */}
        <View className="w-full h-64 rounded-xl overflow-hidden mb-6">
            <Image
                source={require("../../assets/images/map.png")}
                className="w-full h-full"
                resizeMode="cover"
            />
        </View>

        <View className="flex-col gap-10">
          <View className="flex-row">
              <View className="w-8 items-center pt-1">
                  <View className="bg-black rounded-full p-1">
                      <Feather name="user" size={12} color="white" />
                  </View>
              </View>
              <View className="ml-3 flex-col gap-2">
                  <Text className="font-bold text-textLight">
                      {user?.firstName} {user?.lastName}
                  </Text>
                  <Text className="text-textLight">05/06/1988</Text>
                  <Text className="text-textLight"> {user?.phoneNumber}</Text>
                  <Text className="text-textLight">{user?.email}</Text>
              </View>
          </View>

          <View className="flex-row">
              <View className="w-8 items-center pt-1">
                  <View className="bg-black rounded-full p-1">
                      <Feather name="map-pin" size={12} color="white" />
                  </View>
              </View>
              <View className="ml-3">
                  <Text className="text-textLight">
                      {user?.address}
                  </Text>
              </View>
          </View>
        </View>
      </View>

      <View className="flex-1 justify-end flex-col ">
        <Button
          title="Yes, this information is correct"
          onPress={onNext}
          variant="primary"
          size="large"
        />
        <Button
          title="No, go back"
          onPress={onBack}
          variant="text"
          size="large"

          textStyle={{ color: colors.text }}
        />
      </View>
    </View>
  );
};
