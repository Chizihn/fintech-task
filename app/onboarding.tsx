import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../components/Button";
import { useOnboardingStore } from "../store/onboardingStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/Color";
import { Responsive } from "../util/responsive";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Become a smart investor in minutes",
    description:
      "Uncover emerging trends, actionable strategies, and best opportunitues.",
    image: require("../assets/images/onboarding-1.png"),
  },
  {
    id: "2",
    title: "Daily insights from world-class analysts",
    description:
      "Our analysts made their names at the top tier institutions",
    image: require("../assets/images/onboarding-2.png"),
  },
  {
    id: "3",
    title: "Track prices of all crypto currencies",
    description:
      "Set up automatic price alerts to let you know about price movements for a specific cryptocurrency",
    image: require("../assets/images/onboarding-3.png"),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useOnboardingStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleNewUser();
    }
  };

  const handleNewUser = () => {
    completeOnboarding();
    router.push("/(auth)/signup"); 
  };

  const handleLogin = () => {
    completeOnboarding();
    router.push("/(auth)/login");
  };

  const renderItem = ({ item }: { item: (typeof slides)[0] }) => {
    return (
      <View style={{ width }} className="items-center">
        <View 
            className={`w-full h-[56%] bg-[#1A3EEC] justify-end pb-10 ${
                item.id === "3" ? "items-end" : "items-center"
            }`}
        >
             <View className={`w-full aspect-square justify-center ${
                 item.id === "3" ? "relative" : "items-center"
             }`}>
                <Image
                    source={item.image}
                    style={item.id === "3" ? {
                        position: 'absolute',
                        right: Responsive.scale(-70),
                        bottom: Responsive.verticalScale(-32),
                        width: '120%',
                        height: '120%',
                    } : { 
                        width: "100%", 
                        height: "100%" 
                    }}
                    resizeMode="contain"
                />
             </View>
        </View>

        {/* Bottom Section */}
        <View className="w-full h-[40%] bg-white px-6 pt-8">
            <Text className="text-3xl font-bold text-slate-900 mb-4">
            {item.title}
            </Text>
            <Text className="text-md text-textLight leading-6">
            {item.description}
            </Text>
        </View>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View className="flex-row justify-center items-center mb-8 gap-2.5">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-3 rounded-full ${
              currentIndex === index
                ? "w-3 bg-slate-900" 
                : "w-3 bg-slate-300" 
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        bounces={false}
        decelerationRate="fast"
        className="flex-1"
      />

      {/* Controls Overlay - Positioned at bottom */}
      <View 
        className="absolute bottom-0 w-full px-6 pb-8 bg-white"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        {renderPagination()}

        {currentIndex === 0 ? (
          <View className="w-full flex-col g-4">
            <Button
              title="I'm new to the app"
              onPress={handleNewUser}
              variant="primary"
              size="large"
              fullWidth
            />
            <Button
              title="Log in"
              onPress={handleLogin}
              variant="text"
              fullWidth
              size="large"
              className="mt-2"
            />
          </View>
        ) : (
          <Button
            title="Next"
            onPress={currentIndex === slides.length - 1 ? handleNewUser : handleNext}
            variant="primary"
            size="large"
            fullWidth
          />
        )}
      </View>
    </View>
  );
}
