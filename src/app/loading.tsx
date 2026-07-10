import Image from "next/image";
import "./loading.css";

export default function Loading() {
    return (
        <div className="loading">
            <div className="loading__img">
                <Image src="/f-fakeflix.png" alt="f-fakeflix" width={1024} height={1536} />
            </div>
        </div>
    );
}
