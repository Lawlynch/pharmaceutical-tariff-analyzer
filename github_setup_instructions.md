# GitHub Repository Setup Instructions

## Creating a GitHub Repository for the Pharmaceutical Tariff Analyzer

Follow these steps to create a GitHub repository for the Pharmaceutical Tariff Analyzer application:

### 1. Create a New Repository on GitHub

1. Log in to your GitHub account at [github.com](https://github.com)
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Enter a repository name (e.g., "pharmaceutical-tariff-analyzer")
4. Add a description: "A Next.js application for analyzing pharmaceutical tariffs with admin and regular user authentication"
5. Choose whether to make the repository public or private
6. Check the box to "Add a README file"
7. Click "Create repository"

### 2. Clone the Repository to Your Local Machine

```bash
git clone https://github.com/YOUR-USERNAME/pharmaceutical-tariff-analyzer.git
cd pharmaceutical-tariff-analyzer
```

### 3. Copy the Application Files

Copy all the files from the recreated application to your local repository:

```
pharmaceutical-tariff-analyzer/
├── components/
│   ├── AuthContext.js
│   └── withAuth.js
├── pages/
│   ├── _app.js
│   ├── index.js
│   ├── login.js
│   ├── admin.js
│   ├── admin-protected.js
│   └── dashboard.js
├── styles/
│   └── globals.css
├── public/
├── next.config.js
└── package.json
```

### 4. Initialize the Project and Install Dependencies

```bash
npm install
```

### 5. Commit and Push the Changes

```bash
git add .
git commit -m "Initial commit: Pharmaceutical Tariff Analyzer application"
git push origin main
```

### 6. Deploy the Application (Optional)

You can deploy the application to Vercel, which is optimized for Next.js applications:

1. Create an account on [vercel.com](https://vercel.com) if you don't have one
2. Install the Vercel CLI: `npm install -g vercel`
3. Run `vercel` in the project directory and follow the prompts
4. Your application will be deployed and you'll receive a URL to access it

## Authentication Credentials

The application includes two types of authentication:

- **Admin User**: 
  - Username: Required (can be any value)
  - Password: `Tariffbuster2025`
  - Provides access to the admin dashboard for content editing

- **Regular User**:
  - Username: Optional
  - Password: `pharma2025`
  - Provides access to the user dashboard

## Development Instructions

### Running Locally

```bash
npm run dev
```

This will start the development server at http://localhost:3000

### Building for Production

```bash
npm run build
```

This will create a production build in the `out` directory, which can be deployed to any static hosting service.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [GitHub Documentation](https://docs.github.com)
- [Vercel Documentation](https://vercel.com/docs)
