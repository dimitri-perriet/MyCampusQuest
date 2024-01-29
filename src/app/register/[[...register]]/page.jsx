import { SignUp } from "@clerk/nextjs";


export default function Page() {
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <SignUp />
            </div>
        </div>
    )
}
