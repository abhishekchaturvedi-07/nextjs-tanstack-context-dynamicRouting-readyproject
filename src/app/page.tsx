import React from "react";
import ItemList from "../components/ItemList";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Item List</h1>
      <ItemList />
    </main>
  );
}
