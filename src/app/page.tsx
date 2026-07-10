"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { documentOpenapi } from "@/schemas/openapi_schemas";
import "@/schemas/openapi_path";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { createPortal } from "react-dom";

const LoadingPage = ({
    isLoading = true,
    setIsLoading,
}: {
    isLoading?: boolean | null;
    setIsLoading: (v: boolean | null) => void;
}) => {
    return (
        <div
            className={isLoading === null ? "" : isLoading === false ? "loading loading__exit" : "loading"}
            onAnimationEnd={
                isLoading === false
                    ? () => {
                          setIsLoading(null);
                          console.log("Eu entrei aqui");
                      }
                    : undefined
            }
        >
            {isLoading !== null && <Loading />}
        </div>
    );
};

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean | null>(true);
    const documentOp = documentOpenapi();

    return (
        <>
            <main style={{ height: "100dvh", display: isLoading ? "none" : undefined }}>
                <ApiReferenceReact
                    configuration={{
                        onLoaded: () => setIsLoading(false),
                        content: documentOp,
                        theme: "bluePlanet",
                        defaultHttpClient: { targetKey: "javascript", clientKey: "ofetch" },
                        metaData: { title: "Fakeflix" },
                        documentDownloadType: "none",
                    }}
                />
            </main>

            <LoadingPage isLoading={isLoading} setIsLoading={setIsLoading} />
            <Analytics />
            <SpeedInsights />
        </>
    );
}
