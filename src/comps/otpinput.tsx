import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default () => {
  const [value, setValue] = useState<string>("");
  const navigater = useNavigate();
  useEffect(() => {
    if (value?.length == 6) {
      navigater("/news")
    }
  }, [value])
  return (
    <>
      <InputOTP autoFocus maxLength={6} onChange={(value) => setValue(value)}>
        <InputOTPGroup>
          {[0, 1, 2].map((item) =>
            (<InputOTPSlot key={item} index={item} />)
          )}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {[0, 1, 2].map(v => v + 3).map((item) =>
            (<InputOTPSlot key={item} index={item} />)
          )}
        </InputOTPGroup>
      </InputOTP>
    </>
  )
}
