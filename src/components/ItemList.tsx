"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../context/AppContext";

interface Item {
  id: number;
  title: string;
  body: string;
}

const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data.slice(0, 10); // Limit to 10 items for this example
};

const fetchUserName = async (): Promise<string> => {
  const response = await fetch("https://api.namefake.com/");
  const data = await response.json();
  return data.name;
};

const ItemList: React.FC = () => {
  const { setCommonValue, setUserName } = useAppContext();

  const { data: items = [], isLoading: itemsLoading } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const { data: userName, isLoading: userNameLoading } = useQuery<string>({
    queryKey: ["userName"],
    queryFn: fetchUserName,
  });

  useEffect(() => {
    setCommonValue("This is a common value set on the home page");
    if (userName) {
      setUserName(userName);
    }
  }, [setCommonValue, setUserName, userName]);

  if (itemsLoading || userNameLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Link href={`/item/${item.id}`} key={item.id}>
          <div className="border p-4 rounded-lg hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2">{item.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemList;
