import { Colours } from "@/constants/Colours";
import { mockMoodData, moodLegend } from "@/constants/mockData";
import { MoodEntry } from "@/types";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Svg, { Circle, G, Line, Path, Rect, Text } from "react-native-svg";
import styled from "styled-components/native";

const MoodTrackingCard = ({
  moodData = mockMoodData,
  currentMood = "Happy",
  emoji = "😊",
}) => {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 80;
  const chartHeight = 200;
  const padding = 40;
  const innerWidth = chartWidth - padding * 2;
  const innerHeight = chartHeight - padding * 2;

  const initialActivePoint =
    moodData.find((entry) => entry.mood === currentMood) ||
    moodData[moodData.length - 1];

  const [activePoint, setActivePoint] = useState<MoodEntry>(initialActivePoint);
  const [showTooltip, setShowTooltip] = useState(false);

  const maxValue = 5;
  const minValue = 0;

  const points = moodData.map((entry, index) => {
    const x = padding + index * (innerWidth / (moodData.length - 1));
    const y =
      padding +
      (innerHeight -
        ((entry.value - minValue) / (maxValue - minValue)) * innerHeight);
    return {
      ...entry,
      x,
      y,
    };
  });

  const createSmoothPath = (points: MoodEntry[]) => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const previous = points[i - 1];

      const controlX1 = previous.x + (current.x - previous.x) * 0.3;
      const controlY1 = previous.y;
      const controlX2 = current.x - (current.x - previous.x) * 0.3;
      const controlY2 = current.y;

      if (i === 1) {
        path += ` C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${current.x} ${current.y}`;
      } else {
        path += ` S ${controlX2} ${controlY2} ${current.x} ${current.y}`;
      }
    }

    return path;
  };

  const smoothPath = createSmoothPath(points);

  const findClosestPoint = (gestureX: number): MoodEntry => {
    let closestPoint = points[0];
    let minDistance = Math.abs(gestureX - points[0].x);

    points.forEach((point) => {
      const distance = Math.abs(gestureX - point.x);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    });

    return closestPoint;
  };

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, absoluteX } = event.nativeEvent;
    const gestureX = absoluteX - (screenWidth - chartWidth) / 2;

    if (gestureX >= padding && gestureX <= chartWidth - padding) {
      const closestPoint = findClosestPoint(gestureX);
      setActivePoint(closestPoint);
      setShowTooltip(true);
    }
  };

  const handleGestureStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  const handlePointPress = (point: MoodEntry) => {
    setActivePoint(point);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const gridLines = [];
  for (let i = 0; i <= 4; i++) {
    const y = padding + i * (innerHeight / 4);
    gridLines.push(
      <Line
        key={i}
        x1={padding}
        y1={y}
        x2={chartWidth - padding}
        y2={y}
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="3,3"
      />
    );
  }

  // calculate tooltip position
  const getTooltipPosition = () => {
    if (!activePoint) return { x: 0, y: 0 };
    const badgeWidth = 100;
    const badgeHeight = 40;
    let x = activePoint.x - badgeWidth / 2;
    let y = activePoint.y - badgeHeight - 15;
    // adjust if tooltip goes outside chart bounds
    if (x < padding) x = padding;
    if (x + badgeWidth > chartWidth - padding)
      x = chartWidth - padding - badgeWidth;
    if (y < padding) y = activePoint.y + 15;

    return { x, y };
  };

  const tooltipPosition = getTooltipPosition();

  return (
    <Card>
      <Header>
        <Title>Mood tracking</Title>
      </Header>

      <ChartContainer>
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleGestureStateChange}
        >
          <ChartWrapper>
            <Svg width={chartWidth} height={chartHeight + 40}>
              <G>{gridLines}</G>

              <Rect
                x={0}
                y={0}
                width={chartWidth}
                height={chartHeight}
                fill="transparent"
              />

              <Path
                d={smoothPath}
                fill="none"
                stroke={Colours.purple[6]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {points.map((point, index) => (
                <G key={point.id}>
                  <Circle
                    cx={point.x}
                    cy={point.y}
                    r={15}
                    fill="transparent"
                    onPress={() => handlePointPress(point)}
                  />

                  <Circle
                    cx={point.x}
                    cy={point.y}
                    r={activePoint?.id === point.id ? 6 : 4}
                    fill={point.color}
                    stroke={point.color}
                    strokeWidth="2"
                    onPress={() => handlePointPress(point)}
                  />

                  <Text
                    x={point.x}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill={Colours.purple[7]}
                    fontFamily="Manrope_400Regular"
                  >
                    {point.date}
                  </Text>
                </G>
              ))}

              {/* Badge Tooltip */}
              {showTooltip && activePoint && (
                <G>
                  {/* background */}
                  <Rect
                    x={tooltipPosition.x}
                    y={tooltipPosition.y}
                    width={100}
                    height={30}
                    fill={Colours.purple[6]}
                    rx={6}
                    ry={6}
                    opacity={0.95}
                  />
                  <Text
                    x={tooltipPosition.x + 40}
                    y={tooltipPosition.y + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="white"
                    fontFamily="Manrope_500SemiBold"
                  >
                    {`${activePoint.mood} ${activePoint.emoji}`}
                  </Text>

                  {/* pointer */}
                  <Path
                    d={`M ${tooltipPosition.x + 35} ${tooltipPosition.y + 30} L ${tooltipPosition.x + 40} ${tooltipPosition.y + 35} L ${tooltipPosition.x + 45} ${tooltipPosition.y + 30}`}
                    fill={Colours.purple[6]}
                  />
                  <Line
                    x1={activePoint.x}
                    y1={activePoint.y}
                    x2={activePoint.x}
                    y2={tooltipPosition.y + 35}
                    stroke={Colours.purple[6]}
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                </G>
              )}

              <Path
                d="M 20 30 L 25 20 L 30 30"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d={`M ${chartWidth - 30} ${chartHeight - 15} L ${chartWidth - 20} ${chartHeight - 20} L ${chartWidth - 30} ${chartHeight - 25}`}
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </ChartWrapper>
        </PanGestureHandler>

        <LegendContainer>
          {moodLegend.map((mood, index) => (
            <LegendItem key={index}>
              <LegendDot style={{ backgroundColor: mood.color }} />
              <LegendText>{mood.name}</LegendText>
            </LegendItem>
          ))}
        </LegendContainer>
      </ChartContainer>
    </Card>
  );
};

const Card = styled.View`
  background-color: white;
  padding: 20px;
  border-top: 1px solid ${Colours.black[3]};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Colours.purple[8]};
  font-family: Manrope_600SemiBold;
`;

const ChartContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
  background-color: #f9fafb;
  border-radius: 16px;
  padding: 16px;
  height: 356px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartWrapper = styled.View`
  position: relative;
`;

const LegendContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
`;

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const LegendDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 6px;
`;

const LegendText = styled.Text`
  font-size: 14px;
  color: ${Colours.black[1]};
  font-family: Manrope_400Regular;
`;

export default MoodTrackingCard;
