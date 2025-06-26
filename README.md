# 🤝 Bridge

Bridge is a lightweight communication wellness app that helps users track their replies and reconnect with others in a calm and structured way without the overwhelm of traditional messaging platforms.

It’s designed for people who:
- Miss messages in archive or forget to reply
- Want gentle reminders without noisy notifications
- Prefer subtle check-ins and structured reconnection

---

## 🛠️ Project Setup

Our frontend is built with:
- **React Native (Expo)**
- **Typescript**
- **StyleSheet**

All base colors live in `constants/Colours.ts`. Please use the color scale consistently across screens.

Each screen lives in its own folder under `/app` or `/components`. We organize by **feature**, not type.

---

## 🔄 Git Workflow

We use a branching model to maintain code quality:

### 🔁 Branches
- `main` – This is our **production** branch. No direct commits here.
- `dev` – This is the **staging** branch for all in-progress features.

### ✅ Workflow for Contributors
1. **Pull** the latest changes from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
````

2. **Create a feature branch** off `dev`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Work on your component or screen (match the Figma UI).

   * Use local state only for now (no backend integration).
   * Keep components small and reusable when possible.

4. **Commit** your changes clearly:

   ```bash
   git add .
   git commit -m "feat: build onboarding screen"
   ```

5. **Push** your branch:

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Create a Pull Request** into `dev` via GitHub.

   * Add a short description, screenshot and link the task/issue (if available).
   * Wait for code review and feedback.

7. After approval, your PR will be merged into `dev`.

---

## 🧾 Guidelines

* **Use the shared `Colours.ts` file** — do not hardcode colors
* Follow the file structure already established
* Respect naming conventions and keep file names consistent (e.g., `NotificationSettings.tsx`, `CheckInModal.tsx`)


---

Let’s keep Bridge clean, accessible, and easy to maintain.
If you’re unsure where to place something or need help, tag the team in the PR or ask in the whatsapp group channel.

Thanks for contributing :)

```
