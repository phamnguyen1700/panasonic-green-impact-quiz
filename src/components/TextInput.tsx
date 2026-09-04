import { Input } from "@elemental-fx/crystall-ui";
import { motion } from "framer-motion";
import { useId, type InputHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
}

export function TextInput({ label, hint, error, className, ...props }: TextInputProps) {
  const id = useId();

  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-mist/90">
          {label}
        </label>
        {hint ? <span className="text-xs text-mist/55">{hint}</span> : null}
      </div>

      <Input
        id={id}
        data-campaign-input
        className={cn(
          "h-14 w-full rounded-full !border bg-white/10 px-6 text-base text-mist backdrop-blur-md",
          "placeholder:text-mist/40 transition-colors outline-none",
          "focus:!border-white/35 focus:bg-white/12 focus:!ring-0 focus:!outline-none",
          error ? "!border-sun-glow/80" : "!border-white/35",
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />

      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-sun-soft"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}
