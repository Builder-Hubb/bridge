import { NotificationData } from '@/app/screens/notification';
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

export const moodLegend = [
  { name: 'Happy', color: Colours.blue[1] },
  { name: 'Calm', color: '#534467' },
  { name: 'Anxious', color: Colours.red[1] },
  { name: 'Overwhelmed', color: Colours.green[7.5] },
  { name: 'Tired', color: Colours.yellow[1] },
];

export const hasPendingMessages = true;
export const pendingMessageText = 'Feel like checking in with someone today?';

export const mockNotifications: NotificationData[] = [
  {
    id: '1',
    sender: {
      name: 'Mary',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    title: 'Something is happening...',
    message: 'This message made you anxious, send a low pressure reply?',
    timestamp: 'Just now',
    type: 'nudge',
    showReply: true,
  },
  {
    id: '2',
    sender: {
      name: 'Mary',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    title: 'Something is happening...',
    message: 'This message felt overwhelming - take a moment to breathe and come back later',
    timestamp: '3 min ago',
    type: 'nudge',
  },
  {
    id: '3',
    sender: {
      name: 'Tunde',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
    title: 'What about what I asked you?',
    message: 'You don\'t need the perfect words. A short note is okay.',
    timestamp: '1 min ago',
    type: 'nudge',
    showReply: true,
  },
  {
    id: '4',
    sender: {
      name: 'Mary',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    title: 'Something is happening...',
    message: 'This message felt overwhelming - take a moment to breathe and come back later',
    timestamp: '3 min ago',
    type: 'nudge',
  },
  {
    id: '5',
    sender: {
      name: 'Mary',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    title: 'Something is happening...',
    message: 'You can always respond to this later.',
    timestamp: '5 min ago',
    type: 'nudge',
  },
  {
    id: '6',
    sender: {
      name: 'Mary',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    title: 'Something is happening...',
    message: 'You haven\'t responded in 9 days- want to send a simple check in?',
    timestamp: '7 min ago',
    type: 'nudge',
    showReply: true,
  },
  {
    id: '7',
    sender: {
      name: 'Mary',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    title: 'Something is happening...',
    message: 'This message made you anxious, send a low pressure reply?',
    timestamp: '10 min ago',
    type: 'nudge',
    showReply: true,
  },
  {
    id: '8',
    sender: {
      name: 'System',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
    title: 'You replied to 5 messages today - one small step',
    message: 'toward better connection',
    timestamp: '3 min ago',
    type: 'notification',
  },
  {
    id: '9',
    sender: {
      name: 'System',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
    title: 'This week, you reconnected with 5 people. keep',
    message: 'nurturing your bridge.',
    timestamp: '3 min ago',
    type: 'notification',
  },
  {
    id: '10',
    sender: {
      name: 'System',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
    title: 'Messages piling up? Please, breathe. Let\'s tag how',
    message: 'you are feeling first.',
    timestamp: '3 min ago',
    type: 'notification',
  },
];
