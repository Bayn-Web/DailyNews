import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Terminal } from "lucide-react"
import { NavLink } from "react-router-dom"

let storedJoke = localStorage.getItem("joke")
if (!storedJoke) {
  axios.get("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  }).then(res => {
    storedJoke = res.data.joke;
    localStorage.setItem("joke", storedJoke!)
  })
}

export default () => {
  return <>
    <div className="w-screen h-[80vh] flex justify-center items-center flex-col space-y-2">
      <Alert className="w-fit">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          {storedJoke}
        </AlertDescription>
      </Alert>
      <Button>
        <NavLink to="/">404</NavLink>
      </Button>
    </div>
  </>
}