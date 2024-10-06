import execute from "./actions/pdfLoader";

export default async function Home() {
    return (
        <div className='flex items-center'>
            <form action={execute}>
                <button type="submit">Click</button>
            </form>
        </div>
    );
}
