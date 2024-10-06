import { Button } from '@/components/ui/button';
import execute from "./actions/pdfLoader";

export default async function Home() {
    return (
        <div className='h-full'>
            <form action={execute}>
                <Button>Submit</Button>
            </form>
        </div>
    );
}
