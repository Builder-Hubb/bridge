import { MoodEntry, ReflectionEntry, UserProfile } from '../types';
import { Colours } from './Colours';

export const mockUserProfile: UserProfile = {
  name: 'Matt',
  currentMood: 'Happy',
  moodEmoji: '😊',
};

export const mockMoodData: MoodEntry[] = [
  {
    id: '1',
    date: 'Day 1',
    mood: 'Happy',
    value: 4,
    color: Colours.purple[5],
    emoji: '😊',
    x: 0,
    y: 0,
  },
  {
    id: '2',
    date: 'Day 2',
    mood: 'Calm',
    value: 3,
    color: Colours.green[5],
    emoji: '😌',
    x: 0,
    y: 0,
  },
  {
    id: '3',
    date: 'Day 3',
    mood: 'Anxious',
    value: 2,
    color: '#FF6B6B',
    emoji: '😟',
    x: 0,
    y: 0,
  },
  {
    id: '4',
    date: 'Day 4',
    mood: 'Overwhelmed',
    value: 1,
    color: '#FF8E53',
    emoji: '😰',
    x: 0,
    y: 0,
  },
  {
    id: '5',
    date: 'Day 5',
    mood: 'Tired',
    value: 2,
    color: '#FFD93D',
    emoji: '😴',
    x: 0,
    y: 0,
  },
  {
    id: '6',
    date: 'Day 6',
    mood: 'Anxious',
    value: 2,
    color: '#FF6B6B',
    emoji: '😟',
    x: 0,
    y: 0,
  },
  {
    id: '7',
    date: 'Day 7',
    mood: 'Happy',
    value: 5,
    color: Colours.purple[5],
    emoji: '😊',
    x: 0,
    y: 0,
  },
];

export const mockReflections: ReflectionEntry[] = [
  {
    id: '1',
    title: 'Something strange',
    date: '2025-06-28',
    daysAgo: 2,
  },
  {
    id: '2',
    title: 'A happy feeling',
    date: '2025-06-27',
    daysAgo: 3,
  },
];

export   const moodLegend = [
  { name: 'Happy', color: Colours.blue[1] },
  { name: 'Calm', color: '#534467' },
  { name: 'Anxious', color: Colours.red[1] },
  { name: 'Overwhelmed', color: Colours.green[7.5] },
  { name: 'Tired', color: Colours.yellow[1] },
];

export const hasPendingMessages = true;
export const pendingMessageText = 'Feel like checking in with someone today?';
