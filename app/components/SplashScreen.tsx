import { Colours } from "@/constants/Colours";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StatusBar } from "react-native";
import styled from "styled-components/native";

interface CustomSplashScreenProps {
  onFinish: () => void;
  isReady: boolean;
}

const { width, height } = Dimensions.get("window");

const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({
  onFinish,
  isReady,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isReady) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(logoRotateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }
  }, [isReady, fadeAnim, scaleAnim, logoRotateAnim, onFinish]);

  const logoRotate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colours.purple[8.5]}
      />

      <AnimatedContent
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <LogoContainer>
          <AnimatedLogo
            style={{
              transform: [{ rotate: logoRotate }],
            }}
          >
            <LogoText>B</LogoText>
          </AnimatedLogo>
        </LogoContainer>
        <AppName>Bridge</AppName>

        <Tagline>Connecting Friends</Tagline>
        <LoadingContainer>
          <LoadingDots>
            <Dot delay={0} />
            <Dot delay={200} />
            <Dot delay={400} />
          </LoadingDots>
        </LoadingContainer>
      </AnimatedContent>
      <BackgroundPattern>
        <PatternCircle style={{ top: -50, right: -50 }} />
        <PatternCircle style={{ bottom: -100, left: -100 }} />
      </BackgroundPattern>
    </Container>
  );
};

const Dot: React.FC<{ delay: number }> = ({ delay }) => {
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dotAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [dotAnim, delay]);

  return (
    <AnimatedDot
      style={{
        opacity: dotAnim,
        transform: [
          {
            scale: dotAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1.2],
            }),
          },
        ],
      }}
    />
  );
};

export default CustomSplashScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${Colours.purple[8.5]};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AnimatedContent = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const LogoContainer = styled.View`
  width: 120px;
  height: 120px;
  background-color: ${Colours.green[0]};
  border-radius: 60px;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  elevation: 10;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;

const AnimatedLogo = styled(Animated.View)`
  width: 80px;
  height: 80px;
  background-color: ${Colours.purple[8.5]};
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.Text`
  font-size: 48px;
  font-weight: 800;
  color: ${Colours.green[0]};
  font-family: Manrope_800ExtraBold;
`;

const AppName = styled.Text`
  font-size: 42px;
  font-weight: 700;
  color: ${Colours.green[0]};
  font-family: Manrope_700Bold;
  margin-bottom: 8px;
`;

const Tagline = styled.Text`
  font-size: 16px;
  color: ${Colours.green[1]};
  font-family: Manrope_500Medium;
  margin-bottom: 48px;
  opacity: 0.9;
`;

const LoadingContainer = styled.View`
  position: absolute;
  bottom: 80px;
`;

const LoadingDots = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AnimatedDot = styled(Animated.View)`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${Colours.green[0]};
  margin: 0 4px;
`;

const BackgroundPattern = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const PatternCircle = styled.View`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${Colours.purple[7]};
  opacity: 0.1;
`;
