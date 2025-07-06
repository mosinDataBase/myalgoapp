import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
