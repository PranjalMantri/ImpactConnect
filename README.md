# ImpactConnect

ImpactConnect is a modern platform designed to bridge the gap between NGOs, volunteers, and donors. It streamlines the process of discovering, managing, and supporting impactful projects, making it easier for organizations to find help and for individuals to make a difference.

## 🚀 Key Features

- **NGO Dashboard:** Manage projects, track donations, and review volunteer applications with an intuitive interface.
- **Volunteer Portal:** Discover projects, apply to volunteer, and track your impact.
- **Donor Experience:** Browse projects, donate securely, and monitor the impact of your contributions.
- **Project Matching:** Smart matching between volunteers and projects based on skills and availability.
- **Onboarding Flows:** Seamless onboarding for NGOs, including verification and organization details.
- **Modern UI:** Responsive, accessible, and visually appealing design using React and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL, Auth, Storage)
- **Other Tools:** ESLint, PostCSS

---

## 🏁 Getting Started (Run Locally)

Follow these steps to set up and run ImpactConnect on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/PranjalMantri/ImpactConnect.git
cd ImpactConnect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

- Copy the example environment file and setup your variables as needed for Supabase credentials.
- Example:
  ```env
  VITE_SUPABASE_URL=your-supabase-url
  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
  ```

### 4. Start the Development Server

```bash
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

### 5. Build for Production

```bash
npm run build
```
