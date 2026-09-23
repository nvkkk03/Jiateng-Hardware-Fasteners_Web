'use client'

import { Check } from 'lucide-react'

export interface CheckboxOption {
  value: string
  label: string
  count?: number
}

interface CheckboxGroupProps {
  title: string
  options: CheckboxOption[]
  selected: string[]
  onToggle: (value: string) => void
}

/** 筛选复选框组（工业风方块勾选） */
export function CheckboxGroup({ title, options, selected, onToggle }: CheckboxGroupProps) {
  return (
    <fieldset>
      <legend className="mb-4 text-sm font-semibold text-metal-bright">{title}</legend>
      <div className="space-y-2.5">
        {options.map((opt) => {
          const checked = selected.includes(opt.value)
          return (
            <label
              key={opt.value}
              className="group flex cursor-pointer items-center gap-3 text-sm text-metal-dim transition-colors hover:text-metal"
            >
              <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-all duration-150 ${
                  checked ? 'border-accent bg-accent text-white' : 'border-line-strong bg-transparent'
                }`}
                aria-hidden="true"
              >
                {checked && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => onToggle(opt.value)}
              />
              <span className={checked ? 'text-metal-bright' : ''}>{opt.label}</span>
              {typeof opt.count === 'number' && (
                <span className="ml-auto font-mono text-[10px] text-metal-dim/50">{opt.count}</span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
