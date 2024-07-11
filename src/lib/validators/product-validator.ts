import {z} from 'zod';
export const AVALIABLE_SIZES = ["S" , "M" ,'L'] as const
export const AVALIBLE_COLORS = ['white', 'beige', 'green', 'purple', 'blue'] as const
export const AVALIBLE_SORT = ['none', 'price-asc' , 'price-desc'] as const
export const ProductFilterValidator = z.object({
    size:z.array(z.enum(AVALIABLE_SIZES)),
    color:z.array(z.enum(AVALIBLE_COLORS)),
    sort:z.enum(AVALIBLE_SORT),
    price:z.tuple([z.number() , z.number()])
});

export type ProductState = Omit<z.infer<typeof ProductFilterValidator> , 'price'>&{
    price:{isCustom:boolean , range:[number , number]}
}