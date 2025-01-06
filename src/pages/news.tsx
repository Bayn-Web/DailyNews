import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import React, { useEffect, useRef } from "react"
import '@/assets/iconfont/iconfont.css';
import { NavLink } from "react-router-dom"
import { cn, doFirstTimeFunc, getDay } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSelector } from "react-redux";

const showToast = (toaster: ReturnType<typeof useToast>) => doFirstTimeFunc(() => {
  toaster.toast({
    title: "What's up!",
    description: "Finish all the news today----" + getDay(),
    action: (
      <ToastAction altText="Goto schedule to undo">Got it</ToastAction>
    )
  })
})

const News = () => {
  let storedNews: TheNew[] = localStorage.getItem("news") ? JSON.parse((localStorage.getItem("news")!).split("::")[1]) : [];
  const toaster = useToast();
  const toast = showToast(toaster)
  const bar = useRef<HTMLDivElement>(null)
  const source = useSelector<{ source: { source: string } }, string>(state => state.source.source);
  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        if (bar.current) {
          bar.current.style.animationDelay = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * -100 + "s"
        }
      }, 0);
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        toast();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
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
        {
          storedNews.length === 0 ?
            <div className="h-screen w-full flex justify-center">
              <NavLink to="/" className={"mt-36"}>
                <div className={cn(buttonVariants({ variant: "link" }), "text-xl")}>No news, try get them from home again
                </div>
              </NavLink>
            </div>
            :
            <Accordion type="single" collapsible>
              {
                storedNews?.filter((theNew) => {
                  if (source === 'all') {
                    return true;
                  }
                  return theNew.sitename.includes(source)
                }).map((theNew) => {
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
        }
      </div>
    </div>

  </>)

}

export default News;