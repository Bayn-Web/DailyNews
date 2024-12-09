import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import '@/assets/iconfont/iconfont.css';

const doFirstTimeFunc = (func: () => void, time = 2000) => {
  let isAllowed = true;
  let timeoutId: NodeJS.Timeout | undefined;
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (isAllowed) {
      func();
      isAllowed = false;
    }
    timeoutId = setTimeout(() => {
      isAllowed = true;
    }, time);
  };
};

const showToast = (toaster: ReturnType<typeof useToast>) => doFirstTimeFunc(() => {
  toaster.toast({
    title: "What's up!",
    description: "Finish all the news today----" + getDay(),
    action: (
      <ToastAction altText="Goto schedule to undo">Got it</ToastAction>
    )
  })
})
let originalData: TheNew[];

const getDay = () => {
  const date = new Date()
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}

const News = () => {
  const [storedNews, setStoredNews] = useState<TheNew[]>([]);
  const toaster = useToast();
  const toast = showToast(toaster)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (localStorage.getItem("news") === null || localStorage.getItem("news")!.split("::")[0] !== getDay()) {
      const form = new FormData();
      form.append("c", "hot");
      form.append("t", "daily");
      axios.post("/dailynews/do", form).then(res => {
        const parser = new DOMParser();
        res.data.data = (res.data.data as TheNew[]).map(data => {
          return {
            ...data,
            description: parser.parseFromString(data.description, "text/html")!.querySelector("body")!.innerText?.replaceAll(/<.*?>/g, "")
          }
        })
        originalData = res.data.data;
        setStoredNews(originalData)
        localStorage.setItem("news", getDay() + "::" + JSON.stringify(res.data.data))
        handleHashChange();
      })
    } else {
      originalData = JSON.parse(localStorage.getItem("news")!.split("::")[1])
      setStoredNews(originalData)
    }
    const handleScroll = () => {
      setTimeout(() => {
        if (bar.current) {
          bar.current.style.animationDelay = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * -100 + "s"
        }
      }, 0);
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        toast();
      }
    };
    const handleHashChange = () => {
      setStoredNews(() => {
        return originalData.filter(res => {
          return res.sitename.includes(decodeURI(window.location.hash).slice(1))
        })
      })
    }
    window.addEventListener("scroll", handleScroll);

    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (<>
    <div>
      <div ref={bar} className="fixed bottom-0 h-1 w-screen z-10 animate-trans-gradient-right"
        style={
          {
            backgroundImage: "linear-gradient(to right, hsl(var(--text)), hsl(var(--background)))",
          }
        }

      ></div>
      <div className="translate-y-[56px]">
        <Accordion type="single" collapsible>
          {
            storedNews?.map((theNew) => {
              return (
                <AccordionItem key={theNew.ID} value={theNew.ID}>
                  <AccordionTrigger>
                    <a target="_blank" href={theNew.url} rel="noreferrer">🔗</a>
                    <div>
                      {theNew.title}
                      {theNew.sitename === "微博" ?
                        <i className="iconfont">&#xe8bb;</i> : <></>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <a target="_blank" href={theNew.url} dangerouslySetInnerHTML={{ __html: theNew.description }} className="transition-colors hover:text-[hsl(var(--text))] line-clamp-2 mx-3" rel="noreferrer"></a>
                  </AccordionContent>
                </AccordionItem>)
            })
          }
        </Accordion>
      </div>
    </div>

  </>)
}

export default News;