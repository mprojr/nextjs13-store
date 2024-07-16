import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="p-4 m-2">
            <p className="flex justify-center">Nice!</p>
            <div className="flex justify-center px-2 mt-6">
              <button className="border p-2 hover:scale-105 duration-200 hover:bg-blue-400">
                <Link className="flex justify-center" href={'/'}>Back home</Link>
              </button>
            </div>
        </div>
    )
}