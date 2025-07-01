export interface MoodEntry {
  y: number;
  x: number;
  id: string;
  date: string;
  mood: "Happy" | "Calm" | "Anxious" | "Overwhelmed" | "Tired";
  value: number;
  color: string;
  emoji: string;
}

export interface ReflectionEntry {
  id: string;
  title: string;
  date: string;
  daysAgo: number;
}

export interface UserProfile {
  name: string;
  currentMood: string;
  moodEmoji: string;
}
