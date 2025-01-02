import React, { useEffect, useMemo, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import MyDrawer from "@/comps/myDrawer";
import { getDay } from "@/lib/utils";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { buttonVariants } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast";

const Loader = () => {
    return (
        <div className="h-full w-screen flex items-center justify-center">
            <Load />
        </div>
    );
};

export default Loader;

const Load = () => {
    const [loadingProcess, setProcess] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);
    const toaster = useToast();
    let interval: undefined | NodeJS.Timeout;
    useEffect(() => {
        if (localStorage.getItem("news") === null || localStorage.getItem("news")!.split("::")[0] !== getDay()) {
            interval = setInterval(() => {
                setProcess((prev) => {
                    if (prev == 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev < 99 ? prev + 1 : 99
                });
            }, 100);
            const form = new FormData();
            form.append("c", "hot");
            form.append("t", "daily");
            axios.post("/dailynews/do", form).then(res => {
                setProcess(100);
                const parser = new DOMParser();
                res.data.data = (res.data.data as TheNew[]).map(data => {
                    let description = parser.parseFromString(data.description, "text/html")!.querySelector("body")!.innerText?.replaceAll(/<.*?>/g, "");
                    description = description === "" ? data.title + " has no description" : description;
                    return {
                        ...data,
                        description
                    }
                })
                localStorage.setItem("news", getDay() + "::" + JSON.stringify(res.data.data));
                toaster.toast({
                    title: "Data has loaded successfully.",
                    action: (
                        <ToastAction altText="load data successfully" className={buttonVariants({ variant: "ghost" })}>
                            check it
                        </ToastAction>
                    )
                })
            })
        } else {
            setProcess(100);
            setTimeout(() => {
                toaster.toast({
                    title: "Cache has been loaded.",
                    action: (
                        <ToastAction altText="check cached data" className={buttonVariants({ variant: "ghost" })}>
                            check it
                        </ToastAction>
                    )
                })
            }, 500);
        }
    }, []);

    useEffect(() => {
        if (loadingProcess === 100) {
            setTimeout(() => {
                if (loaderRef.current) {
                    loaderRef.current.innerText = '√';
                }
            }, 1000);
        }
    }, [loadingProcess]);

    const cachedDiv = useMemo(() => {
        return (
            <div ref={loaderRef} className={`text-2xl pointer-events-none ${loadingProcess === 100 ? 'animate-trans-out' : 'animate-pulse'}`}>
                {loadingProcess < 10 ? `0${loadingProcess}%` : `${loadingProcess}%`}
            </div>
        );
    }, [loadingProcess]);

    const cachedDrawer = useMemo(() => {
        return (
            <MyDrawer value={loadingProcess} />
        );
    }, [loadingProcess === 100]);

    return (
        <div className="flex items-center h-fit w-screen flex-col gap-2">
            {cachedDiv}
            <Progress value={loadingProcess} />
            {cachedDrawer}
        </div>
    );
};