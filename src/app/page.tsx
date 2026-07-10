"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { documentOpenapi } from "@/schemas/openapi_schemas";
import "@/schemas/openapi_path";
import { useState } from "react";
import Loading from "./loading";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const i = {
    hideClientButton: false,
    showSidebar: true,
    showDeveloperTools: "localhost",
    showToolbar: "localhost",
    operationTitleSource: "summary",
    theme: "bluePlanet",
    persistAuth: false,
    telemetry: true,
    externalUrls: {
        dashboardUrl: "https://fakeflix-api.vercel.app/",
        registryUrl: "https://registry.scalar.com",
        proxyUrl: "https://proxy.scalar.com",
        apiBaseUrl: "https://fakeflix-api.vercel.app/",
    },
    default: false,
    layout: "modern",
    isEditable: false,
    hideModels: false,
    documentDownloadType: "none",
    hideTestRequestButton: false,
    hideSearch: false,
    showOperationId: false,
    hideDarkModeToggle: false,
    withDefaultFonts: true,
    defaultOpenFirstTag: true,
    defaultOpenAllTags: false,
    expandAllModelSections: false,
    expandAllResponses: false,
    expandAllSchemaProperties: false,
    orderSchemaPropertiesBy: "alpha",
    orderRequiredPropertiesFirst: true,
    _integration: "react",
    metaData: {
        title: "Fakeflix",
    },
    defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "ofetch",
    },
    modelsSectionLabel: "Models",
    slug: "api-1",
    title: "API #1",
};

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
            onAnimationEnd={isLoading === false ? () => setIsLoading(null) : undefined}
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
                        default: true,
                        onLoaded: () => setIsLoading(false),
                        content: documentOp,
                        theme: "bluePlanet",
                        defaultHttpClient: { targetKey: "javascript", clientKey: "ofetch" },
                        metaData: { title: "Fakeflix" },
                        documentDownloadType: "none",
                        externalUrls: {
                            dashboardUrl: "https://fakeflix-api.vercel.app/",
                            registryUrl: "https://registry.scalar.com",
                            proxyUrl: "https://proxy.scalar.com",
                            apiBaseUrl: "https://fakeflix-api.vercel.app/",
                        },
                    }}
                />
            </main>

            <LoadingPage isLoading={isLoading} setIsLoading={setIsLoading} />
            <Analytics />
            <SpeedInsights />
        </>
    );
}
