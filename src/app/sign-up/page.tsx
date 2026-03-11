import { redirect } from "next/navigation";

// Redirect /sign-up to Clerk's hosted sign-up modal via the home page
// This prevents the 404 that occurs when Clerk tries to navigate to /sign-up
export default function SignUpPage() {
    redirect("/");
}
