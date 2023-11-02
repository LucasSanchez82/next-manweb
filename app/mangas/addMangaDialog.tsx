'use client'
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NewManga } from "@/lib/types"
import { mangaSchema, newMangaSchema } from "@/schemas/mangasSchemas"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function AddMangaDialog() {
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const handleSubmit = async (values: any) => {
        const safeValues = newMangaSchema.safeParse(values)
        if(!safeValues.success) {alert('values n\' est pas de type newMangaSchema'); return;}
        const { data: manga } = safeValues;
        const response = await fetch('/api/mangas', {
            method: 'POST',
            body: JSON.stringify(manga),
        })
        
        if(response.ok){
            const res = await response.json();      
            console.log(res);
            setOpen(false);
            router.refresh();
                  
        } else {
            alert('error manga creation')
        }
        
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-12 h-12 overflow-hidden p-0 bg-transparent">
                    {/* ICON FOR ADD */}
                    <svg className='bg-transparent rounded' width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Edit / Add_Plus_Circle">
                            <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un manga</DialogTitle>
                </DialogHeader>
               <AutoForm formSchema={newMangaSchema} onSubmit={handleSubmit} >
                    <AutoFormSubmit>Add Manga</AutoFormSubmit>
                </AutoForm>
            </DialogContent>
        </Dialog>
    )
}
