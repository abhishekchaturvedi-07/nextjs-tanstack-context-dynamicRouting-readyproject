"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAppContext } from "../context/AppContext";

interface Item {
  id: number;
  title: string;
  body: string;
}

const ITEMS_PER_PAGE = 9;

const fetchItems = async ({ pageParam = 1 }): Promise<Item[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${ITEMS_PER_PAGE}`
  );
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
};

const fetchUserName = async (): Promise<string> => {
  const response = await fetch("https://api.namefake.com/");
  if (!response.ok) throw new Error("Failed to fetch user name");
  const data = await response.json();
  return data.name;
};

const ItemList: React.FC = () => {
  const { setCommonValue, setUserName } = useAppContext();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchItems,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === ITEMS_PER_PAGE
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
    });

  const {
    data: userName,
    isLoading: userNameLoading,
    error: userNameError,
  } = useQuery({
    queryKey: ["userName"],
    queryFn: fetchUserName,
  });

  useEffect(() => {
    setCommonValue("This is a common value set on the home page");
  }, [setCommonValue]);

  useEffect(() => {
    if (userName) {
      setUserName(userName);
    }
  }, [userName, setUserName]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending")
    return <div className="container mx-auto px-4">Loading...</div>;
  if (status === "error")
    return <div className="container mx-auto px-4">Error loading items</div>;
  if (userNameError) return <div>Error loading user name</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((item) => (
              <Link href={`/item/${item.id}`} key={item.id}>
                <div className="border p-4 rounded-lg hover:shadow-md transition">
                  <h2 className="text-xl font-semibold truncate">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-3">{item.body}</p>
                </div>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={loadMoreRef} className="h-10 mt-4">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
};

export default ItemList;
