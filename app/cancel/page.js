import Link from "next/link";

export default function CancelPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">No Problem</h1>
            <Link href="/">
                <a className="text-[#76b4c7] hover:text-black text-lg font-semibold">
                    Back home
                </a>
            </Link>
        </div>
    )
}