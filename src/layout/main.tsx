import * as React from "react"
import ThemeTrigger from '@/comps/themTrigger'
import Chooser from "@/comps/chooser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RefreshCw } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate } from "react-router"
import { buttonVariants } from "@/components/ui/button"
import { cn, getDay } from "@/lib/utils"
import { useSelector } from "react-redux"

export default () => {
  const navigater = useNavigate();
  const cachedDay = useSelector<{ source: { cachedDay: string } }, string>(state => state.source.cachedDay);
  return (
    <div className="fixed h-[56px] w-screen flex justify-between items-center z-10 border-b-slate-600 border" style={{
      backgroundImage: 'radial-gradient(transparent 1px,hsl(var(--background)) 1px)',
      backdropFilter: 'saturate(50%) blur(4px)',
      backgroundSize: '4px 4px'
    }}>
      <div className="flex-1 flex flex-row gap-1">
        <Chooser></Chooser>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={buttonVariants({ variant: 'ghost' })}>!</div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex align-middle">
                <i className="iconfont">&#xe8bb;</i>微博需登录
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <code className="flex-1 text-center flex items-center justify-center gap-1">
        Welcome
        {cachedDay && cachedDay !== getDay() && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigater("/")}
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-6 w-6")}
                >
                  <RefreshCw className="h-3 w-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Data from {cachedDay}, click to refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </code>
      <div className="flex-1 cursor-pointer flex justify-end items-center space-x-1 m-2">
        <ThemeTrigger />
        <Avatar onClick={() => navigater("/")}>
          <AvatarImage />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
