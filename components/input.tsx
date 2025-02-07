// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={cn(
//           "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Input.displayName = "Input"

'use Client'

import { useState } from "react"
import SearchResultList from "./searchResult";

interface InputProps {
  setSearchResult: (value: string) => void;
  setSearch: (value: string) => void;
  search:string
}

export default function Input({ setSearchResult, setSearch, search }: InputProps) {
  

  async function fetchData(value: string) {
    if (!value.trim()) {
      setSearchResult('')
    };
    try {

      const response = await fetch(`/api/searchlocation?input=${value}`);
      const result = await response.json();
      console.log(result.data)
      setSearchResult(result)
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    console.log(value)
    setSearch(value);
    fetchData(value);



  }

  return (
    <>
      <input type="text"
        className="pl-8 w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        onChange={handleChange}
        placeholder="Search City"
        value={search}
      />

    </>
  )
}