import {SearchProps} from "@/app/lib/definitions"



export default function Input({ setSearchResult, setSearch, search }: SearchProps) {
  

  async function fetchData(value: string) {
    if (!value.trim()) {
      setSearchResult('')
    };
    try {

      const response = await fetch(`/api/searchlocation?input=${value}`); //เรียก api เพื่อหา location จาก input
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
        placeholder="Search City or Zip Code"
        value={search}
      />

    </>
  )
}