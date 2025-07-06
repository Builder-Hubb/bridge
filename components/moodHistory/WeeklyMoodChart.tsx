import { Colours } from "@/constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
  Text,
} from "react-native-svg";
import styled from "styled-components/native";

interface WeeklyMoodData {
  day: string;
  mood: number;
  date: string;
}

interface WeeklyMoodChartProps {
  data: WeeklyMoodData[];
}

const WeeklyMoodChart: React.FC<WeeklyMoodChartProps> = ({ data }) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 80;
  const chartHeight = 120;
  const padding = 40;

  const maxMood = Math.max(...data.map((d) => d.mood));
  const minMood = Math.min(...data.map((d) => d.mood));
  const range = maxMood - minMood || 1;

  const points = data.map((item, index) => {
    const x =
      padding + (index * (chartWidth - padding * 2)) / (data.length - 1);
    const y =
      padding + ((maxMood - item.mood) / range) * (chartHeight - padding * 2);
    return { x, y, mood: item.mood };
  });

  const createSmoothPath = (points: any[]) => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      if (i === 1) {
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y + (curr.y - prev.y) * 0.3;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y - (curr.y - prev.y) * 0.3;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
    }

    return path;
  };

  const pathData = createSmoothPath(points);

  const handlePointPress = (index: number) => {
    setSelectedPoint(selectedPoint === index ? null : index);
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <MoodSection>
          <MoodTagText>Happy</MoodTagText>
          <CountText>20+</CountText>
          <FrequencyLabel>
            <FrequencyLabelText>Last 7 days</FrequencyLabelText>
            <FrequencyLabelIcon>
              <Ionicons name="arrow-up" color={`${Colours.red[1]}`}></Ionicons>
            </FrequencyLabelIcon>
          </FrequencyLabel>
        </MoodSection>
      </ChartHeader>

      <ChartWrapper>
        <Svg width={chartWidth} height={chartHeight + 40}>
          <Defs>
            <LinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#18A0FB" />
              <Stop offset="100%" stopColor="#60A5FA" />
            </LinearGradient>
          </Defs>

          {/* chart line */}
          <Path
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* points */}
          {points.map((point, index) => (
            <Circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={selectedPoint === index ? "8" : "4"}
              fill={selectedPoint === index ? "#3B82F6" : "transparent"}
              stroke={selectedPoint === index ? "#ffffff" : "transparent"}
              strokeWidth="2"
              onPress={() => handlePointPress(index)}
            />
          ))}

          {/* tooltip */}
          {selectedPoint !== null && (
            <React.Fragment>
              <Circle
                cx={points[selectedPoint].x}
                cy={points[selectedPoint].y - 25}
                r="15"
                fill="#3B82F6"
                opacity="0.9"
              />
              <Text
                x={points[selectedPoint].x}
                y={points[selectedPoint].y - 22}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="12"
                fontWeight="600"
              >
                {data[selectedPoint].mood}
              </Text>
            </React.Fragment>
          )}
        </Svg>

        <DaysContainer>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePointPress(index)}
              style={{ padding: 4 }}
            >
              <DayLabel isSelected={selectedPoint === index}>
                {item.day}
              </DayLabel>
            </TouchableOpacity>
          ))}
        </DaysContainer>
      </ChartWrapper>
    </ChartContainer>
  );
};

const ChartContainer = styled.View`
  margin: 0 20px 20px 20px;
  background-color: ${Colours.purple[0.5]};
  border-radius: 20px;
  padding: 20px;
`;

const ChartHeader = styled.View`
  margin-bottom: 20px;
`;

const MoodSection = styled.View`
  align-items: flex-start;
`;

const MoodTagText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  font-family: Manrope_400Regular;
  color: #1f2937;
  margin-bottom: 8px;
`;

const CountText = styled.Text`
  font-size: 32px;
  font-weight: 700;
  font-family: Manrope_700Bold;
  color: #1f2937;
  line-height: 36px;
`;
const FrequencyLabelText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  font-family: Manrope_500Medium;
`;

const FrequencyLabelIcon = styled.View``;

const FrequencyLabel = styled.Text`
  dispay: flex;
  align-items: center;
  gap: 4px;
`;

const ChartWrapper = styled.View`
  align-items: center;
  position: relative;
`;

const DaysContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
  margin-top: 12px;
`;

const DayLabel = styled.Text<{ isSelected?: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isSelected ? Colours.purple[4] : "#6b7280")};
  font-weight: ${(props) => (props.isSelected ? "600" : "500")};
  text-align: center;
  font-family: Manrope_400Regular;
`;

export default WeeklyMoodChart;
