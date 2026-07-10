"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { documentOpenapi } from "@/schemas/openapi_schemas";
import "@/schemas/openapi_path";
import { useState } from "react";
import Loading from "./loading";

const LoadingPage = ({
    isLoading = true,
    setIsLoading,
}: {
    isLoading?: boolean | null;
    setIsLoading: (v: boolean | null) => void;
}) => {
    return (
        <div className={isLoading === false ? "loading__exit" : ""} onAnimationEnd={() => setIsLoading(null)}>
            {isLoading !== null && <Loading />}
        </div>
    );
};

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean | null>(true);
    const document = documentOpenapi();
    return (
        <>
            <LoadingPage isLoading={isLoading} setIsLoading={setIsLoading} />
            <main style={{ height: "100dvh", display: isLoading ? "none" : undefined }}>
                <ApiReferenceReact
                    configuration={{
                        onLoaded: (v) => setIsLoading(false),
                        content: document,
                        theme: "bluePlanet",
                        defaultHttpClient: { targetKey: "javascript", clientKey: "ofetch" },
                        metaData: { title: "Fakeflix" },
                        documentDownloadType: "none",
                    }}
                />
            </main>
        </>
    );
}
