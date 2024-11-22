import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import axios from "axios"
import { useEffect, useState } from "react"

type TheNew = {
  ID: string,
  description: string,
  domain: string,
  extra: string,
  logo: string,
  md5: string,
  nodeids: string,
  sitename: string,
  thumbnail: string, //pic
  time: string, // timestemp
  title: string,
  url: string,//origin url
}

const doFirstTimeFunc = (func: Function, time = 2000) => {
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

const showToast = (toaster: { toast: any }) => doFirstTimeFunc(() => {
  console.log("show toast")
  toaster.toast({
    title: "What's up!",
    description: "Finish all the news today----" + getDay(),
    action: (
      <ToastAction altText="Goto schedule to undo">Got it</ToastAction>
    )
  })
})

const getDay = () => {
  const date = new Date()
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}

export default () => {
  const [storedNews, setStoredNews] = useState<TheNew[]>([]);
  const toaster = useToast();
  const toast = showToast(toaster)

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
        setStoredNews(res.data.data)
        localStorage.setItem("news", getDay() + "::" + JSON.stringify(res.data.data))
      })
    } else {
      setStoredNews(JSON.parse(localStorage.getItem("news")!.split("::")[1]))
    }
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        toast();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (<>
    <Accordion type="single" collapsible>
      {
        storedNews?.map((theNew) => {
          return (
            <AccordionItem key={theNew.ID} value={theNew.ID}>
              <AccordionTrigger>
                <a target="_blank" href={theNew.url}>🔗</a>
                {theNew.title}
              </AccordionTrigger>
              <AccordionContent>
                <a target="_blank" href={theNew.url} dangerouslySetInnerHTML={{ __html: theNew.description }} className="transition-colors hover:text-[hsl(var(--text))] line-clamp-2 mx-3"></a>
              </AccordionContent>
            </AccordionItem>)
        })
      }
    </Accordion>
  </>)
}