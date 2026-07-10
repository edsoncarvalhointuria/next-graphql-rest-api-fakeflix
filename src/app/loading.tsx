import Image from "next/image";
import "./loading.css";

export default function Loading() {
    return (
        <div className="loading">
            <div className="loading__img" style={{ "--bg-img": `url(/f-fakeflix.png)` } as React.CSSProperties}>
                <Image src="/f-fakeflix.png" alt="f-fakeflix" width={1024} height={1536} loading="eager" priority />
            </div>
        </div>
    );
}
