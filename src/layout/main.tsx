import * as React from "react"
import ThemeTrigger from '@/comps/themTrigger'
import Chooser from "@/comps/chooser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useNavigate } from "react-router"

export default () => {
  const navigater = useNavigate();
  return (
    <div className="fixed h-[56px] w-screen flex justify-between items-center z-10 border-b-slate-600 border" style={{
      backgroundImage: 'radial-gradient(transparent 1px,hsl(var(--background)) 1px)',
      backdropFilter: 'saturate(50%) blur(4px)',
      backgroundSize: '4px 4px'
    }}>
      <Chooser className="flex-1"></Chooser>
      <code className="flex-1 text-center"> Welcome </code>
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
