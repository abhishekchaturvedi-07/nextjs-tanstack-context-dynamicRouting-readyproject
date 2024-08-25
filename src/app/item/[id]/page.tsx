"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../context/AppContext";

interface Item {
  id: number;
  title: string;
  body: string;
}

const fetchItem = async (id: string): Promise<Item> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await response.json();
  return data;
};

export default function ItemDetail() {
  const { id } = useParams();
  const { commonValue } = useAppContext();
  const router = useRouter();

  const { data: item, isLoading } = useQuery<Item>({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id as string),
  });

  if (isLoading) {
    return <div className="container mx-auto px-4">Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="mb-4">{item.body}</p>
      <p className="text-gray-600">Common Value: {commonValue}</p>
    </div>
  );
}
