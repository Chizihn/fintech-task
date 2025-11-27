import React from "react";
import { View, Text } from "react-native";
import { Button } from "../../components/Button";
import { Image } from "react-native";

interface NotificationInfoProps {
  onNext: () => void;
}

export const NotificationInfo: React.FC<NotificationInfoProps> = ({ onNext }) => {

  return (
    <View className="flex-1 bg-white p-5 flex-col justify between">
          <View className="w-full aspect-square justify-center items-center">
                        <Image
                            source={require("../../assets/images/bell.png")}
                            style={{ width: 200, height: 200 }}
                            resizeMode="contain"
                        />
                     </View>

                     <View className="flex-1">
                           <Text className="text-3xl font-bold text-slate-900 mb-3">
                                    Instant Notifications
                                  </Text>
                                  <Text className="text-xl text-textLight ">
                                   We’ll send you real-time alerts on what you spend, as you spend it. You’ll know instantly when you’re running low, when there are bills on the horizon or when you’ve been paid.
                                  </Text>
                     </View>

 <View className="w-full flex-col g-4">
            <Button
              title="Get notified"
              onPress={onNext}
              variant="primary"
              size="large"
              fullWidth
            />
            <Button
              title="Skip"
              onPress={onNext}
              variant="text"
              fullWidth
              size="large"
              className="mt-2"
            />
          </View>
    </View>
  );
};
