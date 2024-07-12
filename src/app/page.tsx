'use client'
import Product from "@/components/Product";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import type { TProduct } from "@/db";
import { cn } from "@/lib/utils";
import { ProductState } from "@/lib/validators/product-validator";
import { useQuery } from "@tanstack/react-query";
import { QueryResult } from "@upstash/vector";
import axios from "axios";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import debounce from 'lodash.debounce';
import EmptyState from "@/components/EmptyState";
import Filters from "@/components/Filters";
const SORT_OPTIONS = [
  {name:'None' , value:'none'},
  {name:'Price:Low to High' , value:'price-asc'},
  {name:'Price:High to Low' , value:'price-desc'},
] as const
const DEFAULT_CUSTOM_PRICE = [0,200] as [number , number]
export default function Home() {
  const [filter , setFilter] = useState<ProductState>({
    color:['beige' ,'blue' , 'green' ,'purple', 'white' ],
    price:{isCustom:false , range:DEFAULT_CUSTOM_PRICE},
    size:["L" , "M" , "S"],
    sort:'none',
  });
  const [mobile , setMobile] = useState(false)
  const {data:products , isLoading , refetch} = useQuery({
    queryKey:['products'],
    queryFn:async()=>{
      const  {data} = await axios.post<QueryResult<TProduct>[]>("https://watch-store-rouge.vercel.app/api/products",{
        filter:{
          sort:filter.sort,
          color:filter.color,
          price:filter.price.range,
          size:filter.size
        }
      }
      )
      return data
    }
  })
  
  const onSubmit = ()=> refetch()
  const _debounceSubmit = debounce(onSubmit , 400)
  const applyArrayFilter  = ({category ,value }:{
    category:keyof Omit<typeof filter , 'price' | 'sort'>,
    value:string,
  })=>{
    const isFilterApplyed = filter[category].includes(value as never);
    if(isFilterApplyed){
        setFilter((prev)=>({
          ...prev,
          [category]:filter[category].filter((v)=>v!==value)
         }))
    }else{
        setFilter((prev)=>({
          ...prev,
          [category]:[...filter[category] , value]
        }))
    }
    _debounceSubmit()
    
  }
  const minPrice = Math.min(filter.price.range[0] , filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0] , filter.price.range[1]);
  console.log(filter)
  return (
   <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24 ">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900"> Watches </h1>
      <div className="flex items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-900">
            Sort
            <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 group-hover:text-gray-900"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option)=>(
                <button className={cn('text-sm font-medium text-gray-400 hover:text-gray-800 block py-2 px-4 w-full' , {
                  'text-gray-900 bg-gray-300':option.value === filter.sort
                })} key={option.name} onClick={()=>
                 {
                  setFilter((prev)=>({
                      ...prev,
                      sort:option.value
                  }))
                  _debounceSubmit()
                 }
               
                }>{option.name}</button>
              ))}
            </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={()=>setMobile(!mobile)} className="-m-2 ml-4 sm:ml-6 md:ml-8 lg:hidden"><Filter className="h-4 w-4"/></button>
        </div>
    </div>
    <section className='pb-24 pt-6'>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters */}
          <div className="hidden lg:block">
            <Filters refetch={refetch} filter={filter} setFilter={setFilter}/>
          </div>
            
          {/* Product grid */}
          {
            mobile?<div className="lg:hidden"><Filters refetch={refetch} filter={filter} setFilter={setFilter}/></div>:''
          }
          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
               {
               isLoading? new Array(12).fill(null).map((_,i)=>(
                <ProductSkeleton key={i}/>
               )):products && products.length === 0 ?<EmptyState/>:products?.map((product, idx)=>(
                <Product key={idx} product={product.metadata!}/>
              ))
               }
          </ul>
      </div>
    </section>
   </main> 
  )
}

