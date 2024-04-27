"use client";

import { revalidateTag } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useRef, useState } from "react";
import setOperationResult from "@/libs/setOperationResult";
import OperationResult from "@/components/OperationResult";

export default function page() {
    const router = useRouter();
    const email = useRef("");
    const pass = useRef("");

    const [resultChildren, setResultChildren] = useState<Array<OperationResult>>([]);
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.current || !pass.current) {
            setOperationResult(resultChildren, setResultChildren, {
                success: false,
                text: "Please fill in email and password.",
            });
            return;
        }

        const res = await signIn("credentials", {
            email: email.current,
            password: pass.current,
            redirect: false,
        });

        if (!res?.error) {
            router.push("/");
            router.refresh();
        } else {
            // alert("You entered wrong email or password!");
            setOperationResult(resultChildren, setResultChildren, {
                success: false,
                text: "Incorrect email or password.",
            });

            console.log("Error /signIn/page.tsx" + res.error);
        }
    };
    
    return (
        <div className="min-h-[100vh] p-5 bg-pink-50">
        <div className="w-[666px] h-[702px] bg-gradient-to-b from-pink-200 rounded-[50px] shadow m-auto my-16">
            <div className="w-auto h-[61px] text-pink-500 text-5xl font-bold font-sans uppercase m-auto py-12">
            Sign In
            </div>
            <form
            className="text-zinc-900 text-3xl font-normal font-sans"
            onSubmit={onSubmit}
            >
            <div className="relative my-6">
                <input
                type="text"
                className="pl-24 pr-4 py-2 border w-[462px] h-[67px] bg-white rounded-[50px]"
                placeholder="Email"
                name="email"
                id="email"
                onChange={(e) => (email.current = e.target.value)}
                />
                <div
                className="absolute inset-y-0 left-[120px] pl-3  
                        flex items-center  
                        pointer-events-none"
                >
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAkCAYAAAAZ4GNvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFjSURBVHgB7ZnLccIwFEVvPvt4maVKSAkuISWkg9BB3EmSClKCS3A6cFIBa1bwHrYGELJ+Rh/P+MxcxmMYfAVHGmGAEx+UnrIvOB3lHQpdwYWnBlE90MOG8oZl8UzZ8cHSPnWZ/m48UPmi/KMcnjDYUalPaEeFclTiCbqFvqf5q6G8IA81pYW5n5NfnxSBNFTj9Vx6uU8QDCtTTEyKOJVvKQ3SqlRjetXbjn061/KMwLDqxFTJpkh7do0WHuUlr5jeNsxRyaQIv2+tvD6ovKSxXMxVpRp2RXTMKs8IhKtkU+QHZg1nl5f4quSrSNTyksZSigcZokiS8oyAWaUQRZKVl5hU8lUEqctLGlyr5KuIjiTlGYGTSiGK6EhWXnLLbcRV+XvE5RcRiV0+Kmv5XKzlc7GWz8VaPhePmnMC8zdRMRDqCb5X2SPdDaVb8sfafGOZHHvzD+Ml/rlwwQblD6LH2Xw8ACjtI2CLR7QoAAAAAElFTkSuQmCC"
                    alt="email"
                />
                </div>
            </div>

            <div className="relative my-6">
                <input
                type="password"
                className="pl-24 pr-4 py-2 border w-[462px] h-[67px] bg-white rounded-[50px]"
                placeholder="Password"
                name="password"
                id="password"
                onChange={(e) => (pass.current = e.target.value)}
                />
                <div
                className="absolute inset-y-0 left-[120px] pl-3  
                        flex items-center  
                        pointer-events-none"
                >
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALCSURBVHgB7Zm9jtpAEMfHxkiRAIkSiQ+RLiUpUwW6dOG6dHc8wZEnIPcER54g3BOE65IK0qULeYJzARKiOgmQIvGV/yRwQr71ejEDMhI/yfJ612v/dzw7OwsWCZDL5cqWZb1frVYlHEWUi5s2XLu45qOH8n2/3+/SnlgUkjRIJpPXKNb50rQfDwDiW/P5/G44HLoUghiFoFAoXMfj8TaK73C8oN3gAZZjsVg1lUpZ4/H4J+3ITpZeW/crv5TkaE8mk9ojMO1gLDqTyRRh3Q77rM8t/NIu2n9wee3H6eVyyT7+lv4PVOlGfO9sNquYuouxaEy2XziVSC32M6zV1FmLv1Iikaii2NieqBsw2N5gMHhNBhj5NAQ3cPqgaOpC7JvRaPTtD9A9g9vhvz0Iv7dtu4iqV9vtGEgGPp7GPd8pgEBLs1s4jvPgrYdl7mCZKwpJNpttQeiltx5R5WWQm9gUAGZ5w1vHsXc6ndZpDzA/6vwcbz0MFPjcQNGwRlVRfbPLbFfhui5P1pqi6ZL9X9dXK5pXOvLMeLYO3KJFAqxXR+/gOayWdP20ojFhnnWGdX6TILy0K+rCi0aMVX2mHgnCMVpRF949ospJirYQL0v4HLckm08cBF41capZ+Xz+QZNPRA6eA/YpCWZY70n6tONTX6Ho0PFWKEVL7OOkwKr8rO4cp4+FQ8Js7VA4DXjk2Bp21+2HqGjE/FuIfMqHkYv/O2MBayIz/EhCiLmHV/A2WBDqEP6FhBARzXm3n+ANEH61zs/3RsrSZeH7tIiIxmbBaOuFr7HXFu3pfSQARLdM7lssFm0SQEQ0b1JhxaDocCMV+sSiB0JaE8JrPs0VpAafSAjRFdFvly6dy5xzj2NxTpgYzWQUQ1y01E9mOs4+fSyU7iGVjR0KP5/uUIQ5TZ9W/YUQZVgvW/qChH9zPiBdHBd/AafLHc3+VPmFAAAAAElFTkSuQmCC"
                    alt="password"
                />
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 m-2 text-center text-white text-[40px] font-bold font-sans py-6">
                <button
                id="signin"
                type="submit"
                className="w-[372px] h-[68px] bg-gradient-to-r from-pink-200 to-pink-500 rounded-[20px] hover:bg-pink-300 active:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50"
                >
                Sign In
                </button>
            </div>
            </form>
            <div className="w-[303px] h-[22px] text-center m-auto flex items-center justify-center">
            <span className="text-black text-sm font-normal font-sans uppercase leading-[17.50px]">
                DON’T have an account?{" "}
            </span>
            <span className="text-white text-[15px] font-bold font-sans underline uppercase flex items-center">
                <Link href={"/signUp"} className="text-pink-500">
                REGISTER
                </Link>
                <span className="text-black text-sm font-semibold font-sans uppercase leading-[17.50px]">
                {" "}
                HERE
                </span>
            </span>
            </div>
        </div>
            <div className="h-screen w-1/2 flex flex-col items-end fixed right-0 top-0 mt-[100px] pointer-events-none">
                {
                    resultChildren.map((obj) => (
                        <OperationResult obj={obj} heading="Failed to Login:"/>
                    ))
                }
            </div>
        </div>
    );
}
