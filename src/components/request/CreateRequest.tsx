"use client";
import { useState } from "react";
import TextArea from "../form/input/TextArea";
import InputField from "../form/input/InputField";
import Button from "../ui/button/Button";
import { api } from "@/lib/api";
import { useApiError } from "@/hooks/useApiErrorContext";
import ComponentCard from "../common/ComponentCard";
import { Request } from "@/types/Request";

const acceptedCategories = [
  "TI",
  "RH",
  "COMPRAS",
  "FINANCEIRO",
  "INFRAESTRUTURA",
];

interface CreateRequestProps {
  data: Request[];
  setData: (data: Request[]) => void;
}

export const CreateRequest = ({ data, setData }: CreateRequestProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const { showError } = useApiError();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = textAreaValue;
    const category = formData.get("category") as string;

    api
      .post("/requests", {
        title,
        description,
        category,
      })
      .then((response) => {
        const newRequest: Request = response.data;
        setData([...data, newRequest]);
        form.reset();
        setTextAreaValue("");
      })
      .catch((error) => {
        showError("Erro ao criar requisição " + error?.response?.data?.message);
      });
  };

  return (
    <ComponentCard title="Criar Requisição">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 dark:border-white/5 dark:bg-white/3">
        <div className="mt-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Título
              </label>

              <InputField
                id="title"
                name="title"
                placeholder="Digite o título da solicitação"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descrição
              </label>
              <TextArea
                rows={3}
                className=""
                placeholder="Digite a descrição da solicitação"
                value={textAreaValue}
                onChange={setTextAreaValue}
              ></TextArea>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                required
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm transition-colors outline-none placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-400"
              >
                {acceptedCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Criar Requisição</Button>
            </div>
          </form>
        </div>
      </div>
    </ComponentCard>
  );
};
