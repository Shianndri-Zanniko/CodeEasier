# CodeEasier

A gamified platform to make coding practice fun and engaging.

## About

CodeEasier is built with React, Vite and Firebase to provide interactive courses, achievements and daily challenges that keep learners motivated.

## Features

- User authentication and profile management
- Daily quests with XP rewards
- Track course progress and lessons completed
- Earn achievements and badges
- Take notes while learning

## Tech Stack

- React 19 with Vite for rapid development
- Tailwind CSS for styling
- React Router DOM for routing
- Firebase client SDK and admin SDK
- ESLint for consistent code quality

## Getting Started

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and fill in your Firebase keys.
4. Start the development server with `npm run dev`.

## Usage

Sign up or log in to access courses. Navigate lessons in each course and complete them to earn XP. Check your daily missions for extra rewards and keep track of your achievements.

## Daily Quests

Daily quest documents live in the `missions` collection. Each document should contain the following fields:

- `Description` – quest description
- `Requirements` – quest unlock detail -> action and amount
- `title` – quest title
- `id` – quest id
- `type` – usually set to `"daily"`
- `xpReward` - given xp

Each document's **Firestore document ID** must match the quest's `id` so that progress correctly links with the IDs defined in `DAILY_QUEST_IDS`.

Example document:

```json
{
  "description": "Complete any lesson today.",
  "requirements": {
    "action": "lesson_complete",
    "amount": 1
  },
  "title": "Finish a Lesson",
  "id": "dq002",
  "type": "daily",
  "xpReward": 15
}
```

Daily quest progress resets every day when a new set of quests is assigned.

## Achievements

Achievement documents live in the `achievements` collection. Each document should contain the following fields:

- `criteria` – object describing the unlock condition (e.g. type and value)
- `description` – short explanation of the achievement
- `icon` – URL for the achievement icon
- `id` – achievement id
- `title` – achievement title
- `xpReward` – XP awarded on unlock

Each document's **Firestore document ID** must match the achievement's `id` so progress links correctly with `ACHIEVEMENT_IDS`.

Example documents:

```yaml
- criteria:
    type: "completion"
    value: 1
  description: "Complete Profile"
  icon: "https://placehold.co/50x50/quiz.png"
  id: "ach001"
  title: "Known Legend"
  xpReward: 30

- criteria:
    type: "completion"
    value: 1
  description: "Complete your first lesson!"
  icon: "https://placehold.co/50x50/achieve1.png"
  id: "ach002"
  title: "First Lesson"
  xpReward: 20
```
