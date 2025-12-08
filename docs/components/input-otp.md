# InputOTP Component - Style Mapping

## InputOTP (Root)

```
disabled:cursor-not-allowed
data-slot="input-otp"
```

## InputOTP Container

```
flex items-center gap-2 has-disabled:opacity-50
```

## InputOTPGroup

```
flex items-center
data-slot="input-otp-group"
```

## InputOTPSlot

```
relative flex size-10 items-center justify-center border-y-2 border-r-2 border-border
bg-secondary-background text-sm font-base text-foreground
first:rounded-l-base first:border-l-2 last:rounded-r-base transition-all
data-slot="input-otp-slot"
data-active={isActive}
```

### Active State

```
z-10 ring-1 ring-ring
```

## InputOTPSlot Caret

```
pointer-events-none absolute inset-0 flex items-center justify-center
```

## InputOTPSlot Caret Line

```
h-4 w-px animate-caret-blink bg-current duration-1000
```

## InputOTPSeparator

```
data-slot="input-otp-separator"
role="separator"
```
