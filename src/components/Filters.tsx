import React, { Dispatch, SetStateAction } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { ProductState } from "@/lib/validators/product-validator";
const DEFAULT_CUSTOM_PRICE = [0,200] as [number , number]
import debounce from 'lodash.debounce'
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';
const SUBCATEGORIES = [
    {name :'Watches', selected:true , href:'#'},
    {name :'Hoodies', selected:false , href:'#'},
    {name :'Sweatshirts', selected:false , href:'#'},
    {name :'accessories', selected:false , href:'#'},
  ] as const

 
const COLOR_FILTERS = {
    id:'color',
    name:'Color',
    options:[
      {value:'white' , label:'White'},
      {value:'beige' , label:'Beige'},
      {value:'blue' , label:'Blue'},
      {value:'green' , label:'Green'},
      {value:'purple' , label:'Purple'},
    ] as const
  } 
  const SIZE_FILTERS = {
    id:'size',
    name:'Size',
    options:[
      {value:'s' , label:'S'},
      {value:'m' , label:'M'},
      {value:'l' , label:'L'},
    ] as const
  } 
  const PRICE_FILTERS = {
    id:'price',
    name:'Price',
    options:[
      {value:[0,200] , label:'any price'},
      {value:[0,100] , label:'under 100$'},
      {value:[0,150] , label:'under 150$'},
    ] as const
  } 

const Filters = ({refetch , filter , setFilter}:{refetch:()=>void , filter:ProductState , setFilter:Dispatch<SetStateAction<ProductState>>}) => {
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
  return (

             <>
                 <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                     {SUBCATEGORIES?.map((category)=>(
                       <li key={category.name}>
                         <button disabled={!category.selected} className="disabled:cursor-not-allowed disabled:opacity-60">
                           {category.name}
                         </button>
                       </li>
                     ))}
                 </ul>
                
                 <Accordion type="multiple" className="animate-none">
                   {/* color filter  */}
                     <AccordionItem value="color">
                       <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-600'>
                         <span className="font-medium text-gray-900">Color</span>
                       </AccordionTrigger>
                       <AccordionContent className="pt-6 animate-none">
                         <ul className="space-y-4">
                           {COLOR_FILTERS.options.map((option, idx)=>(
                             <li key={option.value} className="flex items-center space-x-4">
                                 <input onChange={()=>{
                                          applyArrayFilter({
                                           category:'color',
                                           value:option.value
                                          }) 
                                 }}
                                  type="checkbox" id={`color-${idx}`}
                                  checked={filter.color.includes(option.value)}
                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                 <label htmlFor={`color-${idx}`} className="text-gray-500 hover:text-gray-900 hover:font-bold">{option.label}</label>
                             </li> 
                           ))}
                         </ul>
                       </AccordionContent>
                     </AccordionItem>
                     {/* size Filter  */}
                     <AccordionItem value="size">
                       <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-600'>
                         <span className="font-medium text-gray-900">Size</span>
                       </AccordionTrigger>
                       <AccordionContent className="pt-6 animate-none">
                         <ul className="space-y-4">
                           {SIZE_FILTERS.options.map((option, idx)=>(
                             <li key={option.value} className="flex items-center space-x-4">
                                 <input onChange={()=>{
                                          applyArrayFilter({
                                           category:'size',
                                           value:option.label
                                          }) 
                                 }}
                                  type="checkbox" id={`size-${idx}`}
                                  checked={filter.size.includes(option.label)}
                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                 <label htmlFor={`size-${idx}`} className="text-gray-500 hover:text-gray-900 hover:font-bold">{option.label}</label>
                             </li> 
                           ))}
                         </ul>
                       </AccordionContent>
                     </AccordionItem>
                     {/* Price Filter  */}
                     <AccordionItem value="price">
                       <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-600'>
                         <span className="font-medium text-gray-900">Price</span>
                       </AccordionTrigger>
                       <AccordionContent className="pt-6 animate-none">
                         <ul className="space-y-4">
                           {PRICE_FILTERS.options.map((option, idx)=>(
                             <li key={option.label} className="flex items-center space-x-4">
                                 <input onChange={()=>
                                  { setFilter((prev)=>({
                                     ...prev,
                                     price:{
                                       isCustom:false,
                                       range:[...option.value]
                                     }
                                   }))
                                   _debounceSubmit()}
                                 }
                                 
                                  type="radio" id={`price-${idx}`}
                                  checked=
                                  {
                                   !filter.price.isCustom 
                                   && filter.price.range[0]===option.value[0] 
                                   && filter.price.range[1]===option.value[1]
                                 }
                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 "/>
                                 <label htmlFor={`price-${idx}`} className="text-gray-500 hover:text-gray-900 hover:font-bold">{option.label}</label>
                             </li> 
                           ))}
                           <li className="flex flex-col gap-2 justify-center">
                             <div className="flex justify-start gap-4">
                             <input onChange={()=>
                                   {
                                     setFilter((prev)=>({
                                     ...prev,
                                     price:{
                                       isCustom:true,
                                       range:[0,200]
                                     }
                                     }))
                                     _debounceSubmit()
                                   }
                                 }
                                  id={`price`}
                                  type="radio"
                                  checked={filter.price.isCustom} 
                                   className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-700"/>
                                 <label htmlFor={`price`} className="text-gray-500 hover:text-gray-900 hover:font-bold">Custom</label>
                             </div>
                          
                             <div className="flex flex-col justify-center gap-2">
                               <div className="flex justify-between">
                                 <p className="text-sm text-gray-400 ">price</p>
                                 <div>
                                   {
                                     filter.price.isCustom? minPrice.toFixed(0):filter.price.range[0].toFixed(0) } $ - {" "} 
                                    {filter.price.isCustom? maxPrice.toFixed(0):filter.price.range[1].toFixed(0)} $ 
                                   
                                 </div>
                               </div>
                               <div>
                                 <Slider 
                               
                                 value={filter.price.isCustom?filter.price.range : DEFAULT_CUSTOM_PRICE}
                                 min={DEFAULT_CUSTOM_PRICE[0]}
                                 defaultValue={DEFAULT_CUSTOM_PRICE}
                                 max={DEFAULT_CUSTOM_PRICE[1]}
                                 step={5}
                                 onValueChange={(range)=>{
                                 
                         
                                   // @ts-ignore
                                   setFilter((prev)=>(
                                     {
                                       ...prev,
                                       price:{
                                         isCustom:true,
                                         range
                                       }
                                     }
                                   ))
                                   _debounceSubmit()
                                   }
                                 }
                               className={cn({"opacity-40":!filter.price.isCustom})}
                                disabled={!filter.price.isCustom}/></div>
                             </div>
                             </li>
                         </ul>
                       </AccordionContent>
                     </AccordionItem>
                 </Accordion>
             </>
      
  )
}

export default Filters