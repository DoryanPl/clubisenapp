import { Input, Button } from "@heroui/react"; 
import { SearchIcon, Plus } from "lucide-react";

interface PageTitleProps {
  title: string;
  description?: string;
  type?: string;
}

function PageTitle({ title, description, type }: PageTitleProps) {
  return (
    <div className="pt-6 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center gap-8">
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-bold">
          {title}
        </h1>
        {description && (
          <p className="text-base">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto sm:min-w-fit">
        <div className="flex-1 sm:w-80">
          <Input
            isClearable
            radius="lg"
            classNames={{
              
              input: [
                "bg-transparent",
                "placeholder:text-foreground/50 dark:placeholder:text-foreground/50",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-sm",
                "!bg-primary",
                "!dark:bg-primary",
                "data-[hover=true]:!bg-primaryHover",
                "dark:data-[hover=true]:!bg-primaryHover",
                "border border-secondary",
                "dark:border-secondary",
                "focus-within:border-secondary",
                "!cursor-text",
              ],
            }}
            placeholder={`Rechercher un ${type}...`}
            startContent={
              <SearchIcon size={16} className="text-foreground mb-0.5 pointer-events-none flex-shrink-0" />
            }
            onValueChange={(value) => onSearch(value)}
          />
        </div>

        <Button color="secondary" className="text-primary dark:text-primary font-bold whitespace-nowrap flex-shrink-0" startContent={<Plus size={20} />}>
          <span className="hidden sm:inline">Créer un {type}</span>
        </Button>
      </div>
    </div>
  );
};

export default PageTitle;


