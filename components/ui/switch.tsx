"use client"

import * as React from "react"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, className, disabled, ...props }, ref) => {
    return (
      <label className={[
        "inline-flex items-center cursor-pointer select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className || "",
      ].join(" ")}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        <span
          aria-hidden
          className="relative inline-block h-5 w-9 rounded-full bg-input peer-checked:bg-primary before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:rounded-full before:bg-background before:shadow before:will-change-transform peer-checked:before:translate-x-[18px]"
        />
      </label>
    )
  }
)

Switch.displayName = "Switch"


