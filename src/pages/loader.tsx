import { useEffect, useMemo, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import MyDrawer from "@/comps/myDrawer";

export default () => {
    return (
        <div className="h-full w-screen flex items-center justify-center">
            <Load />
        </div>
    );
};

const Load = () => {
    const [loadingProcess, setProcess] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setProcess((prev) => (prev < 100 ? prev + 1 : 100));
        }, 100);
        return () => clearInterval(interval);
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

    return (
        <div className="flex items-center h-fit w-screen flex-col gap-2">
            {cachedDiv}
            <Progress value={loadingProcess} />
            <MyDrawer />
        </div>
    );
};
