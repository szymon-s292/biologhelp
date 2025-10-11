"use client"

import { Category } from "./types";

export default function Filter({
  categories,
  selected,
  setSelected,
  search,
}: {
  categories: Category[];
  selected: Set<string>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  search: () => void;
}) {
  const handleToggle = (category: Category) => {
    const newSelected = new Set(selected);
    const allIds = [category.id];

    if (category.subCategories) {
      for (const sub of category.subCategories) {
        allIds.push(sub.id);
      }
    }

    const isSelected = newSelected.has(category.id);

    if (isSelected) {
      allIds.forEach((id) => newSelected.delete(id));
    } else {
      allIds.forEach((id) => newSelected.add(id));
    }

    setSelected(newSelected);
  };

  const handleSubToggle = (sub: Category, parentCategoryId: string) => {
    const newSelected = new Set(selected);

    if (newSelected.has(sub.id)) {
      newSelected.delete(sub.id);
      newSelected.delete(parentCategoryId);
    } else {
      newSelected.add(sub.id);
      newSelected.add(parentCategoryId);
    }

    setSelected(newSelected);
  };

  const SubCategory: React.FC<{ cat: Category }> = ({ cat }) => {

    return (
      <>
        {cat.subCategories && (
          <div className="ml-5 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
            {cat.subCategories.map((sub) => (
              <label key={sub.id} className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selected.has(sub.id)}
                  onChange={() => handleSubToggle(sub, cat.id)}
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <span>{sub.name}</span>
              </label>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-md space-y-2 overflow-y-auto h-screen">
      <div className="p-4">
        <button onClick={search} className="w-full px-4 py-2 text-white font-semibold bg-green-500 hover:bg-green-600 rounded transition duration-200">Szukaj</button>
        <p id="counter" className="mt-1"></p>
      </div>

      <header className="mx-2 text-xl pb-2">Kategorie</header>

      <div className="space-y-4 m-4">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-1">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={selected.has(cat.id)}
                onChange={() => handleToggle(cat)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded"
              />
              <span className="break-words leading-snug">{cat.name}</span>
            </label>

            <SubCategory cat={cat} />
          </div>
        ))}
      </div>
    </div>
  );
}
