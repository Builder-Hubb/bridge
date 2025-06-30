import React, { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";

interface CalendarProps {
  initialMonth?: number;
  initialYear?: number;
}

const Calendar: React.FC<CalendarProps> = ({
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [scrollX, setScrollX] = useState(0);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const calendarWidth = 284;

  const generateMonthsArray = () => {
    const months = [];

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    months.push({ month: prevMonth, year: prevYear });

    months.push({ month: currentMonth, year: currentYear });

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    months.push({ month: nextMonth, year: nextYear });

    return months;
  };

  const monthsArray = generateMonthsArray();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: calendarWidth,
        animated: false,
      });
    }
  }, [currentMonth, currentYear, calendarWidth]);

  const weekDays = ["", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getWeekOfYear = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor(
      (date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((days + start.getDay() + 1) / 7);
  };

  const generateCalendarGrid = (
    month: number,
    year: number,
    currentSelectedDate: { day: number; month: number; year: number } | null
  ) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;

    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const today = new Date();

    let dayToSelect = null;
    if (currentSelectedDate) {
      if (
        currentSelectedDate.month === month &&
        currentSelectedDate.year === year
      ) {
        dayToSelect = currentSelectedDate.day;
      }
    } else {
      if (month === today.getMonth() && year === today.getFullYear()) {
        dayToSelect = today.getDate();
      }
    }

    const grid = [];

    for (let row = 0; row < 6; row++) {
      const week = [];

      for (let col = 0; col < 8; col++) {
        let day,
          type,
          isToday = false,
          weekNumber = null;

        if (col === 0) {
          const totalDaysFromStart = row * 7;
          const dayNumber = totalDaysFromStart - firstDayOfWeek + 1;

          if (dayNumber >= 1 && dayNumber <= daysInMonth) {
            const weekDate = new Date(year, month, dayNumber);
            weekNumber = getWeekOfYear(weekDate);
          } else if (dayNumber < 1) {
            const weekDate = new Date(
              year,
              month - 1,
              daysInPrevMonth + dayNumber
            );
            weekNumber = getWeekOfYear(weekDate);
          } else {
            const weekDate = new Date(year, month + 1, dayNumber - daysInMonth);
            weekNumber = getWeekOfYear(weekDate);
          }

          day = weekNumber;
          type = "week";
        } else {
          const totalDaysFromStart = row * 7 + (col - 1);
          const dayNumber = totalDaysFromStart - firstDayOfWeek + 1;

          if (dayNumber < 1) {
            day = daysInPrevMonth + dayNumber;
            type = "previous";
          } else if (dayNumber <= daysInMonth) {
            day = dayNumber;
            type = "current";
            isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
          } else {
            day = dayNumber - daysInMonth;
            type = "next";
          }
        }

        const isSaturday = col === 6;
        const isSunday = col === 7;
        const isWeekend = isSaturday || isSunday;

        const hasBlackBackground =
          type === "current" && dayToSelect && day === dayToSelect;

        week.push({
          day,
          type,
          isWeekend,
          isSaturday,
          isSunday,
          isToday,
          isSelected: hasBlackBackground,
          isEmpty: false,
          weekNumber,
        });
      }
      grid.push(week);
    }

    return grid;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    setScrollX(contentOffset.x);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const page = Math.round(contentOffset.x / calendarWidth);

    if (page === 0) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (page === 2) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleDatePress = (
    day: number,
    month: number,
    year: number,
    type: string
  ) => {
    if (type === "current") {
      setSelectedDate({ day, month, year });
    }
  };

  return (
    <Container>
      <MonthContainer>
        <MonthText>{monthNames[currentMonth]}</MonthText>
      </MonthContainer>

      <WeekDaysContainer width={calendarWidth}>
        {weekDays.map((day, index) => (
          <WeekDayText key={index} isWeekend={index === 6 || index === 7}>
            {day}
          </WeekDayText>
        ))}
      </WeekDaysContainer>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        snapToInterval={calendarWidth}
        decelerationRate="fast"
      >
        {monthsArray.map((monthData, monthIndex) => {
          const monthGrid = generateCalendarGrid(
            monthData.month,
            monthData.year,
            selectedDate
          );

          return (
            <MonthView
              key={`${monthData.year}-${monthData.month}`}
              width={calendarWidth}
            >
              <CalendarGrid>
                {monthGrid.map((week, weekIndex) => (
                  <WeekRow key={weekIndex}>
                    {week.map((dayObj, dayIndex) => (
                      <DayButton
                        key={`${weekIndex}-${dayIndex}`}
                        dayType={dayObj.type}
                        isSelected={!!dayObj.isSelected}
                        isToday={!!dayObj.isToday}
                        isSunday={!!dayObj.isSunday}
                        isEmpty={!!dayObj.isEmpty}
                        onPress={() =>
                          handleDatePress(
                            dayObj.day,
                            monthData.month,
                            monthData.year,
                            dayObj.type
                          )
                        }
                      >
                        {!dayObj.isEmpty && (
                          <DayTextContainer
                            dayType={dayObj.type}
                            isSelected={!!dayObj.isSelected}
                            isToday={!!dayObj.isToday}
                            isSunday={!!dayObj.isSunday}
                            isEmpty={!!dayObj.isEmpty}
                          >
                            <DayText
                              dayType={dayObj.type}
                              isSelected={!!dayObj.isSelected}
                              isToday={!!dayObj.isToday}
                              isSaturday={!!dayObj.isSaturday}
                              isSunday={!!dayObj.isSunday}
                            >
                              {dayObj.day}
                            </DayText>
                          </DayTextContainer>
                        )}
                      </DayButton>
                    ))}
                  </WeekRow>
                ))}
              </CalendarGrid>
            </MonthView>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Calendar;

const Container = styled.View`
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 0 40px;
`;

const MonthContainer = styled.View`
  background-color: #1a1a1a;
  border-radius: 4px;
  padding: 2px 8px;
  height: 24px;
  align-self: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const MonthText = styled.Text`
  font-size: 11px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: #ffffff;
`;

const WeekDaysContainer = styled.View<{ width: number }>`
  flex-direction: row;
  margin-bottom: 12px;
  width: ${({ width }) => width}px;
`;

const WeekDayText = styled.Text<{ isWeekend?: boolean }>`
  font-size: 11px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ isWeekend }) => (isWeekend ? "#17A1FA" : "#666666")};
  width: ${284 / 8}px;
  text-align: center;
`;

const MonthView = styled.View<{ width: number }>`
  width: ${({ width }) => width}px;
`;

const CalendarGrid = styled.View`
  flex-direction: column;
`;

const WeekRow = styled.View`
  flex-direction: row;
  margin-bottom: 6px;
`;

const DayButton = styled.TouchableOpacity<{
  dayType: string;
  isSelected?: boolean;
  isToday?: boolean;
  isSunday?: boolean;
  isEmpty?: boolean;
}>`
  width: ${284 / 8}px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const DayTextContainer = styled.View<{
  dayType: string;
  isSelected?: boolean;
  isToday?: boolean;
  isSunday?: boolean;
  isEmpty?: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isSelected, dayType }) => {
    if (isSelected && dayType === "current") return "#1A1A1A";
    if (dayType === "week") return "#333333";
    return "transparent";
  }};
`;

const DayText = styled.Text<{
  dayType: string;
  isSelected?: boolean;
  isToday?: boolean;
  isSaturday?: boolean;
  isSunday?: boolean;
}>`
  font-size: 11px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ isSelected, dayType, isSaturday, isSunday }) => {
    if (isSelected && dayType === "current") return "#FFFFFF";

    if (dayType === "week") {
      return "#B3B3B3";
    }

    if (dayType === "previous" || dayType === "next") {
      if (isSaturday || isSunday) return "#1270B0";
      return "#616161";
    }

    if (isSaturday || isSunday) return "#17A1FA";
    return "#B3B3B3";
  }};
`;
