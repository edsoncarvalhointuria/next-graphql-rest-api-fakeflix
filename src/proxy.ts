import { NextRequest, NextResponse } from "next/server";

const ipsMap = new Map<string, { access: number; qtt: number }>();
const ACCESS_LIMIT_PER_SECONDS = 100 as const;
export default function proxy(request: NextRequest) {
    const ip = request.headers.get("x-real-ip") || "00.00.00.00";
    const now = Date.now();
    const timeLimit = 60 * 1000;

    if (!ipsMap.has(ip)) {
        ipsMap.set(ip, { access: now, qtt: 1 });
    } else {
        const user = ipsMap.get(ip)!;

        if (now - user.access < timeLimit) {
            user.qtt++;

            if (user.qtt > ACCESS_LIMIT_PER_SECONDS) {
                return NextResponse.json(
                    {
                        success: false,
                        type: "about:blank",
                        title: "Limite de Acesso",
                        status: 429,
                        detail: "Você atingiu o limite de acesso. Tente novamente em 1 minuto.",
                        instance: request.nextUrl.href,
                    },
                    { status: 429 },
                );
            }
        } else ipsMap.set(ip, { access: now, qtt: 1 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
