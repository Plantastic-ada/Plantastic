import type { FormProps } from "../types/FormProps";

export default function Form({onClose}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("form submitted");
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2-xl font-bold mb-4">My form</h2>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Name:
                </label>
                <input type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2" />
            </div>
            <button type="submit"
            className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue-600">
                Send
            </button>
        </form>
    )
}