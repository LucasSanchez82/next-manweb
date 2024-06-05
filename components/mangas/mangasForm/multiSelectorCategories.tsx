"use client";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useToast } from "@/components/ui/use-toast";
import { getCategories } from "@/controller/mangas/categories/@actions/categories";
import { Categorie } from "@prisma/client";
import React from "react";


const MultiSelectorCategories = ({setCategories, categories}: {setCategories: (categories: string[]) => void, categories: string[]}) => {
  const { toast } = useToast();
  const searchCategories = async (value: string): Promise<Option[]> => {
    try {
      const categories = await getCategories(value);
      console.log(categories);
      
      const otpions : Option[] = categories?.map((category) => ({label: category.libelle, value: category.id.toString()})) ?? [];
      return otpions;
    } catch (error) {
        toast({
          title: "Erreur",
          description: error instanceof Error ? error.message : "Erreur inconnue",
          variant: "destructive",
        });
      
  
      return []
    }
  };
  
  
  const handleSearch:
    | ((value: string) => Promise<Option[]>)
    | undefined = async (value) => {
    const res = await searchCategories(value);
    return res;
  };

  return (
    <MultipleSelector
      onSearch={handleSearch}
      creatable
      placeholder="trying to search 'a' to get more options..."
      value={categories.map((categorie) => ({label: categorie, value: categorie}))}
      loadingIndicator={
        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
          loading...
        </p>
      }
      emptyIndicator={
        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
          no results found.
        </p>
      }
      onChange={(value) => {
        setCategories(value.map(el => el.label));
      }}
    />
  );
};

export default MultiSelectorCategories;
